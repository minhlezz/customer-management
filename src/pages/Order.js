import React, { useState } from "react";
import { Spin, Tabs } from "antd";

import useFetch from "../hooks/useFetch";
import OrderCustomer from "../components/Order/OrderCustomer";
import OrderTable from "../components/Order/OrderTable";

const { TabPane } = Tabs;

const Order = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customer, setCustomer] = useState({});

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
    setCustomer(result);
  };

  return (
    <div className="margin-25">
      <Tabs defaultActiveKey="1" onChange={onTabCallback}>
        <TabPane tab="Customer" key="1">
          <OrderCustomer
            customers={customers}
            customer={customer}
            selectedCustomer={selectedCustomer}
            selectChangeHandler={selectChangeHandler}
          />
        </TabPane>
        <TabPane tab="Order" key="2">
          <OrderTable products={products} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
