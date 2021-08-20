import React from 'react';
import './app.css';
import '@gemeente-denhaag/design-tokens-components';
import {Example} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';

function App() {
  return (
    <KeycloakWrapper
      clientId={`${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`}
      realm={`${process.env.REACT_APP_KEYCLOAK_REALM}`}
      url={`${process.env.REACT_APP_KEYCLOAK_URL}`}
      redirectUri={`${process.env.REACT_APP_KEYCLOAK_REDIRECT_URI}`}
    >
      <Example />
    </KeycloakWrapper>
  );
}

export {App};
