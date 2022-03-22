import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "customer-management",
 clientId: "customer-react",
});

export default keycloak;