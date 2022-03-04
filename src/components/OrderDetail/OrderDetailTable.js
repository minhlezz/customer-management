import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { useHistory } from "react-router-dom";
import { Empty } from "antd";

const OrderDetailTable = ({
  order,
  orderProducts,
  form,
  products,
  updateProductHandler,
}) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const history = useHistory();

  const orderProductsList = orderProducts.map((prod, index) => {
    return {
      ...prod,
      id: index + 1,
      productId: prod.uniqueId,
    };
  });

  const columns = [
    {
      title: "",
      dataIndex: "id",
      readonly: true,
    },
    {
      title: "Product",
      dataIndex: "productName",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Product",
          },
        ],
      },
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
                productId: selectedProduct.uniqueId,
              },
            };
            form.setFieldsValue(updatedData);
          },
        };
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please Select Product",
          },
        ],
      },
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Quantity",
          },
        ],
      },
    },
    {
      title: "Product ID",
      readonly: true,
      dataIndex: "productId",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input ID",
          },
        ],
      },
    },
    {
      title: "Operation",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="edit"
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
            updateProductHandler(
              orderProducts.filter((item) => item.id !== record.id)
            );
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  const doubleClickHanlder = (record) => {
    if (record.productId) {
      const newPath = `/product/${record.productId}`;
      history.push(newPath);
    }
    return;
  };

  return (
    <>
      <EditableProTable
        columns={columns}
        value={orderProductsList}
        editable={{
          type: "multiple",
          form: form,
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(row);
          },
          onChange: setEditableRowKeys,
          saveText: "Save",
          cancelText: "Cancel",
          deleteText: "Delete",
          deletePopconfirmMessage: "Delete? Sure",
        }}
        onChange={updateProductHandler}
        rowKey="id"
        recordCreatorProps={{
          position: "bottom",
          creatorButtonText: "Add new record",
          record: (index, data) => {
            return {
              id: index + 1,
            };
          },
        }}
        locale={{
          emptyText: (
            <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ),
        }}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              doubleClickHanlder(record);
            },
          };
        }}
        request={async () => ({
          data: orderProductsList,
          total: 2,
          success: true,
        })}
      />
    </>
  );
};

export default OrderDetailTable;
