import * as React from 'react';
import {ReactKeycloakProvider} from '@react-keycloak/web';
import PropTypes from 'prop-types';
import keycloak from './keycloak';

const KeycloakComponent = ({children}) => (
  <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>
);

KeycloakComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeycloakComponent;
