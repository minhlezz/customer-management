import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import { toFormatDate } from "../../utils/utils";

const columns = [
  {
    title: "",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "Order Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
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

  const totalPriceCalc = (products) => {
    const productList = products;
    let total = 0;
    for(let id in productList) {
      total += productList[id].productPrice * productList[id].productQuantity;  
    }
    return total;
  }

  const orderHistory = order.map((item, index) => {
    const totalAmount = totalPriceCalc(item.products)
    return {
      key: index + 1,
      date: toFormatDate(item.createdAt),
      orderId: item.objectId,
      totalAmount,
    };
  });

  return (
    <Table
      bordered
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
