import {ReactElement} from 'react';
import {MenuIcon} from '../enums';

export interface PortalPage {
  path: string;
  titleTranslationKey: string;
  pageComponent: () => ReactElement;
  icon: MenuIcon;
  showInMenu: boolean;
  children?: Array<PortalPage>;
}
