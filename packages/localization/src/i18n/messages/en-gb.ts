import {DEFAULT_LOCALES} from '../default-locales';
import {Messages} from '../../interfaces';

export const EN_GB_MESSAGES: Messages = {
  [DEFAULT_LOCALES.ENGLISH]: {
    'locales.en-GB': 'English',
    'locales.nl-NL': 'Nederlands',
    'pageTitles.overview': 'Overview',
    'pageTitles.cases': 'Current cases',
    'pageTitles.notifications': 'My messages',
    'pageTitles.themes': 'Themes',
    'pageTitles.documents': 'Documents',
    'pageTitles.offline': 'No internet connection',
    'header.logout': 'Log out',
    'header.welcome': 'Welcome {userName}',
    'header.menuButton': 'Menu',
    'menu.close': 'Close menu',
    'menu.open': 'Open menu',
    'titles.completedCases': 'Closed cases',
    'cases.noOpenCases': 'There are no current cases.',
    'cases.noClosedCases': 'There are no closed cases.',
    'cases.fetchError': 'There was an error, try again later.',
    'case.caseNumber': 'case number',
    'case.creationDate': 'application date',
    'case.status': 'status',
    'case.documents': 'documents',
    'case.statusHeader': 'Status',
    'case.showAllDocuments': 'Show all documents',
    'case.fetchError': 'There was an error, try again later.',
    'case.statusUnknown': 'not available',
    'documents.fetchError': 'There was an error, try again later.',
    'documents.noDocuments': 'There are no documents.',
    'offline.warning': 'In order to use {applicationName}, an internet connection is required.',
    'element.loading': 'Loading',
    'element.download': 'Download',
  },
};
