import {IntlProvider} from 'react-intl';
import {render} from '@testing-library/react';
import React, {ReactElement} from 'react';
import {DEFAULT_LOCALES, DEFAULT_MESSAGES} from '../i18n';

const locale = DEFAULT_LOCALES.ENGLISH;
const messages = DEFAULT_MESSAGES[locale];

export const renderWithReactIntl = (component: ReactElement) =>
  render(
    <IntlProvider locale={locale} messages={messages}>
      {component}
    </IntlProvider>
  );
