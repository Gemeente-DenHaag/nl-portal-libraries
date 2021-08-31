import * as React from 'react';
import {FC, useState} from 'react';
import {IntlProvider} from 'react-intl';
import deepmerge from 'deepmerge';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../../i18n';
import {LocaleContext} from '../../contexts';
import {Locales, Messages} from '../../interfaces';

interface LocalizationProviderProps {
  customMessages?: Messages;
  customLocales?: Locales;
}

const LocalizationProvider: FC<LocalizationProviderProps> = ({
  children,
  customMessages,
  customLocales,
}) => {
  const LOCAL_STORAGE_LANG_KEY = 'NL_PORTAL_LANG';
  const savedLocale = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);

  const messages = customMessages ? deepmerge(DEFAULT_MESSAGES, customMessages) : DEFAULT_MESSAGES;
  const locales = customLocales || DEFAULT_LOCALES;

  const savedLocaleIndex = Object.values(locales).findIndex(locale => locale === savedLocale);
  const localeToUse = locales[Object.keys(locales)[savedLocaleIndex !== -1 ? savedLocaleIndex : 0]];

  const [currentLocale, setCurrentLocale] = useState(localeToUse);
  const [supportedLocales] = useState(Object.values(locales));

  localStorage.setItem(LOCAL_STORAGE_LANG_KEY, currentLocale);

  document.documentElement.lang = currentLocale.toLocaleLowerCase().split('-')[0];

  return (
    <LocaleContext.Provider
      // @ts-ignore
      value={{currentLocale, supportedLocales, setCurrentLocale}}
    >
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export {LocalizationProvider};
