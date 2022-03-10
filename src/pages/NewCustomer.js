import React, { useState } from "react";
import CustomerForm from "../components/Customer/CustomerForm";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { postAPI } from "../restService/restService";

const NewCustomer = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const addNewCustomerHandler = async (values) => {
    setIsLoading(true);
    const newCustomer = {
      ...values,
      phoneNumber: +values.phoneNumber,
    };
    const data = await postAPI("customers", newCustomer);
    setIsLoading(false);
    if (data.name) {
      history.push(`/customer/${data.name}`);
    } else {
      return;
    }
  };

  if (isLoading) return <Spin />;

  return <CustomerForm addNewCustomerHandler={addNewCustomerHandler} />;
};

export default NewCustomer;
