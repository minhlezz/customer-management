import React, { useRef, useState } from "react";
import { Button, Select } from "antd";
import EditableTable from "../components/EditableTable";

const originData = [];

for (let i = 0; i < 20; i++) {
  originData.push({
    key: Math.floor(Math.random() * 1000 * i),
    name: `Test ${i}`,
    age: `age ${i}`,
    address: `Addess ${i} street`,
  });
}

const Test = () => {
  const [data, setData] = useState(originData);
  const formRef = useRef(null);

  console.log(data);

  const checkoutHandler = async () => {
    const form = formRef.current;
    await form.validateFields();
    const formValues = form.getFieldsValue();
    console.log(formValues);
  };

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
              if (value === "Halland") {
                form.setFieldsValue({ [recordKey]: { age: 100 } });
              } else {
                form.setFieldsValue({
                  [recordKey]: {
                    age: 10,
                  },
                });
              }
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
        onChange={(changedValues) => setData(changedValues)}
        addNewButtonText="Add new Test"
        type={"multiple"}
        formRef={formRef}
      >
        <Button danger onClick={checkoutHandler}>
          Checkout
        </Button>
      </EditableTable>
    </div>
  );
};

export default Test;
