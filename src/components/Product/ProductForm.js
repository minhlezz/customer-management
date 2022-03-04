import React from "react";
import { Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const ProductForm = ({ form, addProductHandler }) => {
  return (
    <div className="margin-25">
      <Form form={form} {...formLayout} name="form-product">
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
          <Button type="primary" onClick={addProductHandler}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
