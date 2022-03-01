import React from "react";
import { Select } from "antd";

const ProductSelector = ({ data, updateOtherValues, recordKey, value }) => {
  const productOptions = data.map((product) => {
    return {
      label: product.productName,
      value: product.productName,
    };
  });
  return (
    <Select
      value={value}
      options={productOptions}
      onChange={(value) => {
        const selectedProduct = data.find((item) => item.productName === value);
        if (selectedProduct) {
          const newData = {
            ...selectedProduct,
            productQuantity: 1,
            key: recordKey,
          };
          updateOtherValues({
            [recordKey]: newData,
          });
        }
      }}
    />
  );
};

export default ProductSelector;
