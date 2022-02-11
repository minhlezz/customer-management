import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      <Redirect to={{ pathname: "/customer" }} />
    </Route>
  );
};

export default PrivateRoute;
