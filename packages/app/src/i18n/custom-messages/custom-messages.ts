import {Messages} from '@nl-portal/localization';
import {NL_NL_MESSAGES} from './nl-nl';
import {EN_GB_MESSAGES} from './en-gb';
import {FR_FR_MESSAGES} from './fr-fr';

export const CUSTOM_MESSAGES: Messages = {
  ...NL_NL_MESSAGES,
  ...EN_GB_MESSAGES,
  ...FR_FR_MESSAGES,
};
