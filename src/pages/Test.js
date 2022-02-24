import React, { useRef, useState } from "react";
import { Select } from "antd";
import EditableTable from "../components/EditableTable";

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const Test = () => {
  const [data, setData] = useState(originData);
  const formRef = useRef(null);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      renderFormInput: (form, recordKey) => {
        return (
          <Select
            options={[
              { label: "Halland", value: "Halland" },
              { label: "Smith", value: "Smith" },
            ]}
            onChange={(value) => {
              console.log(value);
              let age = value === 2 ? 10 : 100;
              form.setFieldsValue({ [recordKey]: { age } });
            }}
          />
        );
      },
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "30%",
      valueType: "input",
      editable: true,
    },
  ];

  return (
    <div className="margin-25">
      <EditableTable
        columns={columns}
        dataSource={data}
        onChange={(values) => setData(values)}
        addNewButtonText="Add new Test"
        type={"multiple"}
        formRef={formRef}
      />
    </div>
  );
};

export default Test;
