import React, { useState } from "react";
import EditableTable from "../components/EditableTable";

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

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
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
      />
    </div>
  );
};

export default Test;
