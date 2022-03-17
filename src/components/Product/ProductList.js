import React from "react";
import { Descriptions, Table } from "antd";
import { Fragment } from "react/cjs/react.production.min";

const ExtraOptions = ({ record }) => {
  return (
    <Descriptions title="Options" column={2} bordered>
      {record &&
        record.extraOptions.map((element, index) => (
          <Fragment key={index}>
            <Descriptions.Item label="Name">{element.optionName}</Descriptions.Item>
            <Descriptions.Item label="Price" >{element.price}</Descriptions.Item>
          </Fragment>
        ))}
    </Descriptions>
  );
};

const ProductList = ({ products }) => {
  const dataSource = products?.map((prod, index) => {
    return {
      ...prod,
      key: index + 1,
    };
  });

  const columns = [
    { title: "Product", dataIndex: "productName", key: "productName" },
    { title: "Price", dataIndex: "productPrice", key: "productPrice" },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <ExtraOptions record={record} />,
        rowExpandable: (record) => record.extraOptions !== [] &&  record.extraOptions !== undefined,
      }}
      dataSource={dataSource}
    />
  );
};

export default ProductList;
