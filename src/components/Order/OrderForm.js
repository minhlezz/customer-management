import React from "react";
import Title from "antd/lib/typography/Title";
import { Button, Form, Input, Select } from "antd";

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const OrderForm = (props) => {
  const { customers, products } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.newOrderHandler(values);
  };

  const customerIDs = customers?.map((customer) => {
    return (
      <Option key={customer.id} value={customer.id}>
        {customer.id}
      </Option>
    );
  });

  const nameProducts = products.map((product) => {
    return (
      <Option key={product.id} value={product.productName}>
        {product.productName}
      </Option>
    );
  });

  const productChangeHandler = (value) => {
    const isProduct = products.find((product) => product.productName === value);

    form.setFieldsValue({
      productPrice: isProduct.productPrice,
    });
  };

  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        Add A New Order
      </Title>
      <Form form={form} {...formLayout} name="form-order" onFinish={onFinish}>
        <Form.Item label="Customer ID" name="customerID">
          <Select allowClear placeholder="Select a customer">
            {customerIDs}
          </Select>
        </Form.Item>
        <Form.Item label="Product Name" name="product">
          <Select
            allowClear
            onChange={productChangeHandler}
            placeholder="Select a Product"
          >
            {nameProducts}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="productPrice">
          <Input placeholder="Enter the product price" />
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
