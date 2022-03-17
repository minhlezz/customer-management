import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Spin, Tabs } from "antd";
import Title from "antd/lib/typography/Title";

import { toFormatDate } from "../utils/utils";
import useFetch from "../hooks/useFetch";
import OrderDetailTable from "../components/OrderDetail/OrderDetailTable";
import ProForm from "@ant-design/pro-form";
import { updateDataById } from "../restService/restService";
import DeliveryInfo from "../components/OrderDetail/DeliveryInfo";

const OrderDetail = (props) => {
  const params = useParams();
  const id = params.orderId;
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [products, productLoading] = useFetch("Products");
  const { currentRole } = props;

  const URL = `http://localhost:1337/parse/classes/Orders/${id}`;
  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(URL, {
        headers: {
          "X-Parse-Application-Id": "myAppId",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const response = await data.json();
      setOrder(response);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
    };

    updateDataById("Orders", { id, bodyData: result });
    history.goBack();
  };

  const canEdit = (role) => {
    const roles = ["admin"];
    return roles.includes(role);
  };

  if (isLoading || productLoading) return <Spin />;

  return (
    <div className="margin-25">
      <ProForm
        onFinish={(values) => onFinish(values)}
        submitter={{
          submitButtonProps: {
            style: {
              display: "none",
            },
          },
          resetButtonProps: {
            style: {
              display: "none",
            },
          },
        }}
      >
        <Title level={4} type="secondary" style={{ marginBottom: "30px" }}>
          OrderDetail - {toFormatDate(order?.createdAt)}
        </Title>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Order" key="1">
            <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
              <Button danger type="primary" htmlType="submit">
                Save
              </Button>
            </div>

            <ProForm.Item name="orderDetail">
              <OrderDetailTable
                orderProducts={order.products}
                products={products}
                disabled={!!canEdit(currentRole)}
              />
            </ProForm.Item>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Delivery Info" key="2">
            <DeliveryInfo id={id} />
          </Tabs.TabPane>
        </Tabs>
      </ProForm>
    </div>
  );
};

export default OrderDetail;
