import * as React from 'react';
import {FC, ReactElement, useContext} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {MenuButton} from '../menu-button';
import {PortalPage} from '../../interfaces';
import {useDocumentScrollThrottled} from '../../hooks';
import {LayoutContext} from '../../contexts';

interface HeaderProps {
  logo: ReactElement;
  homePage?: PortalPage;
  facet?: ReactElement;
}

const Header: FC<HeaderProps> = ({logo, facet, homePage}) => {
  const {headerHidden, setHeaderHidden} = useContext(LayoutContext);
  const intl = useIntl();
  const {hrefLang} = useContext(LocaleContext);
  const headerLogoElement = React.cloneElement(logo, {
    className: styles['header__logo-image'],
    alt: intl.formatMessage({id: 'app.appName'}),
  });
  const MINIMUM_SCROLL = facet ? 86 : 72;
  const TIMEOUT_DELAY = 400;

  useDocumentScrollThrottled(callbackData => {
    const {previousScrollTop, currentScrollTop} = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setTimeout(() => {
      setHeaderHidden(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  const hiddenStyle = headerHidden ? styles['header-wrapper--hidden'] : '';

  return (
    <div className={classNames(hiddenStyle, styles['header-wrapper'])}>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <div className={styles['header__logo-container']}>
            {homePage ? (
              <Link
                to={homePage.path}
                hrefLang={hrefLang}
                title={intl.formatMessage({id: `pageTitles.${homePage.titleTranslationKey}`})}
              >
                {headerLogoElement}
              </Link>
            ) : (
              headerLogoElement
            )}
          </div>
          <div className={styles['header__elements-mobile']}>
            <MenuButton />
          </div>
          <div className={styles['header__elements-desktop']}>
            <div className={styles['header__element--large-spacing']}>
              <UserName />
            </div>
            <div className={styles['header__element--medium-spacing']}>
              <Logout />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      {facet && (
        <div className={styles['header__facet-container']}>
          {React.cloneElement(facet, {
            className: styles['header__facet-image'],
          })}
        </div>
      )}
    </div>
  );
};

export {Header};
