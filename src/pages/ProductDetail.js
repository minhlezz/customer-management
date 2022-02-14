import React from "react";
import { useParams } from "react-router-dom";
import { Descriptions } from "antd";

const ProductDetail = () => {
  const params = useParams();

  return (
    <div className="margin-25">
      <Descriptions title={`Product Information - ${params.productId}`}>
        <Descriptions.Item label="Product Name">Apple Watch</Descriptions.Item>
        <Descriptions.Item label="Price">1810000000</Descriptions.Item>
        <Descriptions.Item label="Model">XM-42AMDFC</Descriptions.Item>
        <Descriptions.Item label="Made In">China</Descriptions.Item>
        
      </Descriptions>
      ,
    </div>
  );
};

export default ProductDetail;
