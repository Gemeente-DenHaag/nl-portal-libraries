import * as React from 'react';
import {DEFAULT_LOCALES} from '../i18n';

export const LocaleContext = React.createContext({
  locale: DEFAULT_LOCALES.ENGLISH,
  setLocale: (value: string) => value,
});
