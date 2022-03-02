import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("customer");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout.Header className="bg-grey" style={{ padding: 0 }}>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={current}
        onClick={handleClick}
      >
        <Menu.Item key="customer">
          <Link to="/customer">Customer</Link>
        </Menu.Item>
        <Menu.Item key="order">
          <Link to="/order">Order</Link>
        </Menu.Item>
        <Menu.Item key="product">
          <Link to="/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="test">
          <Link to="/test">Test</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
