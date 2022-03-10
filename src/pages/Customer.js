import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import useFetch from "../hooks/useFetch";

const columns = [
  { title: "ID", dataIndex: "objectId", key: "objectId" },
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone N.", dataIndex: "phoneNumber", key: "phoneNumber" },
];

const Customer = () => {
  const history = useHistory();

  const [data, loading, errors] = useFetch("Customers");

  const dataSource = data.map((item) => {
    return {
      ...item,
      key: item.objectId,
    };
  });

  const doubleClickHanlder = (values) => {
    const currentPath = history.location.pathname;
    const newPath = `${currentPath}/${values.objectId}`;
    history.push(newPath);
  };

  const jumpHandler = () => {
    history.push("/newCustomer");
  };

  if (loading) return <Spin />;

  if (errors) return <p>{errors}</p>;

  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        Customer Infomation
      </Title>
      <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
        <Button
          icon={<UserAddOutlined />}
          shape="circle"
          type="primary"
          onClick={jumpHandler}
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              doubleClickHanlder(record);
            },
          };
        }}
      />
    </div>
  );
};

export default Customer;
