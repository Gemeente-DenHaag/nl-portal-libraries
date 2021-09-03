import {ReactElement} from 'react';

export interface PortalPage {
  path: string;
  titleTranslationKey: string;
  pageComponent: () => ReactElement;
  showInMenu?: boolean;
  icon?: ReactElement;
  children?: Array<PortalPage>;
}
