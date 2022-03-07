import { EditableProTable } from "@ant-design/pro-table";
import React, { useState } from "react";

const Accessories = ({value, onChange}) => {
  const [dataSource, setDataSource] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    dataSource?.map((item) => item.id)
  );

  const columns = [
    {
      title: "Accessories",
      dataIndex: "accessories",
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

  return (
    <div className="margin-25">
      <EditableProTable
        tableStyle={{padding: 0}}
        rowKey="id"
        bordered
        columns={columns}
        value={value}
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
            onChange(recordList)
          },
        }}
      />
    </div>
  );
};

export default Accessories;
