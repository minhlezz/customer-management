import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
};

const CustomerForm = () => {
  return (
    <Form {...formLayout} labelWrap className="margin-25">
      <Title level={4} type="secondary">
        Add New User
      </Title>
      <Row gutter={24} className="bg-white" style={{ padding: "15px" }}>
        <Col span={12}>
          <Form.Item name="firstName" label="First Name">
            <Input placeholder="Enter your first name...." />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input placeholder="Enter your last name...." />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter your address...." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter your email...." />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input placeholder="Enter your phone number...." />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item noStyle>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Submit
            </Button>
            <Button htmlType="button">Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomerForm;
