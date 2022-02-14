import { Descriptions } from "antd";
import React from "react";

const InfomationDetail = (props) => {
  const { address, email, firstName, lastName, phoneNumber } = props.customer;
  return (
    <Descriptions
      title="Detail Information"
      className="bg-white"
      style={{
        padding: "20px",
      }}
    >
      <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
      <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
      <Descriptions.Item label="Address">{address}</Descriptions.Item>
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
      <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item>
    </Descriptions>
  );
};

export default InfomationDetail;
