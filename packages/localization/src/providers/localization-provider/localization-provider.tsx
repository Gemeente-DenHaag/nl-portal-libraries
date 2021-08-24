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
  const messages = customMessages ? deepmerge(DEFAULT_MESSAGES, customMessages) : DEFAULT_MESSAGES;
  const locales = customLocales || DEFAULT_LOCALES;
  const [currentLocale, setCurrentLocale] = useState(locales[Object.keys(locales)[0]]);
  const [supportedLocales] = useState(Object.values(locales));

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
