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
  const [locale, setLocale] = useState(DEFAULT_LOCALES.ENGLISH);

  return (
    // @ts-ignore
    <LocaleContext.Provider value={{locale, setLocale}}>
      <IntlProvider locale={locale} messages={DEFAULT_MESSAGES[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

LocalizationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {LocalizationProvider};
