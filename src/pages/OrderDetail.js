import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import { toFormatDate } from "../utils/utils";
import * as orderDetailService from "../firebase/firebase.service";
import useFetchByID from "../hooks/useFetchByID";
import useFetch from "../hooks/useFetch";
import OrderDetailTable from "../components/OrderDetail/OrderDetailTable";


const OrderDetail = () => {
  const params = useParams();
  const id = params.orderId;
  const [form] = Form.useForm();


  const [order, loading, error, setOrder] = useFetchByID("orders", { id });
  const [products, productLoading, productErros] = useFetch("products");


  if (loading || productLoading) return <Spin />;
  if (error || productErros) return <p>{error || productErros}</p>;

  const { createdAt } = order;

  const updateProductHandler = (newValues) => {

    const mergeDulicatedProduct = newValues.filter(prod => prod.productId === prod.productId)
    console.log(mergeDulicatedProduct);

    const productsObjectKeyIsId = newValues.reduce((acc,curr) => {
      return {
        ...acc,
        [curr.productId]: {
          productName: curr.productName,
          productPrice: curr.productPrice,
          productQuantity: curr.productQuantity
        }
      }
    }, {})
    //Check duplicated
      // console.log(newValues);
    const updatedData = {
      ...order,
      products: {
        ...productsObjectKeyIsId
      },
    };
    // console.log(updatedData);
    // setOrder(updatedData);
  };


  const saveHandler = async () => {
    console.log("save");
    const { customerId, createdAt, products } = order;

    const options = {
      id,
      service: "orders",
      value: {
        customerId,
        createdAt,
        products,
      },
    };
    // orderDetailService
    //   .updateById(options)
    //   .then(() => {
    //     console.log("success");
    //   })
    //   .catch((err) => console.error(err));

    // history.goBack();
  };

  return (
    <div className="margin-25">
      <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
        OrderDetail - {toFormatDate(createdAt)}
      </Title>

      <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
        <Button danger type="primary" onClick={saveHandler}>
          Save
        </Button>
      </div>
      <OrderDetailTable
        orderProducts={order.products}
        form={form}
        products={products}
        updateProductHandler={updateProductHandler}
      />
    </div>
  );
};

export default OrderDetail;
