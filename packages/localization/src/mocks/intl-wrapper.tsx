// eslint-disable-next-line import/no-extraneous-dependencies
import {IntlProvider} from 'react-intl';
import React, {ReactElement} from 'react';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../i18n';

const locale = DEFAULT_LOCALES.ENGLISH;
const messages = DEFAULT_MESSAGES[locale];

export const intlWrapper = ({children}: {children: ReactElement}) => (
  <IntlProvider locale={locale} messages={messages}>
    {children}
  </IntlProvider>
);
