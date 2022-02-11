import { Layout } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";

const Header = () => {
  return (
    <Layout.Header style={{ padding: 0 }} className="bg-grey">
      <Title style={{ textAlign: "center" }}>Customer Management</Title>
    </Layout.Header>
  );
};

export default Header;
