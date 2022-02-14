import { Table } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

const dataSource = [
  {
    key: "1",
    id: "product-1",
    product: "Mike",
    price: 32,
  },
  {
    key: "2",
    id: "product-2",
    product: "John",
    price: 42,
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];

const OrderDetail = () => {
  const params = useParams();
  const history = useHistory();
  const doubleClickHanlder = (values) => {
    const newPath = `/product/${values.id}`;
    history.push(newPath);
  };
  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        OrderDetail - {params.orderId}
      </Title>
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
      ;
    </div>
  );
};

export default OrderDetail;
