import React from "react";
import { Button, Card, Descriptions } from "antd";
import Title from "antd/lib/typography/Title";

const OrderList = (props) => {
  const { orders } = props;

  const orderList = orders?.products.map((order, index) => {
    return (
      <Card
        title={`Item - ${index + 1}`}
        type="inner"
        key={order.productId}
        className="margin-bottom-8"
      >
        <Descriptions bordered column={2} className="bg-white padding-top-20">
          <Descriptions.Item label="Product">
            {order.productName}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {order.productPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            {order.productQuantity}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  });

  const onCheckout = () => {
    props.checkoutHandler();
  }

  return (
    <div className="margin-25">
      <Title level={4} type="secondary">
        Order List
      </Title>
      <div className="dflex justify-end" style={{ marginBottom: "8px" }}>
        <Button type="danger" onClick={onCheckout}>
          Checkout
        </Button>
      </div>
      {orderList}
    </div>
  );
};

export default OrderList;
