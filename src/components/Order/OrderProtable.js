import React, { useState } from "react";
import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";
import Expandable from "./Expandable";

const expandedRowRender = (record) => {
  return <Expandable rowData={record} />;
};

const OrderProtable = ({
  products,
  children,
  orderProducts,
  updateOrderProducts,
  form,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    dataSource?.map((item) => item.id)
  );

  const findProduct = (value) => {
    const selectedProduct = products.find((prod) => prod.productName === value);
    return selectedProduct;
  };

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
            message: "此项为必填项",
          },
        ],
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
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      width: "10%",
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
        // onChange={setDataSource}
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
            // const accessories = newData.forEach((item) => {
            //   item.accessories.reduce((acc, curr) => {
            //     return acc + curr.productQuantity * curr.productPrice;
            //   }, 0);
            // });
            // console.log(accessories);
            const result = newData.reduce((acc, curr) => {
              return [
                ...acc,
                {
                  ...curr,
                  totalPrice: curr.productQuantity * curr.productPrice,
                },
              ];
            }, []);

            setDataSource(result);
          },
        }}
        expandable={{
          expandedRowRender,
        }}
      />
    </>
  );
};

export default OrderProtable;
