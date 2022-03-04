import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";

const OrderProtable = ({
  products,
  children,
  orderProducts,
  updateOrderProducts,
  form,
}) => {
  const [editableKeys, setEditableRowKeys] = useState(() => [].map((item) => item.id));
  const [dataSource, setDataSource] = useState([]);


  const columns = [
    {
      title: "Product ID",
      dataIndex: "uniqueId",
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
              [rowKey[0]]: {                
                ...selectedProduct,
                productQuantity: 1,
                id: rowKey[0]
              },
            };
          },
        };
      },
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      width: "15%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },

    {
      title: "Quantity",
      dataIndex: "productQuantity",
      width: "10%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
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

  console.log(dataSource);

  return (
    <>
      {children}
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
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
           console.log(recordList);
          },
        }}
      />
    </>
  );
};

export default OrderProtable;
