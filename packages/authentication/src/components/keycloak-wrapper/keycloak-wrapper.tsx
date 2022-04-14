import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import Keycloak, {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';
import {FC, Fragment, useContext, useState} from 'react';
import jwtDecode from 'jwt-decode';
import {formatUrlTrailingSlash} from '../../utils';
import {KeycloakContext} from '../../contexts';
import {DecodedToken} from '../../interfaces';

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
  const {setKeycloakToken, setDecodedToken} = useContext(KeycloakContext);
  const [authClient] = useState(
    () => new (Keycloak as any)({url: formatUrlTrailingSlash(`${url}`, false), clientId, realm})
  );
  const initOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad: 'login-required',
    flow: 'standard',
    redirectUri: formatUrlTrailingSlash(redirectUri, false),
  };
  const decodeToken = (jwtToken: string) => jwtDecode<DecodedToken>(jwtToken);

  return (
    <ReactKeycloakProvider
      authClient={authClient}
      initOptions={initOptions}
      LoadingComponent={<Fragment />}
      autoRefreshToken
      onTokens={({token}) => {
        setKeycloakToken(token || '');
        if (token) setDecodedToken(decodeToken(token));
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

const KeycloakWrapper: FC<KeycloakWrapperProps> = props => {
  const [keycloakToken, setKeycloakToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(undefined);
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
        decodedToken,
        setDecodedToken,
      }}
    >
      <KeycloakProvider {...props} />
    </KeycloakContext.Provider>
  );
};

export {KeycloakWrapper};
