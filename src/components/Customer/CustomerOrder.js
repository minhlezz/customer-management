import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";



const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
];

const CustomerOrder = (props) => {
  const { customer } = props;
  const history = useHistory();

  const doubleClickHanlder = (values) => {
    const newPath = `/order/${values.id}`;
    history.push(newPath);
  };

  const datasource = customer.orders?.map((order, index) => {
    const totalPrice = order.products.reduce(
      (curr, { productQuantity, productPrice }) => {
        return curr + productQuantity * productPrice;
      },
      0
    );
    return {
      key: index,
      id: index,
      totalPrice,
    };
  });

  console.log(datasource);

  return (
    <Table
      dataSource={datasource}
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
