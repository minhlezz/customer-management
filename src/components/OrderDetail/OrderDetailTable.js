import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";
import ExpandableTable from "./ExpandableTable";

const OrderDetailTable = ({ orderProducts, products, onChange, disabled }) => {
  const originData = orderProducts.map((prod) => {
    return {
      ...prod,
      id: (Math.random() * 100000).toFixed(2),
      productId: prod.objectId,
    };
  });
  const [editableKeys, setEditableRowKeys] = useState(() =>
    originData?.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState(() => originData);
  const columns = [
    {
      title: "Product ID",
      readonly: true,
      dataIndex: "objectId",
      fieldProps: {
        placeholder: "",
      },
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
      title: "Product",
      dataIndex: "productName",
      valueType: "select",
      fieldProps: {
        placeholder: "",
      },
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
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      valueType: "digit",
      fieldProps: {
        placeholder: "",
      },
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
      valueType: "digit",
      fieldProps: {
        placeholder: "",
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input Quantity",
          },
        ],
        placeholder: "",
      },
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      readonly: true,
      valueType: "digit",
      fieldProps: {
        placeholder: "",
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Missing total price",
          },
        ],
      },
    },

    {
      title: "Operation",
      valueType: "option",
      width: 200,
    },
  ];

  return (
    <EditableProTable
      rowKey="id"
      columns={columns}
      value={dataSource}
      controlled
      locale={{
        emptyText: (
          <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ),
      }}
      recordCreatorProps={{
        position: "bottom",
        newRecordType: "dataSource",
        creatorButtonText: "Add new record",
        disabled: disabled,
        record: () => {
          return {
            id: Date.now(),
          };
        },
      }}
      editable={{
        type: "multiple",
        editableKeys: disabled ? [] : editableKeys,
        actionRender: (row, config, dom) => {
          return [
            <a
              key="delete"
              onClick={() => {
                setDataSource(dataSource.filter((item) => item.id !== row.id));
              }}
            >
              remove
            </a>,
          ];
        },
        onValuesChange: (record, recordList) => {
          const changedData = record;
          const rowId = record?.id;
          const prevData = [...dataSource];
          const newData = [...recordList];
          console.log(prevData);
          const selectedProduct = products.find(
            (prod) => prod.productName === changedData?.productName
          );

          const updatedData = {
            ...selectedProduct,
            productQuantity: 1,
            productId: selectedProduct?.uniqueId,
          };
          let isProductChanged = false;
          const oldProduct = prevData.find((item) => item.id === rowId);
          const currentProduct = newData.find((item) => item.id === rowId);
          if (oldProduct?.productName !== currentProduct?.productName) {
            isProductChanged = true;
          } else {
            isProductChanged = false;
          }
          if (isProductChanged) {
            const itemIndex = newData.findIndex((item) => item.id === rowId);
            const item = newData[itemIndex];
            newData.splice(itemIndex, 1, { ...item, ...updatedData });
          }
          const result = newData.reduce((acc, curr) => {
            return [
              ...acc,
              {
                ...curr,
                totalPrice:
                  curr.productQuantity * curr.productPrice +
                  (curr.accessory
                    ? curr.accessory.reduce((acc, curr) => {
                        return acc + curr.price * curr.quantity;
                      }, 0)
                    : 0),
              },
            ];
          }, []);
          onChange(result);
          setDataSource(result);
        },
        onChange: setEditableRowKeys,
      }}
      expandable={{
        expandedRowRender: (record) => (
          <ExpandableTable record={record} disabled={disabled} />
        ),
      }}
    />
  );
};

export default OrderDetailTable;
