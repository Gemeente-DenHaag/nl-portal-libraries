import React, {Fragment} from 'react';
import '@gemeente-denhaag/design-tokens-components';
import '@gemeente-denhaag/nl-portal-user-interface/dist/index.css';
import '../../styles/nl-portal-design-tokens.css';
import {KeycloakWrapper} from '@gemeente-denhaag/nl-portal-authentication';
import {LocalizationProvider} from '@gemeente-denhaag/nl-portal-localization';
import {ApolloWrapper} from '@gemeente-denhaag/nl-portal-api';
import {Offline, Online} from 'react-detect-offline';
import {
  AccountPage,
  CasePage,
  CasesPage,
  DocumentsPage,
  FormPage,
  Layout,
  NotificationsPage,
  OverviewPage,
  PortalFooter,
  PortalPage,
  ThemesPage,
  EditAccountPage,
} from '@gemeente-denhaag/nl-portal-user-interface';
import {ArchiveIcon, DocumentIcon, GridIcon, InboxIcon, UserIcon} from '@gemeente-denhaag/icons';
import {CUSTOM_MESSAGES} from '../../i18n';
import {ReactComponent as HeaderLogo} from '../../assets/header-logo.svg';
import {ReactComponent as HeaderLogoSmall} from '../../assets/header-logo-small.svg';
import Facet from '../../assets/facet.png';
import {config} from '../../config';
import StatusHistoryBackground from '../../assets/status-history-background.svg';

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
        showLinkToParent: true,
      },
      {
        icon: <ArchiveIcon />,
        pageComponent: <DocumentsPage />,
        path: '/zaak/documenten',
        titleTranslationKey: 'cases',
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
    icon: <UserIcon />,
    pageComponent: <AccountPage />,
    path: '/account',
    titleTranslationKey: 'account',
    showInMenu: true,
    children: [
      {
        icon: <UserIcon />,
        pageComponent: <EditAccountPage />,
        path: '/aanpassen',
        titleTranslationKey: 'account',
      },
    ],
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
              headerLogoSmall={<HeaderLogoSmall />}
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
          headerLogoSmall={<HeaderLogoSmall />}
          facet={<img src={Facet} alt="" />}
          footer={footer}
          offline
        />
      </LocalizationProvider>
    </Offline>
  </Fragment>
);

export {App};
