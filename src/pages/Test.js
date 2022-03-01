import React, { useRef, useState } from "react";
import { Button, Select } from "antd";
import EditableTable from "../components/EditableTable";

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: Math.floor(Math.random() * 1000 * i),
    name: `Test ${i}`,
    age: i + 1,
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

    console.log(data);
  };
  const updateData = (values) => {
    setData(values)
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      renderFormInput: (form, recordKey, updateOtherValues) => {
        return (
          <Select
            options={[
              { label: "Halland", value: "Halland" },
              { label: "Smith", value: "Smith" },
            ]}
            onChange={(value) => {
              const updatedData = {
                [recordKey]: {
                  name: value,
                  age: 210,
                  address: `${value}'s address`,
                },
              };
              if (value === "Halland") {
                updateOtherValues(updatedData);
              } else {
                updateOtherValues({
                  [recordKey]: {
                    name: value,
                    age: 10,
                    address: `${value}'s address`,
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
        onChange={(changedValues) => updateData(changedValues)}
        addNewButtonText="Add new Test"
        type={"multiple"}
        formRef={formRef}
      >
        <div className="dflex justify-end">
          <Button danger onClick={checkoutHandler}>
            Checkout
          </Button>
        </div>
      </EditableTable>
    </div>
  );
};

export default Test;
