import React from "react";
import { Descriptions, Select } from "antd";

const { Option } = Select;

const OrderCustomer = (props) => {
  const { customer, customers, selectedCustomer, ...rest } = props;

  const onValueChange = (value) => {
    props.selectChangeHandler(value);
    props.onChange(value);
  };

  const onSearch = (value) => {
    onValueChange(value);
  };

  const customerLists = customers.map((item) => {
    return (
      <Option value={item.objectId} key={item.objectId}>
        {`${item.firstName} ${item.lastName}`}
      </Option>
    );
  });

  const { address, email, firstName, lastName, phoneNumber } = customer;

  return (
    <div>
      <Select
        style={{ width: "200px" }}
        className="margin-bottom-8"
        placeholder="Select a person"
        onChange={onValueChange}
        value={selectedCustomer}
        showSearch
        onSearch={onSearch}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {customerLists}
      </Select>

      {selectedCustomer && (
        <Descriptions
          bordered
          title="Custom Information"
          className="bg-white padding-25"
          column={1}
        >
          <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
          <Descriptions.Item label="Address">{address}</Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {phoneNumber}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default OrderCustomer;
