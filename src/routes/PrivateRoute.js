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

  // const verifiedAuthByParseServer = async (authData) => {
  //   const URL = "http://localhost:1337/parse/users";
  //   try {
  //     const data = await fetch(URL, {
  //       method: "POST",
  //       headers: {
  //         "X-Parse-Application-Id": " myAppId",
  //         "X-Parse-REST-API-Key": " restAPI",
  //         "X-Parse-Revocable-Session": "1",
  //         "Content-Type": " application/json",
  //       },
  //       body: JSON.stringify(authData),
  //     });
  //     const response = await data.json();
  //     console.log(response);
  //     if (response && response.sessionToken) {
  //       localStorage.setItem("sessionId", response.sessionToken);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // if (keycloak.authenticated) {
  //   const { tokenParsed, token, realmAccess } = keycloak;
  //   if (tokenParsed && token && realmAccess) {
  //     const authData = {
  //       authData: {
  //         keycloak: {
  //           id: tokenParsed.sub,
  //           access_token: token,
  //           roles: realmAccess.roles,
  //         },
  //       },
  //     };
  //     verifiedAuthByParseServer(authData);
  //   }
  // }

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
