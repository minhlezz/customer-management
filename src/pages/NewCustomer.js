import React, { useState } from "react";
import CustomerForm from "../components/Customer/CustomerForm";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { fetchAPI } from "../restService/restService";

const NewCustomer = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const addNewCustomerHandler = async (values) => {
    setIsLoading(true);
    const newCustomer = {
      ...values,
      phoneNumber: +values.phoneNumber,
    };
    try {
      const data = await fetchAPI("Customers", newCustomer, {
        method: "POST",
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    // if (data.name) {
    //   history.push(`/customer/${data.name}`);
    // } else {
    //   return;
    // }
  };

  if (isLoading) return <Spin />;

  return <CustomerForm addNewCustomerHandler={addNewCustomerHandler} />;
};

export default NewCustomer;
