import ProForm, { ProFormDigit } from "@ant-design/pro-form";
import React from "react";
import ExpandableAccessory from "./ExpandableAccessory";

const ExpandableTable = ({ record, disabled }) => {
  const { accessory } = record ? record : [];
  const originData = accessory?.map((item) => {
    return {
      ...item,
      id: (Math.random() * 100000).toFixed(3),
      totalPrice: item.price + item.quantity,
    };
  });

  return (
    <div>
      <ProFormDigit
        label="discount"
        name={[record.id, "discount"]}
        min={0}
        disabled={disabled}
        fieldProps={{
          style: { maxWidth: 200 },
          placeholder: "%",
        }}
      />
      <ProForm.Item name={[record.id, "accessory"]}>
        <ExpandableAccessory originData={originData} disabled={disabled} />
      </ProForm.Item>
    </div>
  );
};

export default ExpandableTable;
