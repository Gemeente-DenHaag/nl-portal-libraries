import React from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {CasesPage, Layout, MenuIcon, OverviewPage, PortalPage} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import Facet from '../../assets/facet.png';

const pages: Array<PortalPage> = [
  {
    icon: MenuIcon.Overview,
    pageComponent: OverviewPage,
    pathTranslationKey: '/',
    titleTranslationKey: 'overview',
  },
  {
    icon: MenuIcon.Cases,
    pageComponent: CasesPage,
    pathTranslationKey: '/cases',
    titleTranslationKey: 'cases',
  },
];

const App = () => (
  <KeycloakWrapper
    clientId={process.env.REACT_APP_KEYCLOAK_CLIENT_ID}
    realm={process.env.REACT_APP_KEYCLOAK_REALM}
    url={process.env.REACT_APP_KEYCLOAK_URL}
    redirectUri={process.env.REACT_APP_KEYCLOAK_REDIRECT_URI}
  >
    <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
      <Layout
        pages={pages}
        headerLogo={<HeaderLogo />}
        headerFacet={<img src={Facet} alt="Logo" />}
      />
    </LocalizationProvider>
  </KeycloakWrapper>
);

export {App};
