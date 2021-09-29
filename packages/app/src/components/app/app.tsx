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
  CasePage,
  PortalFooter,
  FormPage,
} from '@nl-portal/user-interface';
import {KeycloakWrapper} from '@nl-portal/authentication';
import {LocalizationProvider} from '@nl-portal/localization';
import {ArchiveIcon, DocumentIcon, GridIcon, InboxIcon} from '@gemeente-denhaag/icons';
import {ApolloWrapper} from '@nl-portal/api';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import Facet from '../../assets/facet.png';
import StatusHistoryBackground from '../../assets/status-history-background.svg';
import {config} from '../../config';

const pages: Array<PortalPage> = [
  {
    icon: <GridIcon />,
    pageComponent: <OverviewPage />,
    path: '/',
    titleTranslationKey: 'overview',
    showInMenu: true,
    isHome: true,
  },
  {
    icon: <InboxIcon />,
    pageComponent: <NotificationsPage />,
    path: '/berichten',
    titleTranslationKey: 'notifications',
    showInMenu: true,
    showMessagesCount: true,
  },
  {
    icon: <ArchiveIcon />,
    pageComponent: <CasesPage />,
    path: '/zaken',
    titleTranslationKey: 'cases',
    showInMenu: true,
    children: [
      {
        icon: <ArchiveIcon />,
        pageComponent: (
          <CasePage
            statusHistoryFacet={<img src={Facet} alt="" />}
            statusHistoryBackground={<img src={StatusHistoryBackground} alt="" />}
          />
        ),
        path: '/zaak',
        titleTranslationKey: 'cases',
        showInMenu: true,
      },
    ],
  },
  {
    icon: <DocumentIcon />,
    pageComponent: <ThemesPage />,
    path: '/themas',
    titleTranslationKey: 'themes',
    showInMenu: true,
  },
  {
    icon: <DocumentIcon />,
    pageComponent: <FormPage />,
    path: '/formulier',
    titleTranslationKey: 'form',
    showInMenu: false,
  },
];

const footer: PortalFooter = [
  {
    titleTranslationKey: 'theHague',
    links: [
      {linkTranslationKey: 'goToTheHague', url: 'https://www.denhaag.nl/nl.htm', hrefLang: 'nl'},
      {linkTranslationKey: 'goToTheHague', url: 'https://www.denhaag.nl/en.htm', hrefLang: 'en'},
    ],
  },
  {
    titleTranslationKey: 'disclaimers',
    links: [
      {
        linkTranslationKey: 'accessibility',
        url: 'https://www.denhaag.nl/nl/toegankelijkheidsverklaring.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'accessibility',
        url: 'https://www.denhaag.nl/en/toegankelijkheidsverklaring.htm',
        hrefLang: 'en',
      },
      {
        linkTranslationKey: 'dataProtection',
        url: 'https://www.denhaag.nl/nl/verklaring-inzake-gegevensbescherming.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'dataProtection',
        url: 'https://www.denhaag.nl/en/data-protection-declaration.htm',
        hrefLang: 'en',
      },
      {
        linkTranslationKey: 'proclaimer',
        url: 'https://www.denhaag.nl/home/algemeen/proclaimer.htm',
        hrefLang: 'nl',
      },
      {
        linkTranslationKey: 'proclaimer',
        url: 'https://www.denhaag.nl/en/proclaimer.htm',
        hrefLang: 'en',
      },
    ],
  },
];

const App = () => (
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
);

export {App};
