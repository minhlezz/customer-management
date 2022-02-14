import React from "react";
import Title from "antd/lib/typography/Title";
import { Button, Form, Input } from "antd";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const OrderForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        Add A New Order
      </Title>
      <Form {...formLayout} name="form-order" onFinish={onFinish}>
        <Form.Item label="Customer ID" name="customerID">
          <Input />
        </Form.Item>
        <Form.Item label="Order" name="orderName">
          <Input />
        </Form.Item>
        <Form.Item label="Total Price" name="totalOrder">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Submit
          </Button>
          <Button htmlType="button">Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
