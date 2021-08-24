import * as React from 'react';
import {DEFAULT_LOCALES} from '../i18n';

export const LocaleContext = React.createContext({
  currentLocale: DEFAULT_LOCALES.ENGLISH,
  setCurrentLocale: (value: string) => value,
  supportedLocales: Object.values(DEFAULT_LOCALES),
  setSupportedLocales: (value: Array<string>) => value,
});
