import React from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/user-interface/dist/index.css';
import {Layout} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {CUSTOM_MESSAGES, CUSTOM_LOCALES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';

function App() {
  return (
    <KeycloakWrapper
      clientId={`${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`}
      realm={`${process.env.REACT_APP_KEYCLOAK_REALM}`}
      url={`${process.env.REACT_APP_KEYCLOAK_URL}`}
      redirectUri={`${process.env.REACT_APP_KEYCLOAK_REDIRECT_URI}`}
    >
      <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={CUSTOM_LOCALES}>
        <Layout headerLogo={<HeaderLogo />} />
      </LocalizationProvider>
    </KeycloakWrapper>
  );
}

export {App};
