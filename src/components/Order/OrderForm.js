import React from "react";
import { Button, Form, InputNumber, Select, Typography } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const OrderForm = (props) => {
  const { products, selectedCustomer } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.addOrderHandler(values);
    form.resetFields();
  };

  const productLists = products.map((item) => {
    return (
      <Select.Option value={item.productName} key={item.id}>
        {item.productName}
      </Select.Option>
    );
  });

  const onProductChange = (value) => {
    const product = products.filter((item) => item.productName === value);
    const result = product[0];
    form.setFieldsValue({
      productPrice: result.productPrice,
      productQuantity: 1,
    });
  };

  return (
    <div>
      {selectedCustomer && (
        <Form form={form} onFinish={onFinish} {...layout} name="form-order">
          <Typography.Title level={4} type="secondary">
            Add Product
          </Typography.Title>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Select onChange={onProductChange}>{productLists}</Select>
          </Form.Item>
          <Form.Item
            name="productPrice"
            label="Product Price"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="productQuantity"
            label="Product Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              ADD
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default OrderForm;
