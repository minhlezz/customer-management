import React from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";

const { Title } = Typography;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
  labelAlign: "left",
};

const customerProps = [
  {
    name: "firstName",
    label: "First Name",
    valid: { required: true, message: "Please input your First Name!" },
  },

  {
    name: "lastName",
    label: "Last Name",
    valid: { required: true, message: "Please input your Last Name!" },
  },
  {
    name: "address",
    label: "Address",
    valid: { required: true, message: "Please input your Address !" },
  },
  {
    name: "email",
    label: "Email",
    valid: { required: true, message: "Please input your Email !" },
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    valid: { required: true, message: "Please input your Phone Number!" },
  },
];

const CustomerForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.addNewCustomerHandler(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const customerFormItem = customerProps.map((element, index) => {
    return (
      <Form.Item
        key={index}
        name={element.name}
        label={element.label}
        rules={[element.valid]}
      >
        <Input placeholder={`Enter your ${element.label}...`} />
      </Form.Item>
    );
  });

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelWrap
      {...formLayout}
      className="margin-25"
    >
      <Title level={4} type="secondary">
        Add New User
      </Title>
      <div className="dflex justify-end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ADD
          </Button>
        </Form.Item>
      </div>
      <div className="bg-white" style={{ padding: "15px" }}>
        {customerFormItem}
      </div>
    </Form>
  );
};

export default CustomerForm;
