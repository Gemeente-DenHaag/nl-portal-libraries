import React from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@nl-portal/user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {
  CasesPage,
  Layout,
  NotificationsPage,
  OverviewPage,
  PortalPage,
  ThemesPage,
} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {ArchiveIcon, DocumentIcon, GridIcon, InboxIcon} from '@gemeente-denhaag/icons';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import Facet from '../../assets/facet.png';

const pages: Array<PortalPage> = [
  {
    icon: <GridIcon />,
    pageComponent: OverviewPage(),
    path: '/',
    titleTranslationKey: 'overview',
    showInMenu: true,
    isHome: true,
  },
  {
    icon: <InboxIcon />,
    pageComponent: NotificationsPage(),
    path: '/berichten',
    titleTranslationKey: 'notifications',
    showInMenu: true,
    showMessagesCount: true,
  },
  {
    icon: <ArchiveIcon />,
    pageComponent: CasesPage(),
    path: '/zaken',
    titleTranslationKey: 'cases',
    showInMenu: true,
  },
  {
    icon: <DocumentIcon />,
    pageComponent: ThemesPage(),
    path: '/themas',
    titleTranslationKey: 'themes',
    showInMenu: true,
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
      <Layout pages={pages} headerLogo={<HeaderLogo />} headerFacet={<img src={Facet} alt="" />} />
    </LocalizationProvider>
  </KeycloakWrapper>
);

export {App};
