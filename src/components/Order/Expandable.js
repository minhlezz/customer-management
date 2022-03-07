import { ProFormDigit } from "@ant-design/pro-form";
import { Form } from "antd";
import React from "react";
import Accessories from "./Accessories";

const Expandable = ({ rowData }) => {
  return (
    <div>
      <ProFormDigit
        label="discount"
        name={[rowData.id, "discount"]}
        min={0}
        fieldProps={{
          style: { maxWidth: 200 },
        }}
      />
      <Form.Item name={[rowData.id, "accessories"]}>
        <Accessories  />
      </Form.Item>
    </div>
  );
};

export default Expandable;
