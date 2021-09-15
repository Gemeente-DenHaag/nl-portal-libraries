import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {FC, useContext} from 'react';
import styles from './language-switcher.module.scss';

interface LanguageSwitcherProps {
  mobileMenu?: boolean;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({mobileMenu}) => {
  const {currentLocale, setCurrentLocale, supportedLocales} = useContext(LocaleContext);
  const currentLocaleIndex = supportedLocales.findIndex(locale => locale === currentLocale);
  const nextLocale = supportedLocales[currentLocaleIndex + 1] || supportedLocales[0];

  return (
    <Button
      variant="secondary-action"
      onClick={() => setCurrentLocale(nextLocale)}
      className={mobileMenu ? styles['denhaag-button--mobile-menu'] : ''}
    >
      <FormattedMessage id={`locales.${nextLocale}`} />
    </Button>
  );
};

export {LanguageSwitcher};
