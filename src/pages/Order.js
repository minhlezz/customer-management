import React, { useState } from "react";
import { Button, Form, Spin, Tabs } from "antd";
import OrderCustomer from "../components/Order/OrderCustomer";
import { useHistory } from "react-router-dom";
import OrderProtable from "../components/Order/OrderProtable";
import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";
import useFetch from "../hooks/useFetch";
import { fetchAPI } from "../restService/restService";

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

  const [products, productLoading] = useFetch("Products");
  const [customers, customerLoading] = useFetch("Customers");

  console.log(products);

  const selectChangeHandler = (value) => {
    let result = {};
    const filterCustomer = customers.filter((item) => item.objectId === value);
    if (filterCustomer.length && filterCustomer.length < 2) {
      result = filterCustomer[0];
    }
    setSelectedCustomer(value);
    setOrder({
      customer: result,
      products: [],
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
      deliveryDate: values.deliveryDate,
      products: removeUndefinedKey(newAccessory),
    };
    console.log(newOrder);
    fetchAPI("Orders", newOrder, {
      method: "POST",
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));

    history.push("/customer");
  };

  if (customerLoading || productLoading) return <Spin />;
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
            <ProForm.Item name="deliveryDate" label="Delivery date">
              <ProFormDatePicker placeholder={"dd/mm/yy"} />
            </ProForm.Item>
            <ProForm.Item name="orderList">
              <OrderProtable
                products={products}
                orderProducts={order.products}
              />
            </ProForm.Item>
          </TabPane>
        </Tabs>
      </ProForm>
    </div>
  );
};

export default Order;
