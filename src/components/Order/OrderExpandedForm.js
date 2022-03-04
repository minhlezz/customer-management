import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space } from "antd";

const OrderExpandedForm = () => {
  return (
    <Form.List name="moreOptions">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            return (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  label="option"
                  name={[key, "optionName"]}
                  rules={[{ required: true, message: "Missing optionName" }]}
                >
                  <Input placeholder="Option Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Price"
                  name={[key, "optionPrice"]}
                  rules={[{ required: true, message: "Missing price " }]}
                >
                  <InputNumber placeholder="option price" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            );
          })}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default OrderExpandedForm;
