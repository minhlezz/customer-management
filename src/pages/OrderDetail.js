import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, Spin } from "antd";
import Title from "antd/lib/typography/Title";

import { toFormatDate } from "../utils/utils";
import * as orderDetailService from "../firebase/firebase.service";
import useFetchByID from "../hooks/useFetchByID";
import useFetch from "../hooks/useFetch";
import OrderDetailTable from "../components/OrderDetail/OrderDetailTable";
import ProForm from "@ant-design/pro-form";

const OrderDetail = () => {
  const params = useParams();
  const id = params.orderId;
  const [form] = Form.useForm();
  const history = useHistory();

  const [order, loading, error, setOrder] = useFetchByID("orders", { id });
  const [products, productLoading, productErros] = useFetch("products");

  if (loading || productLoading) return <Spin />;
  if (error || productErros) return <p>{error || productErros}</p>;

  const { createdAt } = order;

  const updateProductHandler = (newValues) => {
    const newProducts = newValues.map(
      ({ productName, productPrice, productQuantity, uniqueId }) => {
        return {
          productName,
          productPrice,
          productQuantity,
          uniqueId,
        };
      }
    );
    const updatedData = {
      ...order,
      products: newProducts,
    };
    setOrder(updatedData);
  };

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

    const result = removeUndefinedFields(accessories);
    console.log(result);

    const options = {
      id,
      service: "orders",
      value: {
        customerId: order.customerId,
        createdAt: order.createdAt,
        products: result,
      },
    };

    orderDetailService
      .updateById(options)
      .then(() => {
        console.log("success");
      })
      .catch((err) => console.error(err));
    history.goBack();
  };

  return (
    <div className="margin-25">
      <ProForm onFinish={(values) => onFinish(values)}>
        <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
          OrderDetail - {toFormatDate(createdAt)}
        </Title>

        <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
          <Button danger type="primary" htmlType="submit">
            Save
          </Button>
        </div>
        <ProForm.Item name="orderDetail">
          <OrderDetailTable
            orderProducts={order.products}
            form={form}
            products={products}
            updateProductHandler={updateProductHandler}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default OrderDetail;
