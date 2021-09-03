import {ReactElement} from 'react';

export interface PortalPage {
  path: string;
  titleTranslationKey: string;
  pageComponent: () => ReactElement;
  showInMenu?: boolean;
  showMessagesCount?: boolean;
  icon?: ReactElement;
  children?: Array<PortalPage>;
}