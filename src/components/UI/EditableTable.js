import React, { useEffect, useState } from "react";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { generateKey } from "../../utils/utils";

const EditableTable = ({
  columns,
  dataSource,
  components,
  addRow,
  children,
  childRef,
  onFinishFormSubmit
}) => {
  const { title } = addRow;
  const [form] = Form.useForm();
  const [data, setData] = useState(() => dataSource);

  const onFillValuesFormTable = () => {
    const newObj = data.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});
    form.setFieldsValue(newObj);
  };

  const onFinish = (value) => {
    onFinishFormSubmit(data);
  };

  useEffect(() => {
    onFillValuesFormTable();
  }, []);

  const addHandler = () => {
    const newData = [...data];
    const key = generateKey(data);
    if (key) {
      setData([
        ...newData,
        {
          key: key.toString(),
        },
      ]);
    }
  };

  const saveHandler = (row) => {
    const { updatedRecord } = row;
    console.log("row:", row);
    const newData = [...data];
    const index = newData.findIndex((item) => updatedRecord.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...updatedRecord });
    setData(newData);
  };

  const mergedColumns = columns.map((col) => {
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
        editable: col.editable,
      }),
    };
  });

  return (
    <Form form={form} component={false} ref={childRef} onFinish={onFinish}>
      {children}
      {addRow && (
        <div style={{ margin: "8px 0" }}>
          <Button onClick={addHandler}>{title}</Button>
        </div>
      )}
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
