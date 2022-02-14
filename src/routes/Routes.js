import React from "react";
import { Route, Switch } from "react-router-dom";

import Customer from "../pages/Customer";
import NewCustomer from "../pages/NewCustomer";
import CustomerDetail from "../pages/CustomerDetail";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import ProductDetail from "../pages/ProductDetail";

import NotFound from "../pages/NotFound";
import RedirectRoute from "./RedirectRoute";

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
    path: "/newCustomer",
    name: "newCustomer",
    component: NewCustomer,
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
    path: "/order",
    name: "order",
    component: Order,
    exact: true,
    redirect: false,
  },
  {
    path: "/order/:orderId",
    name: "orderDetail",
    component: OrderDetail,
    redirect: false,
  },

  {
    path: "/product/:productId",
    name: "productDetail",
    component: ProductDetail,
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
