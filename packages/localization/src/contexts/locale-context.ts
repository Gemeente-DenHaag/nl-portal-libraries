import * as React from 'react';
import {DEFAULT_LOCALES} from '../i18n';

export const LocaleContext = React.createContext({
  currentLocale: DEFAULT_LOCALES.ENGLISH,
  supportedLocales: Object.values(DEFAULT_LOCALES),
  hrefLang: '',
  setCurrentLocale: (value: string) => value,
});
