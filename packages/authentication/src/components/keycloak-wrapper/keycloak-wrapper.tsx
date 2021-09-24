import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak, {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';
import {FC, useContext, useState} from 'react';
import {KeycloakContext} from '../../contexts';

interface KeycloakWrapperProps extends KeycloakConfig {
  redirectUri: string;
}

const KeycloakProvider: FC<KeycloakWrapperProps> = ({
  children,
  url,
  clientId,
  realm,
  redirectUri,
}) => {
  const {setKeycloakToken} = useContext(KeycloakContext);
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
      autoRefreshToken
      onTokens={({token}) => {
        setKeycloakToken(token || '');
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

const KeycloakWrapper: FC<KeycloakWrapperProps> = props => {
  const [keycloakToken, setKeycloakToken] = useState('');
  const ENTRY_URL_KEY = 'entryUrl';
  const entryUrl = sessionStorage.getItem(ENTRY_URL_KEY);

  if (!entryUrl) {
    const {host, href} = window.location;
    const splitHref = href.split(host);
    const entryUrlPart = splitHref[1];
    sessionStorage.setItem(ENTRY_URL_KEY, !entryUrlPart.includes('keycloak') ? entryUrlPart : '/');
  }

  return (
    <KeycloakContext.Provider
      value={{
        keycloakToken,
        setKeycloakToken,
      }}
    >
      <KeycloakProvider {...props} />
    </KeycloakContext.Provider>
  );
};

export {KeycloakWrapper};
