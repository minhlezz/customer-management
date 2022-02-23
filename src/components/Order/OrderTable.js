import React from "react";
import EditableTable from "../UI/EditableTable";

const OrderTable = (props) => {
  const { products, formRef, orderProducts, updateOrderProducts } = props;

  const productSelectChangeHandler = ({ value, form, record }) => {
    const isProduct = products.find((item) => item.productName === value);
    if (isProduct) {
      form.setFieldsValue({
        [record.key]: {
          productPrice: isProduct.productPrice,
          productQuantity: 1,
          productId: isProduct.id,
        },
      });
    }
  };

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
      valueType: "select",
      editable: true,
      options: productOptions,
      onChange: ({ value, form, record }) => {
        productSelectChangeHandler({ value, form, record });
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      valueType: "input",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      valueType: "input",
      editable: true,
    },
    {
      title: "ID",
      dataIndex: "productId",
      valueType: "input",
      editable: true,
      disabled: true,
    },
  ];

  return (
    <EditableTable
      formRef={formRef}
      columns={columns}
      editable={{
        addRow: {
          title: "Add New Row",
        },
        type: "multiple",
      }}
      data={orderProducts}
      updateTable={updateOrderProducts}
    >
      {props.children}
    </EditableTable>
  );
};

export default OrderTable;
