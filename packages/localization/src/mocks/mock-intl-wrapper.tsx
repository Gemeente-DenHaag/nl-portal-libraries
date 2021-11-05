import {IntlProvider} from 'react-intl';
import React, {ReactElement} from 'react';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../i18n';

const mockIntlWrapper = ({children}: {children: ReactElement}) => {
  const locale = DEFAULT_LOCALES.ENGLISH;
  const messages = DEFAULT_MESSAGES[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export {mockIntlWrapper};
