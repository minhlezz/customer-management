import { InputNumber, Select } from "antd";
import React from "react";
import EditableTable from "../EditableTable/";

const OrderTable = (props) => {
  const { products, formRef, orderProducts, updateOrderProducts } = props;

  const productOptions = products.map((product) => {
    return {
      label: product.productName,
      value: product.productName,
    };
  });

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      width: "20%",
      editable: true,
      renderFormInput: (form, recordKey, updateOtherValues) => {
        return (
          <Select
            options={productOptions}
            onChange={(value) => {
              const selectedProduct = products.find(
                (item) => item.productName === value
              );

              if (selectedProduct) {
                const newData = [...orderProducts];
                const index = newData.findIndex(
                  (item) => item.key === recordKey
                );
                const newItem = {
                  ...selectedProduct,
                  productQuantity: 1,
                  key: recordKey,
                };

                const updatedData = {
                  [recordKey]: newItem,
                };

                updateOtherValues(updatedData);

                if (index > -1) {
                  const item = newData[index];
                  newData.splice(index, 1, { ...item, ...newItem });
                  updateOrderProducts(newData);
                } else {
                  newData.push(newItem);
                  updateOrderProducts(newData);
                }
              }
            }}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      editable: true,
      inputType: InputNumber,
      inputProps: { min: 0 },
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      editable: true,
      inputType: InputNumber,
      inputProps: { min: 0 },
    },
    {
      title: "ID",
      dataIndex: "id",
      valueType: "input",
      editable: true,
      inputProps: { disabled: true },
    },
  ];

  return (
    <EditableTable
      formRef={formRef}
      columns={columns}
      dataSource={orderProducts}
      onChange={(values) => {
        updateOrderProducts(values);
      }}
      addNewButtonText="Add new Order"
      type={"multiple"}
    >
      {props.children}
    </EditableTable>
  );
};

export default OrderTable;
