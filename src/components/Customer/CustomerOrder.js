import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    id: "12asg123123",
    total: 42,
  },
  {
    key: "2",
    id: "213asddsasa",
    total: 42,
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

const CustomerOrder = () => {
  const history = useHistory();

  const doubleClickHanlder = (values) => {
    const newPath = `/order/${values.id}`;
    history.push(newPath);
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onRow={(record) => {
        return {
          onDoubleClick: () => {
            doubleClickHanlder(record);
          },
        };
      }}
    />
  );
};

export default CustomerOrder;
