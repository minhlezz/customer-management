import React from "react";
import { Form, Input } from "antd";

const Cell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  inputProps,
  form,
  renderFormInput,
  children,
  formItemProps,
  ...restProps
}) => {
  const FormInput = inputType || Input;
  const inputNode = renderFormInput ? (
    renderFormInput(form, record.key)
  ) : (
    <FormInput {...inputProps} />
  );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={[record.key, dataIndex]} {...formItemProps}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default Cell;
