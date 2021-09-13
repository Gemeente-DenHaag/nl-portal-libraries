import * as React from 'react';
import {FC, ReactElement, useContext, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import useSize from '@react-hook/size';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {MenuButton} from '../menu-button';
import {PortalPage} from '../../interfaces';
import {LayoutContext} from '../../contexts';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {CurrentPageIndicator} from '../current-page-indicator';

interface HeaderProps {
  logo: ReactElement;
  homePage?: PortalPage;
  facet?: ReactElement;
}

const Header: FC<HeaderProps> = ({logo, facet, homePage}) => {
  const {mobileMenuOpened, menuOpened, hideMobileMenu, hideMenu, headerHeight, setHeaderHeight} =
    useContext(LayoutContext);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const intl = useIntl();
  const {hrefLang} = useContext(LocaleContext);
  const headerLogoElement = React.cloneElement(logo, {
    className: styles['header__logo-image'],
    alt: intl.formatMessage({id: 'app.appName'}),
  });

  const headerContainerRef = React.useRef(null);
  const [, height] = useSize(headerContainerRef);

  useEffect(() => {
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  }, [height]);

  useEffect(() => {
    if (menuOpened || mobileMenuOpened) {
      hideMenu();
      hideMobileMenu();
    }
  }, [isTablet]);

  return (
    <div className={styles['header-container']} ref={headerContainerRef}>
      <div className={styles['header-wrapper']}>
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
        <div
          className={classNames(styles['header__mobile-menu'], {
            [styles['header__mobile-menu--hidden']]: !mobileMenuOpened,
          })}
        >
          <UserName mobileMenu />
          <Logout mobileMenu />
          <LanguageSwitcher mobileMenu />
        </div>
        {facet && (
          <div className={styles['header__facet-container']}>
            {React.cloneElement(facet, {
              className: styles['header__facet-image'],
            })}
          </div>
        )}
      </div>
      <CurrentPageIndicator />
    </div>
  );
};

export {Header};
