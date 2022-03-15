import { EditableProTable } from "@ant-design/pro-table";
import { Empty } from "antd";
import React from "react";

const accessories = [
  { accessory: "comb", price: 30.03 },
  { accessory: "brush", price: 29.5 },
  { accessory: "scissors", price: 26.1 },
];

const Accessories = ({ value, onChange }) => {
  const editableKeys = value ? value.map((record) => record.id) : [];
  const setEditableRowKeys = () => {};
  const onDataChange = onChange;

  const columns = [
    {
      title: "Accessory",
      dataIndex: "accessory",
      valueType: "select",
      width: "25%",
      fieldProps: {
        placeholder: "",
      },
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
      fieldProps: {
        placeholder: "",
      },
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
      fieldProps: {
        placeholder: "",
      },
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
      render: () => {
        return null;
      },
    },
  ];

  return (
    <div className="margin-25">
      <EditableProTable
        tableStyle={{ padding: 0 }}
        rowKey="id"
        bordered
        columns={columns}
        value={value}
        locale={{
          emptyText: (
            <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ),
        }}
        controlled
        recordCreatorProps={{
          position: "bottom",
          creatorButtonText: "Add new record",
          newRecordType: "dataSource",
          record: () => ({
            id: (Math.random() * 999999).toFixed(2),
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
            onDataChange(result);
          },
        }}
      />
    </div>
  );
};

export default Accessories;
