import React from "react";
import { Button, Form, Input } from "antd";

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const buttonLayout = {
  wrapperCol: {
    span: 16,
    offset: 8,
  },
};

const InformationForm = (props) => {
  const { isEditHandler } = props;

  const onCancel = () => {
    isEditHandler(false);
  };

  return (
    <Form
      name="form-customer-detail"
      {...formLayout}
      className="bg-white"
      style={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <Form.Item label="First Name" name="firstName">
        <Input placeholder="Enter customer's first name" />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input placeholder="Enter customer's last name" />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input placeholder="Enter customer's  address" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Enter customer's email" />
      </Form.Item>
      <Form.Item label="Phone Number" name="phoneNumber">
        <Input placeholder="Enter customer's phone number" />
      </Form.Item>
      <Form.Item
        label=""
        colon={false}
        {...buttonLayout}
        className="btn-margin-right-8px"
      >
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button onClick={onCancel}>Reset</Button>
        <Button danger onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InformationForm;
