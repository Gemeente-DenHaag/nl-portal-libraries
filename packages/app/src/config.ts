import {Config} from './interfaces';

export const config: Config = {
  KEYCLOAK_URL: window.KEYCLOAK_URL,
  KEYCLOAK_REALM: window.KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: window.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REDIRECT_URI: window.KEYCLOAK_REDIRECT_URI,
};
