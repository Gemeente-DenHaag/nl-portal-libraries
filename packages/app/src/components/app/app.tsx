import React, {Fragment} from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {ApolloWrapper} from '@nl-portal/api';
import {Offline, Online} from 'react-detect-offline';
import {Layout} from '@nl-portal/user-interface';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import Facet from '../../assets/facet.png';
import {config} from '../../config';
import {footer, pages} from '../../configuration';

const App = () => (
  <Fragment>
    <Online>
      <KeycloakWrapper
        clientId={config.KEYCLOAK_CLIENT_ID}
        realm={config.KEYCLOAK_REALM}
        url={config.KEYCLOAK_URL}
        redirectUri={config.KEYCLOAK_REDIRECT_URI}
      >
        <ApolloWrapper uri={config.GRAPHQL_URI}>
          <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
            <Layout
              pages={pages}
              headerLogo={<HeaderLogo />}
              facet={<img src={Facet} alt="" />}
              footer={footer}
            />
          </LocalizationProvider>
        </ApolloWrapper>
      </KeycloakWrapper>
    </Online>
    <Offline>
      <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
        <Layout
          pages={pages}
          headerLogo={<HeaderLogo />}
          facet={<img src={Facet} alt="" />}
          footer={footer}
          offline
        />
      </LocalizationProvider>
    </Offline>
  </Fragment>
);

export {App};
