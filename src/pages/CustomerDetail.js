import React, { useState } from "react";
import { Button, PageHeader } from "antd";
import { useHistory, useParams } from "react-router-dom";
import InfomationDetail from "../components/InfomationDetail";
import InformationForm from "../components/InformationForm";
import { SettingOutlined } from "@ant-design/icons";

const CustomerDetail = () => {
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const params = useParams();

  const isEditHandler = (value) => {
    setEdit(value);
  };
  
  const onEdit = () => {
    isEditHandler(true)
  }

  const backToPreviousPage = () => {
    history.push("/customer");
  };

  return (
    <PageHeader title="Back To Customer" onBack={backToPreviousPage}>
      <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
        <Button
          icon={<SettingOutlined />}
          shape="circle"
          type="primary"
          onClick={onEdit}
        />
      </div>
      {!edit && <InfomationDetail />}
      {edit && <InformationForm isEditHandler={isEditHandler} />}
    </PageHeader>
  );
};

export default CustomerDetail;
