import React, { Fragment, useState } from "react";
import { Button, Form, Popconfirm, Typography } from "antd";
import { convertToArrayObj } from "../../utils/utils";

const useOperation = ({
  deleteHandler,
  editHandler,
  saveRowHandler,
  cancelHandler,
  isEditing,
  editingSingleKey,
  type,
}) => {
  const deleteComponent = (record) => (
    <Popconfirm title="Sure to delete?" onConfirm={() => deleteHandler(record)}>
      <Typography.Link disabled={editingSingleKey !== ""}>
        Delete
      </Typography.Link>
    </Popconfirm>
  );
  const editComponent = (record) => (
    <Typography.Link
      style={{ marginRight: "8px" }}
      disabled={editingSingleKey !== ""}
      onClick={() => editHandler(record.key)}
    >
      Edit
    </Typography.Link>
  );
  const saveComponent = (record) => (
    <span>
      <Typography.Link
        onClick={() => saveRowHandler(record.key)}
        style={{
          marginRight: 8,
        }}
      >
        Save
      </Typography.Link>
      <Popconfirm title="Sure to cancel?" onConfirm={cancelHandler}>
        <Typography.Link>Cancel</Typography.Link>
      </Popconfirm>
    </span>
  );

  const operation = {
    title: "operation",
    dataIndex: "operation",

    render: (_, record) => {
      let renderMode;
      const editable = isEditing(record);

      switch (type) {
        case "single":
          renderMode = editable ? (
            saveComponent(record)
          ) : (
            <Fragment>
              {editComponent(record)}
              {deleteComponent(record)}
            </Fragment>
          );
          break;
        case "multiple":
          renderMode = deleteComponent(record);
          break;
        default:
          renderMode = "";
      }

      return renderMode;
    },
  };

  return operation;
};

const useColumns = ({
  columns,
  editingKey,
  editingSingleKey,
  form,
  deleteHandler,
  saveRowHandler,
  cancelHandler,
  editHandler,
  type,
  formValuesChangeHandler,
}) => {
  const editingKeyMode = type === "single" ? editingSingleKey : editingKey;
  const isEditing = (record) => editingKeyMode.includes(record.key);

  const operation = useOperation({
    deleteHandler,
    editHandler,
    editingSingleKey,
    saveRowHandler,
    cancelHandler,
    isEditing,
    type,
  });

  const newColumns = [...columns, operation];

  const mergedColumns = newColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        form,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        renderFormInput: col.renderFormInput,
        inputProps: col.inputProps,
        formItemProps: col.formItemProps,
        editing: isEditing(record),
        type: type,
        formValuesChangeHandler,
      }),
    };
  });
  return mergedColumns;
};

const useChangingStateAction = ({ dataSource, onChange, form, type }) => {
  const [data, setData] = useState(dataSource);
  const [editingSingleKey, setEditingSingleKey] = useState("");
  const [editingKey, setEditingKey] = useState(
    dataSource.map(({ key }) => key)
  );
  const [editStatus, setEditStatus] = useState(false);

  const addHandler = () => {
    const newKey = Math.floor(Date.now() * Math.random() * 1000);
    setData([...data, { key: newKey }]);

    if (type === "single") {
      setEditingKey([newKey]);
      setEditStatus(true);
    }

    if (type === "multiple") {
      setEditingKey([...editingKey, newKey]);
    }
  };

  const formValuesChangeHandler = (changedValues, values) => {
    const newData = dataSource.map((item) => {
      const currentKey = Object.keys(changedValues)[0];
      console.log(currentKey);
      if (item.key.toString() === currentKey.toString()) {
        const changedData = changedValues[currentKey];
        return { ...item, ...changedData };
      }
      return item;
    });
    onChange(newData);
  };

  const deleteHandler = (record) => {
    const deletedRecordData = [...data].filter(
      (item) => item.key !== record.key
    );
    setData(deletedRecordData);
  };

  const editHandler = (key) => {
    setEditingSingleKey(key);
  };

  const cancelHandler = () => {
    setEditingSingleKey("");
  };

  const saveRowHandler = async (key) => {
    try {
      const row = await form.validateFields();
      const rowData = row[key];
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...rowData });
        setData(newData);
        setEditingSingleKey("");
      } else {
        newData.push(rowData);
        setData(newData);
        setEditingSingleKey("");
      }
      setEditStatus(false);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  return {
    data,
    editingKey,
    addHandler,
    formValuesChangeHandler,
    deleteHandler,
    editHandler,
    saveRowHandler,
    cancelHandler,
    editingSingleKey,
    editStatus,
  };
};

const useEditableTable = ({
  columns,
  dataSource,
  onChange,
  addNewButtonText,
  type,
  formRef,
}) => {
  const [form] = Form.useForm();
  const {
    data,
    editingKey,
    addHandler,
    formValuesChangeHandler,
    deleteHandler,
    editHandler,
    saveRowHandler,
    cancelHandler,
    editingSingleKey,
    editStatus,
  } = useChangingStateAction({
    onChange,
    dataSource,
    form,
    type,
  });

  const defaultValues = dataSource?.reduce((acc, curr) => {
    acc[curr.key] = curr;
    return acc;
  }, {});

  const formProps = {
    form,
    component: false,
    initialValues: defaultValues,
    ref: formRef,
    onValuesChange: (changedValue) => {
      formValuesChangeHandler(changedValue);
    },
  };

  const mergedColumns = useColumns({
    columns,
    form,
    editingKey,
    deleteHandler,
    editHandler,
    saveRowHandler,
    cancelHandler,
    editingSingleKey,
    type,
    formValuesChangeHandler,
  });

  const addNewButton = (
    <div style={{ margin: "8px 0" }}>
      <Button onClick={addHandler} disabled={editStatus}>
        {addNewButtonText}
      </Button>
    </div>
  );

  return {
    formProps,
    addNewButton,
    mergedColumns,
    data,
  };
};

export default useEditableTable;
