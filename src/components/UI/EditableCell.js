import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select } from "antd";

const EditableCell = ({
  dataIndex,
  title,
  valueType,
  record,
  index,
  children,
  options,
  onChange,
  valueChange,
  handleSave,
  editable,
  form,
  ...restProps
}) => {

  const save = async () => {
    try {
      const values = await form.validateFields();
      const updateRecord = values[record.key];
      handleSave({...values, updatedRecord: {
        ...updateRecord,
        key: record.key
      }});
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleChange = (value) => {
    onChange({ value, form, record });
  };
  

  const selectComponent = (
    <Select
      onChange={handleChange}
      options={options}
      onBlur={save}
    />
  );
  const inputComponent = <Input onPressEnter={save} onBlur={save} />;

  let childNode;

  if (editable) {
    switch (valueType) {
      case "select":
        childNode = selectComponent;
        break;
      case "input":
        childNode = inputComponent;
        break;
    }
  }

  const keyString = record.key.toString();

  return (
    <td {...restProps}>
      {editable ? (
        <Form.Item
          name={[keyString, dataIndex]}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {childNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
