import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import InfomationDetail from "./Information/InfomationDetail";
import InformationForm from "./Information/InformationForm";
import * as customerService from "../../firebase/firebase.service";
import { isAuthorzied } from "../../keycloak/isAuthorzied";

const CustomerInfomation = (props) => {
  const { id, customer } = props;
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  const isEditHandler = (value) => {
    setEdit(value);
  };

  const onEdit = () => {
    isEditHandler(true);
  };

  const updateCustomerHandler = (values) => {
    const options = {
      id,
      service: "customers",
      value: {
        ...customer,
        ...values,
        phoneNumber: +values.phoneNumber,
      },
    };

    customerService
      .updateById(options)
      .then(() => {
        console.log("success");
      })
      .catch((err) => console.error(err));

    setEdit(false);
    history.push("/customer");
  };

  return (
    <Fragment>
      <div
        className="dflex justify-end"
        style={{
          marginBottom: "8px",
          display: isAuthorzied(props.roles) ? "flex" : "none",
        }}
      >
        {!edit && (
          <Button
            icon={<SettingOutlined />}
            shape="circle"
            type="primary"
            onClick={onEdit}
          />
        )}
      </div>
      {!edit && <InfomationDetail customer={customer} />}
      {edit && (
        <InformationForm
          updateCustomerHandler={updateCustomerHandler}
          isEditHandler={isEditHandler}
        />
      )}
    </Fragment>
  );
};

export default CustomerInfomation;
