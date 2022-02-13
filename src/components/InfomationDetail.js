import { Descriptions } from "antd";
import React from "react";

const InfomationDetail = () => {
  return (
    <Descriptions 
      title="Detail Information"
      className="bg-white"
      style={{
        padding: "20px",
      }}
    >
      <Descriptions.Item label="First Name">Joshua</Descriptions.Item>
      <Descriptions.Item label="Last Name">Adams</Descriptions.Item>
      <Descriptions.Item label="Address">12 da street</Descriptions.Item>
      <Descriptions.Item label="Email">
        Joshua.adams@gmail.com
      </Descriptions.Item>
      <Descriptions.Item label="Phone Number">
        024-241-322-123
      </Descriptions.Item>
    </Descriptions>
  );
};

export default InfomationDetail;
