import {
  CasePage,
  CasesPage,
  DocumentsPage,
  NotificationsPage,
  OverviewPage,
  PortalPage,
  ThemesPage,
} from '@nl-portal/user-interface';
import {ArchiveIcon, DocumentIcon, GridIcon, InboxIcon} from '@gemeente-denhaag/icons';
import React from 'react';
import Facet from '../assets/facet.png';
import StatusHistoryBackground from '../assets/status-history-background.svg';

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
];

export {pages};
