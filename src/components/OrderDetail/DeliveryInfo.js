import React from "react";
import { Descriptions, Spin } from "antd";
import { gql, useQuery } from "@apollo/client";
import { toFormatDate } from "../../utils/utils";

const DELIVERY_DATE = gql`
  query Orders($id: ID!) {
    orders(id: $id) {
      deliveryDate
      createdAt
    }
  }
`;

const DeliveryInfo = ({ id }) => {
  const { loading, error, data } = useQuery(DELIVERY_DATE, {
    variables: {
      id: id,
    },
  });

  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="bg-white">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Order Date">
          {toFormatDate(data.orders.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Delivery Date">
          {data.orders.deliveryDate}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default DeliveryInfo;
