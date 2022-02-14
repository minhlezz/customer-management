import React from "react";
import CustomerForm from "../components/Customer/CustomerForm";
import { useHistory } from "react-router-dom";
import * as customerService from "../firebase/firebase.service";

const NewCustomer = () => {
  const history = useHistory();

  const addNewCustomerHandler = (values) => {
    const newCustomer = {
      ...values,
      phoneNumber: +values.phoneNumber,
    };
    customerService.create("customers", newCustomer).catch((err) => {
      console.log(err);
    });
    history.push("/customer");
  };

  return <CustomerForm addNewCustomerHandler={addNewCustomerHandler} />;
};

export default NewCustomer;
