import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import sourceRoles from "./index.json";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { keycloak } = useKeycloak();
  const [currentRole] = keycloak?.realmAccess?.roles || [];

  const userCanAccess = () => {
    const userHasRoutes = sourceRoles[currentRole];
    return userHasRoutes.includes(path);
  };
  console.log(keycloak);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!keycloak.authenticated) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }

        return userCanAccess() ? (
          <Component {...props} currentRole={currentRole} />
        ) : (
          <Redirect
            to={{
              pathname: "forbidden",
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
