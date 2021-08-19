import React from 'react';
import './App.css';
import '@gemeente-denhaag/design-tokens-components';
import {ExampleComponent} from '@nl-portal/user-interface';
import {KeycloakComponent} from '@nl-portal/authentication';

function App() {
  return (
    <KeycloakComponent
      clientId={`${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`}
      realm={`${process.env.REACT_APP_KEYCLOAK_REALM}`}
      url={`${process.env.REACT_APP_KEYCLOAK_URL}`}
      redirectUri={`${process.env.REACT_APP_KEYCLOAK_REDIRECT_URI}`}
    >
      <ExampleComponent />
    </KeycloakComponent>
  );
}

export default App;
