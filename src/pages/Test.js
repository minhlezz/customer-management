import { EditableProTable } from "@ant-design/pro-table";
import React, { useRef, useState } from "react";
import set from "rc-util/lib/utils/set";
import ProForm from "@ant-design/pro-form";
import { Empty } from "antd";

const defaultData = [
  {
    id: 624748504,
    title: "Activity name one",
    readonly: "activity name one",
    decs: "This activity is really fun",
    state: "open",
    created_at: "2020-05-26T09:42:56Z",
    update_at: "2020-05-26T09:42:56Z",
  },
  {
    id: 624691229,
    title: "Activity name two",
    readonly: "activity name two",
    decs: "This activity is really fun",
    state: "closed",
    created_at: "2020-05-26T08:19:22Z",
    update_at: "2020-05-26T08:19:22Z",
  },
];

const Test = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const formRef = useRef();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      readonly: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 2 ? [{ required: true, message: "rowIndex > 2" }] : [],
        };
      },
      width: "15%",
    },
    {
      title: "Read Only",
      dataIndex: "readonly",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: "row > 2" }] : [],
        };
      },
      readonly: true,
      width: "15%",
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "default", status: "Default" },
        open: {
          text: "error",
          status: "Error",
        },
        closed: {
          text: "success",
          status: "Success",
        },
      },
      fieldProps: (form, { rowKey, rowIndex }) => {
        return {
          onSelect: (value) => {
            if (value === "closed") {
              form.setFieldsValue({
                [rowKey || []]: {
                  ...rowKey,
                  readonly: "resolve",
                },
              });
            } else {
              form.setFieldsValue({
                [rowKey || []]: {
                  ...rowKey,
                  readonly: "pending",
                },
              });
            }
          },
        };
      },
    },

    {
      title: "Description",
      dataIndex: "decs",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (
          form.getFieldValue([rowKey || "", "title"]) === "Activity name two"
        ) {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      valueType: "date",
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
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <EditableProTable
      controlled
      locale={{
        emptyText: (
          <Empty description="No Data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ),
      }}
      rowKey="id"
      headerTitle="New Order"
      recordCreatorProps={{
        position: "bottom",
        creatorButtonText: "Add new record",
        record: (index) => {
          return {
            id: index + 1,
          };
        },
      }}
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
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
      request={async () => ({
        data: defaultData,
        total: 3,
        success: true,
      })}
    />
  );
};

export default Test;
