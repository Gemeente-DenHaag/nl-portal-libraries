import React from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {Layout} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import Facet from '../../assets/facet.png';
import {config} from '../../config';

const App = () => (
  <KeycloakWrapper
    clientId={config.KEYCLOAK_CLIENT_ID}
    realm={config.KEYCLOAK_REALM}
    url={config.KEYCLOAK_URL}
    redirectUri={config.KEYCLOAK_REDIRECT_URI}
  >
    <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
      <Layout headerLogo={<HeaderLogo />} headerFacet={<img src={Facet} alt="" />} />
    </LocalizationProvider>
  </KeycloakWrapper>
);

export {App};
