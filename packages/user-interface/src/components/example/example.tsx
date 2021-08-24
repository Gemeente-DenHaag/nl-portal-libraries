import * as React from 'react';
import {Button, StylesProvider, Card} from '@gemeente-denhaag/denhaag-component-library';
import {useKeycloak} from '@react-keycloak/web';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {useContext} from 'react';

const Example = () => {
  const {keycloak} = useKeycloak();
  const {currentLocale, setCurrentLocale, supportedLocales} = useContext(LocaleContext);

  const setNextLocale = (): void => {
    const currentLocaleIndex = supportedLocales.findIndex(locale => locale === currentLocale);
    const nextLocale = supportedLocales[currentLocaleIndex + 1];

    setCurrentLocale(nextLocale || supportedLocales[0]);
  };

  return (
    <StylesProvider>
      <FormattedMessage id="app.testMessage" />
      <Button onClick={setNextLocale}>
        <FormattedMessage id="app.languageName" />
      </Button>
      <Button onClick={() => keycloak.logout()}>
        <FormattedMessage id="app.logout" />
      </Button>
      <Card title="Test" date={new Date()} href="test" variant="case" />
    </StylesProvider>
  );
};

export {Example};
