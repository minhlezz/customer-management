import React, { useState } from "react";
import { Form, Input, Select } from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  valueType,
  record,
  index,
  children,
  options,
  onSelectChange,
  valueChange,
  form,
  ...restProps
}) => {


  const handleChange = (value) => {
    onSelectChange({ value, form, record });
  };

  const selectComponent = <Select onChange={handleChange} options={options} />;

  const inputComponent = <Input />;

  let childNode;

  if (editing) {
    switch (valueType) {
      case "select":
        childNode = selectComponent;
        break;
      case "input":
        childNode = inputComponent;
        break;
    }
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={[record.key,dataIndex]}
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
