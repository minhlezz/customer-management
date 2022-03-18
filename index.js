var express = require("express");
var ParseDashboard = require("parse-dashboard");
var authKeycloak = require("./auth/keycloak");

const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
var app = express();

var parseServer = new ParseServer({
  databaseURI: "mongodb://localhost:27017/dev",
  cloud: './cloud/main.js',
  appId: "myAppId",
  masterKey: "myMasterKey",
  serverURL: "http://localhost:1337/parse",
  publicServerURL: "http://localhost:1337/parse",
  REST_API_KEY: "restAPI",
  auth: {
    keycloak: {
      config: require(`./auth/keycloak.json`),
      module: authKeycloak,
    },
  },
});


var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: "http://localhost:1337/parse",
      appId: "myAppId",
      masterKey: "myMasterKey",
      appName: "MyApp",
    },
  ],
});

const parseGraphQLServer = new ParseGraphQLServer(parseServer, {
  graphQLPath: "/graphql",
  playgroundPath: "/playground",
});

app.use("/parse", parseServer.app);
app.use("/dashboard", dashboard);

parseGraphQLServer.applyGraphQL(app);
parseGraphQLServer.applyPlayground(app);

app.listen(1337, function() {
  console.log("parse-server-example running on port 1337.");
  console.log("GraphQL API running on http://localhost:1337/graphql");
  console.log("GraphQL Playground running on http://localhost:1337/playground");
  console.log("GraphQL Playground running on http://localhost:1337/dashboard");
});
