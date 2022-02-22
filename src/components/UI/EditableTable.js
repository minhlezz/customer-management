import React, { useEffect, useState } from "react";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { generateKey } from "../../utils/utils";
import { Fragment } from "react/cjs/react.production.min";

const EditableTable = ({
  columns,
  dataSource,
  components,
  editable,
  children,
  childRef,
  onFinishFormSubmit,
}) => {
  const { addRow, type } = editable;
  const [form] = Form.useForm();
  const [data, setData] = useState(() => dataSource);
  const [cellEditingKey, setCellEditingKey] = useState("");

  const rowIsEditing = (record) => record.key.toString() === cellEditingKey.toString();

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
        setData(newData);
        setCellEditingKey("");
      } else {
        newData.push(rowData);
        setData(newData);
        setCellEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onFillValuesFormTable = () => {
    const newObj = data.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});
    form.setFieldsValue(newObj);
  };

  const onFinish = (values) => {
    if(type === "multiple") {
      onFinishFormSubmit(values);
    }
    if(type === "single") {
      const value = [...data]
      onFinishFormSubmit(value)
    }
  };

  useEffect(() => {
    onFillValuesFormTable();
  }, []);
  const addHandler = () => {
    const newData = [...data];
    const key = generateKey(data);
    //Have not finish Handler add new row for singleEdit
    if (type === "single") {
      if (key) {
        setData([...newData, { key: key.toString() }]);
        setCellEditingKey(key);
      }
    }

    if (type === "multiple") {
      if (key) {
        setData([
          ...newData,
          {
            key: key.toString(),
          },
        ]);
      }
    }
  };
  console.log(cellEditingKey);
  console.log(data);

  const saveHandler = (row) => {
    const { updatedRecord } = row;
    const newData = [...data];
    const index = newData.findIndex((item) => updatedRecord.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...updatedRecord });
    setData(newData);
  };

  const deleteHandler = (record) => {
    const deletedRecordData = [...data].filter(
      (item) => item.key !== record.key
    );
    setData(deletedRecordData);
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
              <a href="#">Cancel</a>
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
    <Form form={form} component={false} ref={childRef} onFinish={onFinish}>
      {children}
      {addRow && (
        <div style={{ margin: "8px 0" }}>
          <Button onClick={addHandler}>{addRow?.title}</Button>
        </div>
      )}
      <Table
        components={components}
        columns={mergedColumns}
        dataSource={data ? data : ""}
        rowKey={(record) => record.key}
      />
    </Form>
  );
};

export default EditableTable;
