import React, { useState } from "react";
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
  const [isEdit, setIsEdit] = useState(false);

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
    updateEditHandler(false);
  };

  const checkOutHandler = () => {
    const newOrder = {
      customerId: order.customer.id,
      products: order.products,
    };
    orderService.create("orders", newOrder).catch((err) => {
      console.log(err);
    });
    history.push("/customer");
  };

  const updateProductHandler = (values) => {
    setOrder({
      ...order,
      products: values,
    });
  };

  const updateEditHandler = (value) => {
    setIsEdit(value);
  };

  return (
    <div className="margin-25">
      {order.products.length > 0 && (
        <div className="dflex justify-end">
          <Button
            type="primary"
            danger
            onClick={checkOutHandler}
            disabled={isEdit}
          >
            Checkout
          </Button>
        </div>
      )}

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
            products={products}
            data={order.products}
            updateProductHandler={updateProductHandler}
            isEdit={isEdit}
            updateEditHandler={updateEditHandler}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
