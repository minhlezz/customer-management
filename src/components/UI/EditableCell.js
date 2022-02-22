import React from "react";
import { Form, Input, Select } from "antd";

const EditableCell = ({
  dataIndex,
  title,
  type,
  valueType,
  record,
  index,
  children,
  options,
  onChange,
  valueChange,
  handleSave,
  editing,
  form,
  ...restProps
}) => {
  const save = async () => {
    try {
      const values = await form.validateFields();
      const updateRecord = values[record.key];
      handleSave({
        ...values,
        updatedRecord: {
          ...updateRecord,
          key: record.key,
        },
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleChange = (value) => {
    onChange({ value, form, record });
  };

  const selectComponent =
    type === "single" ? (
      <Select onChange={handleChange} options={options} />
    ) : (
      <Select onChange={handleChange} options={options} onBlur={save} />
    );
  const inputComponent =
    type === "single" ? <Input /> : <Input onPressEnter={save} onBlur={save} />;

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
  let keyString;
  if (record) {
    keyString = record?.key.toString();
  }

  return (
    <td {...restProps}>
      {editing ? (
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
        <div
          style={{
            paddingRight: 24,
          }}
        >
          {children}
        </div>
      )}
    </td>
  );
};

export default EditableCell;
