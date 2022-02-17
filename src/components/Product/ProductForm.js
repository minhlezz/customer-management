import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const ProductForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.addProductHandler(values);
    form.resetFields();
  };

  return (
    <div className="margin-25">
      <Form form={form} {...formLayout} name="form-product" onFinish={onFinish}>
        <Title level={4} type="secondary">
          Product Form
        </Title>
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="productPrice"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
