import React from "react";
import { Form, Table } from "antd";
import Cell from "./Cell";
import useEditableTable from "./useEditableTable";

const EditableTable = (props) => {
  const { data, mergedColumns, formProps, addNewButton } =
    useEditableTable(props);

  return (
    <Form {...formProps}>
      {addNewButton}
      <Table
        bordered
        components={{
          body: {
            cell: Cell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        onRow={props.onRow}
      />
    </Form>
  );
};

export default EditableTable;
