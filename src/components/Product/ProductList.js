import React, { Fragment } from "react";
import { Descriptions } from "antd";

const ProductList = (props) => {
  const { products } = props;

  const productList = products.map((product, index) => {
    return (
      <Fragment key={index}>
        <Descriptions.Item label="Product">
          {product.productName}
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          {product.productPrice}
        </Descriptions.Item>
      </Fragment>
    );
  });

  return (
    <Descriptions
      title="List Product"
      bordered
      column={2}
      className="bg-white padding-top-20"
    >
      {productList}
    </Descriptions>
  );
};

export default ProductList;
