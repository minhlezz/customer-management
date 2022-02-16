import React, { useState } from "react";
import { Col, Row, Spin, Tabs } from "antd";

import useFetch from "../hooks/useFetch";
import OrderCustomer from "../components/Order/OrderCustomer";
import OrderTable from "../components/Order/OrderTable";
import OrderForm from "../components/Order/OrderForm";

const { TabPane } = Tabs;

const Order = () => {
  const [customer, setCustomer] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [order, setOrder] = useState({
    customerID: "",
    products: [],
  });

  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

  const onTabCallback = (key) => {
    console.log(key);
  };

  const selectChangeHandler = (value) => {
    console.log(value);
    let result = {};
    const filterCustomer = customers.filter((item) => item.id === value);
    if (filterCustomer.length && filterCustomer.length < 2) {
      result = filterCustomer[0];
    }
    setSelectedCustomer(value);
    setCustomer(result);
  };

  const addOrderHandler = (values) => {
    console.log(values);
    setOrder({
      customerID: selectedCustomer,
      products: [...order.products, values],
    });
  };
  return (
    <div className="margin-25">
      <Tabs defaultActiveKey="1" onChange={onTabCallback}>
        <TabPane tab="Order" key="1">
          <Row>
            <Col span={8}>
              <OrderCustomer
                customers={customers}
                customer={customer}
                selectedCustomer={selectedCustomer}
                selectChangeHandler={selectChangeHandler}
              />
            </Col>
            <Col span={8} offset={4}>
              <OrderForm
                products={products}
                customer={customer}
                addOrderHandler={addOrderHandler}
                selectedCustomer={selectedCustomer}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Order List" key="2">
          <OrderTable products={products} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
