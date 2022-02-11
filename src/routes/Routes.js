import React from "react";
import { Route, Switch } from "react-router-dom";
import Customer from "../pages/Customer";
import CustomerDetail from "../pages/CustomerDetail";
import RedirectRoute from "./RedirectRoute";
import NotFound from "../pages/NotFound";

const mainRoutes = [
  {
    path: "/",
    name: "default",
    redirect: true,
    exact: true,
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    exact: true,
    redirect: false,
  },
  {
    path: "/customer/:customerId",
    name: "customerDetail",
    component: CustomerDetail,
    redirect: false,
  },
  {
    path: "*",
    name: "default",
    component: NotFound,
    redirect: false,
  },
];

const Router = () => {
  return (
    <Switch>
      {mainRoutes.map((route) =>
        route.redirect ? (
          <RedirectRoute {...route} key={route.name} />
        ) : (
          <Route {...route} key={route.name} />
        )
      )}
    </Switch>
  );
};

export default Router;
