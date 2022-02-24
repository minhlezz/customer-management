import React, { useState } from "react";
import { Button, Form } from "antd";

const useColumns = ({ columns, editingKey, form }) => {
  const isEditing = (record) => editingKey.includes(record.key);

  const mergedColumns = columns.map((col) => {
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
      }),
    };
  });
  return mergedColumns;
};

const useChangingStateAction = ({ dataSource, onChange }) => {
  const [data, setData] = useState(dataSource);
  const [editingKey, setEditingKey] = useState(
    dataSource.map(({ key }) => key)
  );

  const addHandler = () => {
    const newKey = Date.now();
    setData([...data, { key: newKey }]);
    setEditingKey([...editingKey, newKey]);
  };

  const formValuesChangeHandler = (changedValues) => {
    const newDataSource = dataSource.map((row) => {
      const currenKey = Object.keys(changedValues)[0];
      if (row.key === currenKey) {
        const changedData = changedValues[currenKey];
        return { ...row, ...changedData };
      }
      return row;
    });
    onChange(newDataSource);
  };

  return {
    data,
    editingKey,
    addHandler,
    formValuesChangeHandler,
  };
};

const useEditableTable = ({
  columns,
  dataSource,
  onChange,
  addNewButtonText,
}) => {
  const [form] = Form.useForm();

  const { data, editingKey, addHandler, formValuesChangeHandler } =
    useChangingStateAction({
      onChange,
      dataSource,
    });

  const formProps = {
    form,
    component: false,
    initialValues: dataSource,
    onValuesChange: (changedValue, values) => {
      formValuesChangeHandler(changedValue);
    },
  };

  const mergedColumns = useColumns({ columns, form, editingKey });

  const addNewButton = (
    <div style={{ margin: "8px 0" }}>
      <Button onClick={addHandler}>{addNewButtonText}</Button>
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
