import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {useContext} from 'react';

const LanguageSwitcher = () => {
  const {currentLocale, setCurrentLocale, supportedLocales} = useContext(LocaleContext);

  const setNextLocale = (): void => {
    const currentLocaleIndex = supportedLocales.findIndex(locale => locale === currentLocale);
    const nextLocale = supportedLocales[currentLocaleIndex + 1];

    setCurrentLocale(nextLocale || supportedLocales[0]);
  };

  return (
    <Button variant="secondary-action" onClick={setNextLocale}>
      <FormattedMessage id="app.languageName" />
    </Button>
  );
};

export {LanguageSwitcher};
