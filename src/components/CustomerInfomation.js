import React from "react";
import { Col, Row, Table } from "antd";
import Title from "antd/lib/typography/Title";

const CustomerInfomation = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      phoneNumber: "012492384",
      email: "mike.tison@boxing.com",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      phoneNumber: "012492384",
      email: "john.senal@wwe.com",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone N.",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <Row className="margin-25">
      <Col span={24}>
        <Title level={4} type="secondary">
          Customer Infomation
        </Title>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={dataSource} />
      </Col>
    </Row>
  );
};

export default CustomerInfomation;
