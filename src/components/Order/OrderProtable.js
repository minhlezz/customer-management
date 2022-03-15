import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";
import Expandable from "./Expandable";

const OrderProtable = ({ onChange, products }) => {
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    dataSource?.map((item) => item.id)
  );

  const findProduct = (value) => {
    const selectedProduct = products.find((prod) => prod.productName === value);
    return selectedProduct;
  };

  console.log(dataSource);
  const columns = [
    {
      title: "Product ID",
      dataIndex: "objectId",
      readonly: true,
      width: "25%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "ProductID is required",
          },
        ],
      },
      fieldProps: {
        placeholder: "",
      },
    },
    {
      title: "Product",
      dataIndex: "productName",
      valueType: "select",
      width: "25%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Product Name is required",
          },
        ],
      },
      fieldProps: {
        placeholder: "",
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
      width: "15%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "price is required",
          },
        ],
      },
      fieldProps: {
        placeholder: "",
      },
    },

    {
      title: "Quantity",
      dataIndex: "productQuantity",
      valueType: "digit",
      width: "10%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Please input quantity",
          },
        ],
      },
      fieldProps: {
        placeholder: "",
      },
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: "15%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Missing total price",
          },
        ],
      },
      fieldProps: {
        placeholder: "",
      },
    },
    {
      title: "Operation",
      valueType: "option",
      width: 200,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
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
          creatorButtonText: "Add new record",
          newRecordType: "dataSource",
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: "multiple",
          editableKeys,
          deleteText: "delete",
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onChange: setEditableRowKeys,
          onValuesChange: (record, recordList) => {
            const changedData = record;
            const rowId = record?.id;
            const prevData = [...dataSource];
            const newData = [...recordList];
            const selectedProduct = findProduct(changedData?.productName);
            const updatedData = {
              ...selectedProduct,
              productQuantity: 1,
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
        }}
        expandable={{
          expandedRowRender: (record) => {
            return <Expandable record={record} dataSource={dataSource} />;
          },
        }}
      />
    </>
  );
};

export default OrderProtable;
