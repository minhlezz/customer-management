import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import { toFormatDate } from "../../utils/utils";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
];

const CustomerOrder = (props) => {
  const { orders, id } = props;
  const [order, setOrder] = useState([]);
  const history = useHistory();

  const findCustomerOrder = (orders) => {
    let customerOrder = [];
    orders.forEach((order) => {
      if (order.customerId === id) {
        customerOrder.push(order);
      }
    });
    return customerOrder;
  };

  useEffect(() => {
    const order = findCustomerOrder(orders);
    setOrder(order);
    
  }, [id, orders]);

  const doubleClickHanlder = (record) => {
    const newPath = `/order/${record.orderId}`;
    history.push(newPath);
  };

  const orderHistory = order.map((item, index) => {
    const totalAmount = item.products.reduce(
      (acc, { productQuantity, productPrice }) => {
        return acc + productQuantity * productPrice;
      },
      0
    );
    return {
      key: index,
      date: toFormatDate(item.createdAt),
      orderId: item.id,
      totalAmount,
    };
  });
  console.log(order);

  return (
    <Table
      dataSource={orderHistory}
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
