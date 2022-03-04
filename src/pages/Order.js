import React, { useRef, useState } from "react";
import { Button, Form, Spin, Tabs } from "antd";

import useFetch from "../hooks/useFetch";
import OrderCustomer from "../components/Order/OrderCustomer";
// import OrderTable from "../components/Order/OrderTable";
import * as orderService from "../firebase/firebase.service";
import { useHistory } from "react-router-dom";
import OrderProtable from "../components/Order/OrderProtable";

const { TabPane } = Tabs;

const initOrder = {
  customer: {},
  products: [],
};
const Order = () => {
  const history = useHistory();
  const [order, setOrder] = useState(initOrder);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [form] = Form.useForm();

  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

  const selectChangeHandler = (value) => {
    let result = {};
    const filterCustomer = customers.filter((item) => item.uniqueId === value);
    if (filterCustomer.length && filterCustomer.length < 2) {
      result = filterCustomer[0];
    }
    setSelectedCustomer(value);
    setOrder({
      customer: result,
      products: [],
    });
  };
  console.log(order);

  const checkOutHandler = async () => {
    if (form) {
      await form.validateFields();
      const newProducts = order.products.map(
        ({ uniqueId, productName, productPrice, productQuantity }) => {
          return {
            uniqueId,
            productName,
            productPrice,
            productQuantity,
          };
        }
      );

      const newOrder = {
        customerId: order.customer.uniqueId,
        products: newProducts,
      };
      console.log(form.getFieldsValue());
      // orderService.create("orders", newOrder).catch((err) => {
      //   console.log(err);
      // });
      // history.push("/customer");
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Order" key="1">
          <OrderCustomer
            customers={customers}
            customer={order.customer}
            selectedCustomer={selectedCustomer}
            selectChangeHandler={selectChangeHandler}
          />
        </TabPane>
        <TabPane tab="Order List" key="2" disabled={!selectedCustomer}>
          <OrderProtable
            products={products}
            orderProducts={order.products}
            updateOrderProducts={updateOrderProducts}
            form={form}
          >
            <div className="dflex justify-end margin-bottom-8">
              <Button danger type="primary" onClick={checkOutHandler}>
                Checkout
              </Button>
            </div>
          </OrderProtable>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
