import React, { useRef, useState } from "react";
import { Button, Spin, Tabs } from "antd";

import useFetch from "../hooks/useFetch";
import OrderCustomer from "../components/Order/OrderCustomer";
import OrderTable from "../components/Order/OrderTable";
import * as orderService from "../firebase/firebase.service";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const initOrder = {
  customer: {},
  products: [],
};
const Order = () => {
  const history = useHistory();
  const [order, setOrder] = useState(initOrder);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const formRef = useRef(null);

  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

  const onTabCallback = (key) => {
    console.log(key);
  };

  const selectChangeHandler = (value) => {
    let result = {};
    const filterCustomer = customers.filter((item) => item.id === value);
    if (filterCustomer.length && filterCustomer.length < 2) {
      result = filterCustomer[0];
    }
    setSelectedCustomer(value);
    setOrder({
      ...initOrder,
      customer: result,
    });
  };

  const checkOutHandler = async () => {
    const form = formRef.current;
    if (form) {
      try {
        await form.validateFields();
        const newOrder = {
          customerId: order.customer.id,
          products: order.products,
        };

        orderService.create("orders", newOrder).catch((err) => {
          console.log(err);
        });
        history.push("/customer");
      } catch (err) {
        alert(err);
      }
    }
  };

  const updateOrderProducts = (values) => {
    setOrder({
      ...order,
      products: values,
    });
  };

  return (
    <div className="margin-25">
      <Tabs defaultActiveKey="1" onChange={onTabCallback}>
        <TabPane tab="Order" key="1">
          <OrderCustomer
            customers={customers}
            customer={order.customer}
            selectedCustomer={selectedCustomer}
            selectChangeHandler={selectChangeHandler}
          />
        </TabPane>
        <TabPane tab="Order List" key="2" disabled={!selectedCustomer}>
          <OrderTable
            formRef={formRef}
            products={products}
            orderProducts={order.products}
            updateOrderProducts={updateOrderProducts}
            checkOutHandler={checkOutHandler}
          >
            <div className="dflex justify-end">
              <Button danger type="primary" onClick={checkOutHandler}>
                Checkout
              </Button>
            </div>
          </OrderTable>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
