import * as React from 'react';

interface LocaleContextInterface {
  currentLocale: string;
  supportedLocales: Array<string>;
  hrefLang: string;
  setCurrentLocale: (value: string) => void;
}

export const LocaleContext = React.createContext<LocaleContextInterface>(
  {} as LocaleContextInterface
);
