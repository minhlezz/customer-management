import { Button } from "antd";
import React, { useRef } from "react";
import EditableCell from "../components/UI/EditableCell";
import EditableTable from "../components/UI/EditableTable";
import { generateKey } from "../utils/utils";

const selectOption = [
  { label: "lucy", value: "lucy" },
  { label: "david", value: "david" },
  { label: "rose", value: "rose" },
];
const areaOptions = [
  { label: "BH", value: "BH" },
  { label: "Q1", value: "Q1" },
  { label: "BT", value: "BT" },
];

const originData = [];
for (let i = 0; i < 4; i++) {
  originData.push({
    key: generateKey(originData),
    name: `Edrward ${i}`,
    age: 32,
    area: `Area ${i}`,
    address: `London Park no. ${i}`,
  });
}

const Test = () => {
  const childRef = useRef(null);
  const selectChangeHandler = ({ value, form, record }) => {
    console.log(value);
  };

  const areaSelectHandler = ({ value, form, record }) => {
    console.log(record);
    if (value === "BH") {
      form.setFieldsValue({
        [record.key]: {
          area: value,
          address: "30 jump street",
        },
      });
    }
  };

  const onFinishFormSubmit = (values) => {
    console.log(values);
  };

  const onSubmit = async () => {
    await childRef.current.validateFields();
    childRef.current.submit();
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      valueType: "select",
      editable: true,
      options: selectOption,
      onChange: ({ value, form, record }) => {
        selectChangeHandler({ value, form, record });
      },
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      valueType: "input",
      editable: true,
    },
    {
      title: "Area",
      dataIndex: "area",
      valueType: "select",
      editable: true,
      options: areaOptions,
      onChange: ({ value, form, record }) => {
        areaSelectHandler({ value, form, record });
      },
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
        childRef={childRef}
        columns={columns}
        dataSource={originData}
        components={components}
        onFinishFormSubmit={onFinishFormSubmit}
        single
        editable={{
          addRow: {
            title: "Add New Row",
          },
          type: "single",
        }}
      >
        <div className="dflex justify-end">
          <Button onClick={onSubmit} danger type="primary">
            Submit
          </Button>
        </div>
      </EditableTable>
    </div>
  );
};

export default Test;
