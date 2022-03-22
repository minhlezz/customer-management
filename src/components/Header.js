import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Spin } from "antd";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const [current, setCurrent] = useState(() => "");
  const { keycloak, initialized } = useKeycloak();

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const handleLogout = () => {
    localStorage.removeItem("sessionId")
    history.push("/product");
    keycloak.logout();
  };
  
  useEffect(() => {
    const path = location.pathname.substring(1, location.pathname.length);
    setCurrent(path);
  }, [location.pathname]);

  if (!initialized) return <Spin />;

  return (
    <Layout.Header className="bg-white" style={{ padding: 0 }}>
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
        {/* <Menu.Item key="test">
          <Link to="/test">Test</Link>
        </Menu.Item> */}
        {!keycloak?.authenticated && (
          <Menu.Item style={{ marginLeft: "auto" }} key="login">
            <Button type="button" onClick={() => keycloak.login()}>
              Login
            </Button>
          </Menu.Item>
        )}
        {!!keycloak?.authenticated && (
          <Menu.Item style={{ marginLeft: "auto" }} key="logout">
            <Button type="button" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
    </Layout.Header>
  );
};

export default Header;
