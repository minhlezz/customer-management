import { PageHeader } from "antd";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

const CustomerDetail = () => {
  const history = useHistory();
  const params = useParams();

  const backToPreviousPage = () => {
    history.push("/customer");
  };

  return (
    <div>
      <PageHeader title="Back To Customer" onBack={backToPreviousPage}>
        <h3>{params.customerId}</h3>
      </PageHeader>
    </div>
  );
};

export default CustomerDetail;
