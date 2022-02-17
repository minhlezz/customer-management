import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Layout.Header className="bg-grey" style={{ padding: 0 }}>
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/customer">Customer</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/order">Order</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/product">Product</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
