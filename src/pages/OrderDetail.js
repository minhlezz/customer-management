import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Result, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import { toFormatDate } from "../utils/utils";
import useFetchDataByID from "../hooks/useFetchDataById";
import useFetchData from "../hooks/useFetchData";
import OrderDetailTable from "../components/OrderDetail/OrderDetailTable";
import ProForm from "@ant-design/pro-form";
import { updateDataById } from "../restService/restService";

const OrderDetail = () => {
  const params = useParams();
  const id = params.orderId;
  const history = useHistory();

  const [order, isLoading, error] = useFetchDataByID("orders", { id });
  const [products, productLoading, productErros] = useFetchData("products");

  const onFinish = (values) => {
    const accessories = { ...values }.orderDetail.reduce((acc, curr) => {
      return [
        ...acc,
        {
          ...curr,
          accessory: curr.accessory
            ? curr.accessory.map(({ price, quantity, accessory }) => {
                return {
                  price,
                  quantity,
                  accessory,
                };
              })
            : undefined,
        },
      ];
    }, []);

    const removeUndefinedFields = (ArrayList) => {
      const arr = [...ArrayList];
      for (let item of arr) {
        Object.keys(item).forEach((key) => {
          if (item[key] === undefined) {
            delete item[key];
          }
        });
      }
      return arr;
    };

    const orderList = removeUndefinedFields(accessories);
    const result = {
      customerId: order.customerId,
      products: orderList,
      createdAt: order.createdAt,
    };

    updateDataById("orders", { id, bodyData: result });
    history.goBack();
  };

  if (isLoading || productLoading) return <Spin />;
  if (productErros || error) return <p>{productErros || error} </p>;

  return (
    <div className="margin-25">
      <ProForm onFinish={(values) => onFinish(values)}>
        <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
          OrderDetail - {toFormatDate(order?.createdAt)}
        </Title>

        <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
          <Button danger type="primary" htmlType="submit">
            Save
          </Button>
        </div>
        <ProForm.Item name="orderDetail">
          <OrderDetailTable
            orderProducts={order.products}
            products={products}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default OrderDetail;
