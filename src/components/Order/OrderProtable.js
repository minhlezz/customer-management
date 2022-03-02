import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";

const OrderProtable = ({ products, children, orderProducts, updateOrderProducts }) => {
  const [editableKeys, setEditableRowKeys] = useState([]);

  const updateDataSource = (values) => {
    console.log(values);
    const newValues = Object.keys(values).map((key) => values[key]);
    console.log(newValues);
  };

  const updateAllValuesChange = (form, updatedValues) => {
    form.setFieldsValue(updatedValues);
    updateDataSource(updatedValues);
  };

  const columns = [
    {
      title: "",
      dataIndex: "id",
      readonly: true,
    },
    {
      title: "Product ID",
      dataIndex: "uniqueId",
      readonly: true,
      width: "20%",
    },
    {
      title: "Product",
      dataIndex: "productName",
      valueType: "select",
      request: async () => {
        return products.map((product) => {
          return {
            label: product.productName,
            value: product.productName,
          };
        });
      },
      fieldProps: (form, { rowKey, rowIndex }) => {
        return {
          onSelect: (value) => {
            const selectedProduct = products.find(
              (prod) => prod.productName === value
            );
            const updatedData = {
              [rowKey]: {
                ...selectedProduct,
                productQuantity: 1,
              },
            };
            updateAllValuesChange(form, updatedData);
          },
        };
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: "row > 2" }] : [],
        };
      },
    },

    {
      title: "Quantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Operation",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            var _a;
            (_a =
              action === null || action === void 0
                ? void 0
                : action.startEditable) === null || _a === void 0
              ? void 0
              : _a.call(action, record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => {
            updateOrderProducts(orderProducts.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      {children}
      <EditableProTable
        columns={columns}
        value={orderProducts}
        onChange={updateOrderProducts}
        rowKey="id"
        locale={{
          emptyText: (
            <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ),
        }}
        recordCreatorProps={{
          position: "bottom",
          creatorButtonText: "Add new record",
          record: (index, data) => {
            console.log(data);
            return {
              id: index + 1,
            };
          },
        }}
        editable={{
          type: "multiple",
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
          },
          onChange: setEditableRowKeys,
          saveText: "Save",
          cancelText: "Cancel",
          deleteText: "Delete",
          deletePopconfirmMessage: "Delete? Sure",
        }}
        tableStyle={{
          margin: "20px",
        }}
        request={async () => ({
          data: orderProducts,
          total: 2,
          success: true,
        })}
      />
    </>
  );
};

export default OrderProtable;
