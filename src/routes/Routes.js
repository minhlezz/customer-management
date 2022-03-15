import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Customer from "../pages/Customer";
import NewCustomer from "../pages/NewCustomer";
import CustomerDetail from "../pages/CustomerDetail";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

// import NotFound from "../pages/NotFound";
import { useKeycloak } from "@react-keycloak/web";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";

const Router = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route path="/customer" component={Customer} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/newCustomer" component={NewCustomer} exact />
      <Route path="/customer/:customerId" component={CustomerDetail} />
      <PrivateRoute path="/order" name="order" component={Order} exact />
      <Route path="/order/:orderId" component={OrderDetail} />
      <Route path="/product" name="product" component={Product} exact />
      <Route path="/product/:productId" component={ProductDetail} exact />
    </Switch>
  );
};

export default Router;
