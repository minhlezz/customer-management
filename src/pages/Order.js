import React from "react";
import { Spin } from "antd";

import OrderForm from "../components/Order/OrderForm";
import OrderList from "../components/Order/OrderList";
import useFetch from "../hooks/useFetch";

const Order = () => {
  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

  const newOrderHandler = (values) => {
    console.log(values);
  };


  return (
    <div>
      <OrderForm
        newOrderHandler={newOrderHandler}
        customers={customers}
        products={products}
      />
      <OrderList />
    </div>
  );
};

export default Order;
