import React, { useCallback } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const location = useLocation();
  const prevLocation = location.state;
  const { keycloak } = useKeycloak();

  let prevPath;
  const login = useCallback(async () => {
    prevPath = prevLocation?.from.pathname;
    localStorage.setItem("prevPath", prevPath);
    keycloak?.login();
  }, [keycloak]);

  let action;

  if (!keycloak?.authenticated) {
    action = login();
  }

 

  if (keycloak?.authenticated) {
    prevPath = localStorage.getItem("prevPath");
  }
  return (
    keycloak?.authenticated && (
      <Redirect
        to={{
          pathname: `${prevPath}`,
          state: prevPath,
        }}
      />
    )
  );
};

export default Login;
