import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import PropTypes from 'prop-types';
import Keycloak, {KeycloakConfig} from 'keycloak-js';
import {FC, useState} from 'react';

interface KeycloakProps extends KeycloakConfig {
  children?: React.ReactNode;
}

const KeycloakComponent: FC<KeycloakProps> = ({children, url, clientId, realm}) => {
  const [keycloakClient] = useState(() => new (Keycloak as any)({url, clientId, realm}));

  return <ReactKeycloakProvider authClient={keycloakClient}>{children}</ReactKeycloakProvider>;
};

KeycloakComponent.propTypes = {
  children: PropTypes.node.isRequired,
  clientId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  realm: PropTypes.string.isRequired,
};

export {KeycloakComponent};
