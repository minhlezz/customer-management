import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak/keycloak";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
  headers: {
    "X-Parse-Application-Id": "myAppId",
    "X-Parse-Master-Key": "myMasterKey", // (optional)
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactKeycloakProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
