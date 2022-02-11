import React, { Fragment } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerInfomation from "../components/CustomerInfomation";

const Customer = () => {
  return (
    <Fragment>
      <CustomerForm />
      <CustomerInfomation />
    </Fragment>
  );
};

export default Customer;
