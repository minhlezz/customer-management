import React, { useRef, useState } from "react";
import { Button, Form, Spin, Tabs } from "antd";

import useFetch from "../hooks/useFetch";
import OrderCustomer from "../components/Order/OrderCustomer";
// import OrderTable from "../components/Order/OrderTable";
import * as orderService from "../firebase/firebase.service";
import { useHistory } from "react-router-dom";
import OrderProtable from "../components/Order/OrderProtable";
import ProForm from "@ant-design/pro-form";

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

  const [customers, customerLoading, customerErrors] = useFetch("customers");
  const [products, productLoading, productErros] = useFetch("products");

  if (customerLoading || productLoading) return <Spin />;
  if (customerErrors || productErros)
    return <p>{customerErrors || productErros}</p>;

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
    console.log("run");

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

    orderService.create("orders", newOrder).catch((err) => {
      console.log(err);
    });

    history.push("/customer");
  };

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
