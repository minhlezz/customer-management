import { Spin, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetchByID from "../hooks/useFetchByID";
import { toFormatDate } from "../utils/utils";

const columns = [
  {
    title: "Product",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
  },
  {
    title: "Quantity",
    dataIndex: "productQuantity",
    key: "productQuantity",
  },
  {
    title: "ID",
    dataIndex: "productId",
    key: "productId",
  },
];

const OrderDetail = () => {
  const history = useHistory();
  const params = useParams();
  const id = params.orderId;
  const [order, loading, error] = useFetchByID("orders", {
    id,
  });

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;

  const doubleClickHanlder = (record) => {
    const newPath = `/product/${record.productId}`;
    history.push(newPath);
  };

  const products = order.products.map((item, index) => {
    return {
      key: index,
      productName: item.productName,
      productPrice: item.productPrice,
      productQuantity: item.productQuantity,
      productId: item.productId,
    };
  });
  const { createdAt } = order;

  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        OrderDetail - {toFormatDate(createdAt)}
      </Title>
      <Table
        dataSource={products}
        columns={columns}
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

export default OrderDetail;
