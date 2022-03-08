import { ProFormDigit } from "@ant-design/pro-form";
import { Form } from "antd";
import React from "react";
import Accessories from "./Accessories";

const Expandable = ({ record, dataSource }) => {
  return (
    <div>
      <ProFormDigit
        label="discount"
        name={[record.id, "discount"]}
        min={0}
        fieldProps={{
          style: { maxWidth: 200 },
        }}
      />
      <Form.Item name={[record.id, "accessory"]}>
        <Accessories recordParent={record} dataSource={dataSource} />
      </Form.Item>
    </div>
  );
};

export default Expandable;
