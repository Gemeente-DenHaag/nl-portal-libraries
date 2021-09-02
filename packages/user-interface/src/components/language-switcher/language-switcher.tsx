import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {useContext} from 'react';

const LanguageSwitcher = () => {
  const {currentLocale, setCurrentLocale, supportedLocales} = useContext(LocaleContext);
  const currentLocaleIndex = supportedLocales.findIndex(locale => locale === currentLocale);
  const nextLocale = supportedLocales[currentLocaleIndex + 1] || supportedLocales[0];

  return (
    <Button variant="secondary-action" onClick={() => setCurrentLocale(nextLocale)}>
      <FormattedMessage id={`locales.${nextLocale}`} />
    </Button>
  );
};

export {LanguageSwitcher};
