import * as React from 'react';
import {FC, Fragment, ReactElement, useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {LocaleContext} from '@nl-portal/localization';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import useSize from '@react-hook/size';
import useScrollPosition from '@react-hook/window-scroll';
import styles from './header.module.scss';
import {LanguageSwitcher} from '../language-switcher';
import {Logout} from '../logout';
import {UserName} from '../user-name';
import {PortalPage} from '../../interfaces';
import {LayoutContext} from '../../contexts';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';
import {CurrentPageIndicator} from '../current-page-indicator';
import {MenuToggleButton} from '../menu-toggle-button';

interface HeaderProps {
  logo: ReactElement;
  homePage?: PortalPage;
  facet?: ReactElement;
  offline?: boolean;
}

const Header: FC<HeaderProps> = ({logo, facet, homePage, offline}) => {
  const {mobileMenuOpened, menuOpened, hideMobileMenu, hideMenu, headerHeight, setHeaderHeight} =
    useContext(LayoutContext);
  const {hrefLang} = useContext(LocaleContext);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const intl = useIntl();
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerMarginTop, setHeaderMarginTop] = useState(0);
  const headerContainerRef = React.useRef(null);
  const [, height] = useSize(headerContainerRef);
  const scrollY = useScrollPosition(15);
  const MOBILE_HEADER_HEIGHT = facet ? 86 : 72;
  const headerLogoElement = React.cloneElement(logo, {
    className: styles['header__logo-image'],
    alt: intl.formatMessage({id: 'app.appName'}),
  });
  const online = !offline;

  useEffect(() => {
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  }, [height]);

  useEffect(() => {
    const scrollDown = previousScrollY < scrollY;
    const scrollUp = previousScrollY > scrollY;
    const pastPositionCutoff = scrollY > MOBILE_HEADER_HEIGHT;

    if (scrollDown) {
      hideMobileMenu();
    }

    if (scrollUp) {
      setHeaderMarginTop(0);
    } else if (pastPositionCutoff) {
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    }

    if (pastPositionCutoff && !headerFixed) {
      setHeaderFixed(true);
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    } else if (
      scrollY === 0 ||
      (scrollY <= MOBILE_HEADER_HEIGHT && headerFixed && headerMarginTop === MOBILE_HEADER_HEIGHT)
    ) {
      setHeaderFixed(false);
    }

    setPreviousScrollY(scrollY);
  }, [scrollY]);

  useEffect(() => {
    if (menuOpened || mobileMenuOpened) {
      hideMenu();
      hideMobileMenu();
    }

    if (headerFixed) {
      setHeaderMarginTop(MOBILE_HEADER_HEIGHT);
    }
  }, [isTablet]);

  return (
    <div
      className={classNames(styles['header-container'], {
        [styles['header-container--fixed']]: !isTablet && headerFixed,
      })}
      ref={headerContainerRef}
      style={{marginBlockStart: !isTablet ? -headerMarginTop : 0}}
    >
      <div className={styles['header-wrapper']}>
        <header className={styles.header}>
          <div className={styles.header__inner}>
            <div className={styles['header__logo-container']}>
              {homePage ? (
                <Link
                  to={homePage.path}
                  hrefLang={hrefLang}
                  title={intl.formatMessage({id: `pageTitles.${homePage.titleTranslationKey}`})}
                  className={styles['header__logo-link']}
                >
                  {headerLogoElement}
                </Link>
              ) : (
                headerLogoElement
              )}
            </div>
            <div className={styles['header__elements-mobile']}>
              <MenuToggleButton />
            </div>
            <div className={styles['header__elements-desktop']}>
              {online && (
                <Fragment>
                  <div className={styles['header__element--large-spacing']}>
                    <UserName />
                  </div>
                  <div className={styles['header__element--medium-spacing']}>
                    <Logout />
                  </div>
                </Fragment>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        <div
          className={classNames(styles['header__mobile-menu'], {
            [styles['header__mobile-menu--hidden']]: !mobileMenuOpened,
          })}
        >
          {online && (
            <Fragment>
              <UserName mobileMenu />
              <Logout mobileMenu />
            </Fragment>
          )}
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
      {online && <CurrentPageIndicator />}
    </div>
  );
};

export {Header};
