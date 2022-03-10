import { EditableProTable } from "@ant-design/pro-table";
import React, { useState } from "react";

const accessories = [
  { accessory: "comb", price: 30.03 },
  { accessory: "brush", price: 29.5 },
  { accessory: "scissors", price: 26.1 },
];

const ExpandableAccessory = ({ value, onChange, originData }) => {
  console.log(originData);
  const [editableKeys, setEditableRowKeys] = useState(
    () => originData?.map((item) => item.id) || []
  );
  const [dataSource, setDataSource] = useState(() => originData);

  const columns = [
    {
      title: "Accessory",
      dataIndex: "accessory",
      valueType: "select",
      width: "25%",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "Missing accessories",
          },
        ],
      },
      request: async () => [
        {
          value: "comb",
          label: "comb",
        },
        {
          value: "brush",
          label: "brush",
        },
        {
          value: "scissors",
          label: "scissors",
        },
      ],
    },
    {
      title: "Price",
      dataIndex: "price",
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
      dataIndex: "quantity",
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
      width: "15%",
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

  return (
    <EditableProTable
      tableStyle={{ padding: 0 }}
      rowKey="id"
      bordered
      columns={columns}
      value={dataSource}
      controlled
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
          //   onChange(recordList);
          const changedData = record;
          const dataList = [...recordList];

          //Check update
          let isChanged = false;

          if (record) {
            const prevData = {
              ...value?.find((item) => item.id === record.id),
            };
            if (prevData) {
              if (changedData?.accessory !== prevData.accessory) {
                isChanged = true;
              } else {
                isChanged = false;
              }
            }
          }

          if (isChanged) {
            const index = dataList.findIndex((item) => item.id === record.id);
            const selectedItem = accessories.find(
              (item) => item.accessory === record.accessory
            );
            const updatedItem = {
              ...selectedItem,
              quantity: 1,
            };
            dataList.splice(index, 1, { ...changedData, ...updatedItem });
          }

          const result = dataList.reduce((acc, curr) => {
            return [
              ...acc,
              {
                ...curr,
                totalPrice: curr.quantity * curr.price,
              },
            ];
          }, []);

          onChange(result);
          setDataSource(result);
        },
      }}
    />
  );
};

export default ExpandableAccessory;
