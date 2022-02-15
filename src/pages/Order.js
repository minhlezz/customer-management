import React, { useState } from "react";
import { Form, Spin } from "antd";

import OrderForm from "../components/Order/OrderForm";
import OrderList from "../components/Order/OrderList";
import useFetch from "../hooks/useFetch";
import * as orderService from "../firebase/firebase.service";
import { useHistory } from "react-router-dom";

const initOrder = {
  customerId: "",
  totalPrice: 0,
  products: [],
};

const Order = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [orders, setOrders] = useState(initOrder);

  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

  const newOrderHandler = (values) => {
    let updatedProducts;
    console.log(values);

    const newProduct = {
      productId: values.productId,
      productName: values.productName,
      productPrice: values.productPrice,
      productQuantity: +values.productQuantity,
    };
    const allProducts = orders.products;

    const existingProductIndex = allProducts.findIndex(
      (product) => product.productId === newProduct.productId
    );

    const existingProduct = allProducts[existingProductIndex];
    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        productQuantity:
          existingProduct.productQuantity + newProduct.productQuantity,
      };
      updatedProducts = [...allProducts];
      console.log(updatedProduct);
      updatedProducts[existingProductIndex] = updatedProduct;
    } else {
      updatedProducts = allProducts.concat(newProduct);
    }

    setOrders({
      customerId: values.customerId,
      products: updatedProducts,
    });
  };

  const customerChangeHandler = () => {
    setOrders(initOrder);
  };

  const checkoutHandler = () => {
    const newOrder = {
      ...orders,
    };
    orderService
      .create("orders", newOrder)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });

    setOrders(initOrder);
    history.push("/");
  };

  return (
    <div>
      <OrderForm
        newOrderHandler={newOrderHandler}
        customers={customers}
        products={products}
        customerChangeHandler={customerChangeHandler}
        form={form}
      />
      <OrderList orders={orders} checkoutHandler={checkoutHandler} />
    </div>
  );
};

export default Order;
