import React from "react";
import { Button, PageHeader, Spin, Tabs } from "antd";
import { useHistory, useParams } from "react-router-dom";
import CustomerInfomation from "../components/Customer/CustomerInfomation";
import CustomerOrder from "../components/Customer/CustomerOrder";
import useFetchByID from "../hooks/useFetchByID";
import useFetch from "../hooks/useFetch";

const { TabPane } = Tabs;

const CustomerDetail = () => {
  const history = useHistory();
  const params = useParams();

  const id = params.customerId;

  const [orders, orderLoading] = useFetch("orders");

  const [customer, loading, error] = useFetchByID("Customers", {
    id,
  });
  
  console.log(customer);

  const backToPreviousPage = () => {
    history.push("/customer");
  };

  const jumpHandler = () => {
    history.push("/order");
  };

  if (loading && orderLoading) return <Spin />;
  if (error) return <p>{error}</p>;

  return (
    <PageHeader title="Back To Customer" onBack={backToPreviousPage}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Customer Detail" key="1">
          <CustomerInfomation id={id} customer={customer} />
        </TabPane>
        <TabPane tab="Order History" key="2">
          <Button
            type="primary"
            onClick={jumpHandler}
            className="margin-bottom-8 "
          >
            New Order
          </Button>
          <CustomerOrder orders={orders} id={id} />
        </TabPane>
      </Tabs>
    </PageHeader>
  );
};

export default CustomerDetail;
