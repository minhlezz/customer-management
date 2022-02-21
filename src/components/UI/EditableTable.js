import React, { Fragment, useState } from "react";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { convertToArrayObj, generateKeyObj } from "../../utils/utils";

const EditableTable = ({
  columns,
  dataSource,
  components,
  editable,
  onAddRow,
}) => {
  const { editableRowKeys, updateRowKeys, type } = editable;

  const [form] = Form.useForm();

  const [data, setData] = useState(dataSource);
  const [toggle, setToggle] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const singleIsEditing = (record) => record.key === editingKey;

  const isEditing = (record) => {
    for (let key of editableRowKeys) {
      if (record.key.toString() === key.toString()) {
        return true;
      }
    }
  };

  const fillValuesForm = (rowKeys) => {
    let newObj = {};
    for (let key in rowKeys) {
      const isRowData = data.filter((item) => item.key === rowKeys[key])[0];
      if (isRowData) {
        newObj = {
          ...newObj,
          [rowKeys[key]]: isRowData,
        };
      }
    }
    form.setFieldsValue(newObj);
  };
  const onSingleEdit = (record) => {
    form.setFieldsValue({
      [record.key]: {
        ...record,
      },
    });
    setEditingKey(record.key);
  };

  const onSingleSave = async (key) => {
    try {
      const isRow = await form.validateFields();
      const row = isRow[key];

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        console.log(item);
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onEdit = () => {
    const rowKeys = data.map((item) => item.key);
    updateRowKeys(rowKeys);
    fillValuesForm(rowKeys);
    setToggle(true);
  };

  const onCancel = () => {
    updateRowKeys([]);
    if (type === "multiple") {
      setToggle(false);
    }
  };

  const onFinish = (value) => {
    const newData = convertToArrayObj(value);
    setData(newData);
    onCancel();
  };

  const saveHandler = async () => {
    await form.validateFields();
    form.submit();
  };

  const addRowHandler = () => {
    const generateKey = generateKeyObj(data);
    const newData = [...data, { key: generateKey }];
    updateRowKeys([...editableRowKeys, generateKey]);
    setData(newData);
  };

  const operation = {
    title: "operation",
    dataIndex: "operation",
    render: (_, record) => {
      const editable = singleIsEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => onSingleSave(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== ""}
          onClick={() => onSingleEdit(record)}
        >
          Edit
        </Typography.Link>
      );
    },
  };

  const singleEditColumns = [...columns, operation];
  const isColumns = type === "single" ? singleEditColumns : columns;

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
        form,
        options: col.options,
        valueChange: col.valueChange,
        onSelectChange: col.onSelectChange,
        editing:
          type === "single" ? singleIsEditing(record) : isEditing(record),
      }),
    };
  });

  const ButtonMultipleEdit = () => {
    return (
      <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
        {!toggle && (
          <Button
            icon={<EditOutlined />}
            size="middle"
            onClick={onEdit}
            style={{ marginRight: "8px" }}
          />
        )}
        {toggle && (
          <Button size="middle" type="primary" onClick={saveHandler}>
            Save
          </Button>
        )}
        {onAddRow?.title && toggle && (
          <Button onClick={onCancel}>Cancel</Button>
        )}
      </div>
    );
  };

  return (
    <Form form={form} component={false} onFinish={onFinish}>
      {onAddRow?.title && toggle && (
        <Fragment>
          <Button onClick={addRowHandler}>{onAddRow?.title}</Button>
        </Fragment>
      )}

      {type === "multiple" && <ButtonMultipleEdit />}
      <Table
        components={components}
        columns={mergedColumns}
        dataSource={data}
        rowKey={(record) => record.key}
      />
    </Form>
  );
};

export default EditableTable;
