import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const ProductForm = (props) => {
  const onFinish = (values) => {
    props.addProductHandler(values);
  };
  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        ProductForm
      </Title>
      <Form {...formLayout} name="form-product" onFinish={onFinish}>
        <Form.Item label="Product Name" name="productName">
          <Input />
        </Form.Item>
        <Form.Item label="Product Price" name="productPrice">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
