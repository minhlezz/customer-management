import React, { useState } from "react";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { generateKey } from "../../utils/utils";
import { Fragment } from "react/cjs/react.production.min";
import EditableCell from "./EditableCell";

const components = {
  body: {
    cell: EditableCell,
  },
};

const EditableTable = ({
  columns,
  data,
  editable,
  children,
  formRef,
  updateTable,
  onRow,
}) => {
  const { addRow, type } = editable;
  const [form] = Form.useForm();
  const [cellEditingKey, setCellEditingKey] = useState("");
  const [editingState, setEditingState] = useState(false);

  const rowIsEditing = (record) =>
    record.key.toString() === cellEditingKey.toString();

  const rowEditHandler = (record) => {
    setCellEditingKey(record.key);
  };

  const onCancelEditRow = () => {
    setCellEditingKey("");
  };

  const saveRowHandler = async (key) => {
    try {
      const row = await form.validateFields();
      const rowData = row[key];
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(rowData);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...rowData });
        updateTable(newData);
        setCellEditingKey("");
      } else {
        newData.push(rowData);
        updateTable(newData);
        setCellEditingKey("");
      }
      setEditingState(false);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const defaultValues = data?.reduce((acc, curr) => {
    acc[curr.key] = curr;
    return acc;
  }, {});

  const addHandler = () => {
    const newData = [...data];

    const key = generateKey(data);
    //Have not finish Handler add new row for singleEdit
    if (type === "single") {
      if (key) {
        updateTable([...newData, { key: key.toString() }]);
        setCellEditingKey(key);
      }
      setEditingState(true);
    }

    if (type === "multiple") {
      if (key) {
        updateTable([
          ...newData,
          {
            key: key.toString(),
          },
        ]);
      }
    }
  };

  const saveHandler = (row) => {
    const { updatedRecord } = row;
    const newData = [...data];
    const index = newData.findIndex((item) => updatedRecord.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...updatedRecord });
    updateTable(newData);
  };

  const deleteHandler = (record) => {
    const deletedRecordData = [...data].filter(
      (item) => item.key !== record.key
    );
    updateTable(deletedRecordData);
  };

  const operation = {
    key: "operation",
    title: "operation",
    dataIndex: "operation",
    render: (_, record) => {
      let renderType;
      const editable = rowIsEditing(record);

      const deleteComponent = (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => deleteHandler(record)}
        >
          <Typography.Link disabled={cellEditingKey !== ""}>
            Delete
          </Typography.Link>
        </Popconfirm>
      );

      const editComponent = (
        <Typography.Link
          style={{ marginRight: "8px" }}
          disabled={cellEditingKey !== ""}
          onClick={() => rowEditHandler(record)}
        >
          Edit
        </Typography.Link>
      );

      if (type === "single") {
        renderType = editable ? (
          <span>
            <Typography.Link
              onClick={() => saveRowHandler(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={onCancelEditRow}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Fragment>
            {editComponent}
            {deleteComponent}
          </Fragment>
        );
      } else {
        renderType = deleteComponent;
      }

      return <Fragment>{data.length >= 1 ? renderType : null}</Fragment>;
    },
  };

  const isColumns = [...columns, operation];

  const mergedColumns = isColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        disabled: col.disabled,
        valueType: col.valueType,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: saveHandler,
        form,
        options: col.options,
        valueChange: col.valueChange,
        onChange: col.onChange,
        editing: type === "single" ? rowIsEditing(record) : true,
        type: type,
      }),
    };
  });

  return (
    <Form
      form={form}
      component={false}
      ref={formRef}
      initialValues={defaultValues}
    >
      {children}
      {addRow && (
        <div style={{ margin: "8px 0" }}>
          <Button onClick={addHandler} disabled={editingState}>
            {addRow?.title}
          </Button>
        </div>
      )}
      <Table
        components={components}
        columns={mergedColumns}
        dataSource={data ? data : ""}
        rowKey={(record) => record.key}
        onRow={onRow}
      />
    </Form>
  );
};

export default EditableTable;
