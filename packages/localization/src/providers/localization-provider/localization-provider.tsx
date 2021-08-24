import * as React from 'react';
import {FC, useState} from 'react';
import {IntlProvider} from 'react-intl';
import deepmerge from 'deepmerge';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../../i18n';
import {LocaleContext} from '../../contexts';

interface LocalizationProviderProps {
  children: React.ReactNode;
  customMessages?: {[key: string]: {[key: string]: string}};
  customLocales?: {[key: string]: string};
}

const LocalizationProvider: FC<LocalizationProviderProps> = ({
  children,
  customMessages,
  customLocales,
}) => {
  const messages = customMessages ? deepmerge(DEFAULT_MESSAGES, customMessages) : DEFAULT_MESSAGES;
  const locales = customLocales || DEFAULT_LOCALES;
  const [currentLocale, setCurrentLocale] = useState(locales[Object.keys(locales)[0]]);
  const [supportedLocales, setSupportedLocales] = useState(Object.values(locales));

  return (
    <LocaleContext.Provider
      // @ts-ignore
      value={{currentLocale, setCurrentLocale, supportedLocales, setSupportedLocales}}
    >
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export {LocalizationProvider};
