import React from "react";
import { Button, PageHeader, Spin, Tabs } from "antd";
import { useHistory, useParams } from "react-router-dom";
import CustomerInfomation from "../components/Customer/CustomerInfomation";
import CustomerOrder from "../components/Customer/CustomerOrder";
import useFetchByID from "../hooks/useFetchByID";

const { TabPane } = Tabs;

const CustomerDetail = () => {
  const history = useHistory();
  const params = useParams();

  const id = params.customerId;

  const [customer, loading, error] = useFetchByID("customers", {
    id,
  });

  const backToPreviousPage = () => {
    history.push("/customer");
  };

  const jumpHandler = () => {
    history.push("/order");
  };

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;

  console.log(customer);
  return (
    <PageHeader title="Back To Customer" onBack={backToPreviousPage}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Customer Detail" key="1">
          <CustomerInfomation id={id} customer={customer} />
        </TabPane>
        <TabPane tab="Order" key="2">
          <Button
            type="primary"
            onClick={jumpHandler}
            className="margin-bottom-8 "
          >
            New Order
          </Button>
          <CustomerOrder customer={customer} />
        </TabPane>
      </Tabs>
    </PageHeader>
  );
};

export default CustomerDetail;
