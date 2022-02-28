import React from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Spin } from "antd";
import useFetchByID from "../hooks/useFetchByID";
import { toFormatDate } from "../utils/utils";

const ProductDetail = () => {
  const params = useParams();
  const id = params.productId;

  const [product, loading, error] = useFetchByID("products", { id });

  if (loading) return <Spin />;

  if (error) return <p>{error}</p>;

  const { createdAt, productName, productPrice } = product;

  return (
    <div className="margin-25">
      {product && (
        <Descriptions title={`Product Information ${params.productId}`}>
          <Descriptions.Item label="Product">
            {productName}
          </Descriptions.Item>
          <Descriptions.Item label="Price">{productPrice}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {toFormatDate(createdAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default ProductDetail;
