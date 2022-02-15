import { Layout } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Layout.Header style={{ padding: 0 }} className="bg-grey">
      <Link to="/">
        <Title style={{ textAlign: "center" }}>Customer Management</Title>
      </Link>
    </Layout.Header>
  );
};

export default Header;
