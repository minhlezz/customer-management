import { InputNumber, Select } from "antd";
import React from "react";
import EditableTable from "../EditableTable/";
import ProductSelector from "../OrderDetail/ProductSelector";

const OrderTable = (props) => {
  const { products, formRef, orderProducts, updateOrderProducts } = props;

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      width: "20%",
      editable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please Select Product",
          },
        ],
        placeholder: "Missing",
      },
      renderFormInput: (form, recordKey, updateOtherValues) => {
        return (
          <ProductSelector
            data={products}
            recordKey={recordKey}
            updateOtherValues={updateOtherValues}
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please Select Price",
          },
        ],
        placeholder: "Missing",
      },
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      editable: true,
      inputType: InputNumber,
      inputProps: { min: 0 },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please Select Quantity",
          },
        ],
        placeholder: "Missing",
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      valueType: "input",
      editable: true,
      inputProps: { disabled: true },
      formItemProps: {
        placeholder: "Missing",
        rules: [
          {
            required: true,
            message: "Please Select ID",
          },
        ],
      },
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
