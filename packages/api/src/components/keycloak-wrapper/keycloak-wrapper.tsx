import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak, {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';
import {FC, useState} from 'react';

interface KeycloakWrapperProps extends KeycloakConfig {
  redirectUri: string;
}

const KeycloakWrapper: FC<KeycloakWrapperProps> = ({
  children,
  url,
  clientId,
  realm,
  redirectUri,
}) => {
  const [authClient] = useState(() => new (Keycloak as any)({url, clientId, realm}));
  const initOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad: 'login-required',
    flow: 'standard',
    redirectUri,
  };

  return (
    <ReactKeycloakProvider
      authClient={authClient}
      initOptions={initOptions}
      LoadingComponent={<div>Loading</div>}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export {KeycloakWrapper};
