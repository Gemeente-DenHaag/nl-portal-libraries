import * as React from 'react';
import PropTypes from 'prop-types';
import {FC, useState} from 'react';
import {IntlProvider} from 'react-intl';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../../i18n';
import {LocaleContext} from '../../contexts';

interface LocalizationProviderProps {
  children: React.ReactNode;
}

const LocalizationProvider: FC<LocalizationProviderProps> = ({children}) => {
  const [currentLocale, setCurrentLocale] = useState(DEFAULT_LOCALES.ENGLISH);
  const [supportedLocales, setSupportedLocales] = useState(Object.values(DEFAULT_LOCALES));

  return (
    <LocaleContext.Provider
      // @ts-ignore
      value={{currentLocale, setCurrentLocale, supportedLocales, setSupportedLocales}}
    >
      <IntlProvider locale={currentLocale} messages={DEFAULT_MESSAGES[currentLocale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {LocalizationProvider};
