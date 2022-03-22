import React, { useCallback, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const location = useLocation();
  const prevLocation = location.state;
  const { keycloak } = useKeycloak();

  let prevPath;

  const login = useCallback(() => {
    prevPath = prevLocation?.from.pathname;
    localStorage.setItem("prevPath", prevPath);
    keycloak?.login();
  }, [keycloak]);

  if (!keycloak?.authenticated) {
    login();
  }

  const verifiedAuthByParseServer = async (authData) => {
    const URL = "http://localhost:1337/parse/users";
    try {
      const data = await fetch(URL, {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": " myAppId",
          "X-Parse-REST-API-Key": " restAPI",
          "X-Parse-Revocable-Session": "1",
          "Content-Type": " application/json",
        },
        body: JSON.stringify(authData),
      });
      const response = await data.json();
      console.log(response);
      if (response && response.sessionToken) {
        localStorage.setItem("sessionId", response.sessionToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (keycloak?.authenticated) {
    prevPath = localStorage.getItem("prevPath");

    const { tokenParsed, token, realmAccess } = keycloak;
    if (tokenParsed && token && realmAccess) {
      const authData = {
        authData: {
          keycloak: {
            id: tokenParsed.sub,
            access_token: token,
            roles: realmAccess.roles,
          },
        },
      };
      verifiedAuthByParseServer(authData);
    }
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
