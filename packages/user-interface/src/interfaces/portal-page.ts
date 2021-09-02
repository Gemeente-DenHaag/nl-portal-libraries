import {ReactElement} from 'react';
import {MenuIcon} from '../enums';

export interface PortalPage {
  pathTranslationKey: string;
  titleTranslationKey: string;
  pageComponent: () => ReactElement;
  icon: MenuIcon;
  children?: Array<PortalPage>;
}
