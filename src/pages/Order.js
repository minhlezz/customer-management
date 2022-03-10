import React, { useState } from "react";
import { Button, Form, Spin, Tabs } from "antd";
import OrderCustomer from "../components/Order/OrderCustomer";
import { useHistory } from "react-router-dom";
import OrderProtable from "../components/Order/OrderProtable";
import ProForm from "@ant-design/pro-form";
import useFetchData from "../hooks/useFetchData";
import { postAPI } from "../restService/restService";

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

  const [products, productLoading, productErros] = useFetchData("products");
  const [customers, customerLoading, customerError] = useFetchData("customers");

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

  const updateOrderProducts = (values) => {
    setOrder({
      ...order,
      products: values,
    });
  };
  const onFinish = (values) => {
    const newAccessory = { ...values }.orderList.map((item) => {
      return {
        ...item,
        accessory: item.accessory?.map(({ price, quantity, accessory }) => {
          return {
            price,
            quantity,
            accessory,
          };
        }),
      };
    });

    const removeUndefinedKey = (arr) => {
      const temp = [...arr];
      for (let item of temp) {
        Object.keys(item).forEach((key) => {
          if (item[key] === undefined) {
            delete item[key];
          }
        });
      }
      return temp;
    };

    const newOrder = {
      customerId: values.customerId,
      products: removeUndefinedKey(newAccessory),
    };

    postAPI("orders", newOrder).catch((err) => {
      throw new Error("cannot send data to firebase server");
    });
    history.push("/customer");
  };

  if (customerLoading) return <Spin />;
  return (
    <div className="margin-25">
      <ProForm
        form={form}
        submitter={{
          submitButtonProps: {
            style: { display: "none" },
          },
          resetButtonProps: {
            style: { display: "none" },
          },
        }}
        onFinish={(values) => {
          onFinish(values);
        }}
      >
        <div className="dflex justify-end">
          <Button danger type="primary" htmlType="submit">
            Checkout
          </Button>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Order" key="1">
            <ProForm.Item name={"customerId"}>
              <OrderCustomer
                customers={customers}
                customer={order.customer}
                selectedCustomer={selectedCustomer}
                selectChangeHandler={selectChangeHandler}
              />
            </ProForm.Item>
          </TabPane>
          <TabPane tab="Order List" key="2" disabled={!selectedCustomer}>
            <ProForm.Item name="orderList">
              <OrderProtable
                products={products}
                orderProducts={order.products}
                updateOrderProducts={updateOrderProducts}
                form={form}
              />
            </ProForm.Item>
          </TabPane>
        </Tabs>
      </ProForm>
    </div>
  );
};

export default Order;
