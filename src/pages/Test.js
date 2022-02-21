import React, { useState } from "react";
import EditableCell from "../components/UI/EditableCell";
import EditableTable from "../components/UI/EditableTable";

const selectOption = [
  { label: "lucy", value: "lucy" },
  { label: "david", value: "david" },
  { label: "rose", value: "rose" },
];
const areaOptions =[
  { label: "BH", value: "BH" },
  { label: "Q1", value: "Q1" },
  { label: "BT", value: "BT" },
]

const originData = [];
for (let i = 0; i < 4; i++) {
  originData.push({
    key: i.toString()*Math.floor(Math.random()*1000),
    name: `Edrward ${i}`,
    age: 32,
    area: `Area ${i}`,
    address: `London Park no. ${i}`,
  });
}

const Test = () => {
  const [editableRowKeys, setEditableRowKeys] = useState(() => []);
  
  const selectChangeHandler = ({ value, form, record }) => {
    if (value === "lucy") {
      form.setFieldsValue({
          [record.key] : {
            name: value,
            age: 40
          }
      });
    }
  };

   
  const areaSelectHandler = ({ value, form, record }) => {
    console.log(record);
    if (value === "BH") {
      form.setFieldsValue({
          [record.key] : {
            address: "30 jump street"
          }
      });
    }
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
      onSelectChange: ({ value, form, record }) => {
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
      onSelectChange: ({ value, form, record }) => {
        areaSelectHandler({ value, form, record });
      },
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      valueType: "input",
      editable: true,
    },
  ];

 

  return (
    <div className="margin-25">
    
      <EditableTable
        columns={columns}
        dataSource={originData}
        components={components}
        editable={{
          type: "multiple",
          editableRowKeys,
          updateRowKeys: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default Test;
