import React from "react";
import { Route, Switch } from "react-router-dom";

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
import Forbidden from "../pages/Forbidden";
import Test from "../pages/Test";

const Router = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }
 
  return (
    <Switch>
      <PrivateRoute path="/customer" component={Customer} exact />
      <PrivateRoute path="/customer/:customerId" component={CustomerDetail} />
      <PrivateRoute path="/order/:orderId" component={OrderDetail} />

      <Route path="/login" component={Login} exact />
      <Route path="/newCustomer" component={NewCustomer} exact />
      <Route path="/order" name="order" component={Order} exact />
      <Route path="/product" name="product" component={Product} exact />
      <Route path="/product/:productId" component={ProductDetail} exact />
      <Route path="/forbidden" component={Forbidden} exact />
      <Route path="/test" component={Test} exact />
    </Switch>
  );
};

export default Router;
