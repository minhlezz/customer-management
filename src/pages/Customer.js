import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Title from "antd/lib/typography/Title";

import * as customerService from "../firebase/firebase.service";

const columns = [
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone N.", dataIndex: "phoneNumber", key: "phoneNumber" },
];

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();

  const history = useHistory();

  const fetchCustomer = (isSubcribed) => {
    let result = [];
    customerService
      .findAll("customers")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          for (let key in values) {
            result.push({
              id: key,
              ...values[key],
            });
          }
          if (isSubcribed) {
            setCustomers(result);
          }
          setIsLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  useEffect(() => {
    let isSubcribed = true;

    fetchCustomer(isSubcribed);

    return () => (isSubcribed = false);
  }, []);

  const dataSource = customers.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  const doubleClickHanlder = (values) => {
    const currentPath = history.location.pathname;
    const newPath = `${currentPath}/${values.id}`;
    history.push(newPath);
  };

  const jumpHandler = () => {
    history.push("/newCustomer");
  };

  if (isLoading) return <Spin />;

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
