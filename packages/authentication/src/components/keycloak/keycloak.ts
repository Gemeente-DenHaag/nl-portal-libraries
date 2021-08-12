import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'Demo',
  clientId: 'react-app',
};

const keycloak = new (Keycloak as any)(keycloakConfig);

export default keycloak;
