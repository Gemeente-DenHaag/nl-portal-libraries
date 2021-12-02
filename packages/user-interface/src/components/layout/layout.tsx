import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/components-react';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import classNames from 'classnames';
import {Header} from '../header';
import {Menu} from '../menu';
import {PortalFooter, PortalPage} from '../../interfaces';
import styles from './layout.module.scss';
import {Page} from '../page';
import {Footer} from '../footer';
import {LayoutProvider} from '../../providers';
import {LayoutContext} from '../../contexts';
import {LinkToParent} from '../link-to-parent';
import {OfflinePage} from '../../pages';

interface LayoutComponentProps {
  pages: Array<PortalPage>;
  headerLogo: ReactElement;
  headerLogoSmall: ReactElement;
  facet?: ReactElement;
  footer: PortalFooter;
  offline?: boolean;
}

const LayoutComponent: FC<LayoutComponentProps> = ({
  headerLogo,
  facet,
  pages,
  footer,
  offline,
  headerLogoSmall,
}) => {
  const {headerHeight, fullscreenForm} = useContext(LayoutContext);
  const online = !offline;
  const offlinePage = {
    path: '/',
    titleTranslationKey: 'offline',
    pageComponent: <OfflinePage />,
    isHome: true,
  };

  return (
    <Router>
      <Header
        logo={headerLogo}
        logoSmall={headerLogoSmall}
        facet={facet}
        homePage={pages.find(page => page.isHome)}
        offline={offline}
      />
      <div className={styles['page-container']} style={{paddingBlockStart: headerHeight}}>
        <div className={styles['page-container__inner']}>
          {online && (
            <Fragment>
              {!fullscreenForm && (
                <div className={styles['page-container__menu']}>
                  <Menu items={pages} />
                </div>
              )}
              <div
                className={classNames(styles['page-container__page'], {
                  [styles['page-container__page--fullscreen']]: fullscreenForm,
                })}
              >
                <Switch>
                  {pages.reduce(
                    (accumulator, page) => [
                      ...accumulator,
                      <Route exact key={page.path} path={page.path}>
                        <Page page={page}>{page.pageComponent}</Page>
                      </Route>,
                      ...(page.children
                        ? page.children.map(childPage => (
                            <Route
                              exact
                              key={childPage.path}
                              path={`${page.path}${childPage.path}`}
                            >
                              <Page page={childPage}>
                                <Fragment>
                                  {childPage.showLinkToParent && <LinkToParent parentPage={page} />}
                                  {childPage.pageComponent}
                                </Fragment>
                              </Page>
                            </Route>
                          ))
                        : []),
                    ],
                    []
                  )}
                  <Route
                    render={() => <Redirect to={sessionStorage.getItem('entryUrl') || '/'} />}
                  />
                </Switch>
              </div>
            </Fragment>
          )}
          {offline && (
            <Switch>
              <Route exact key={0} path={offlinePage.path}>
                <Page page={offlinePage}>{offlinePage.pageComponent}</Page>
              </Route>
              <Route key={1} render={() => <Redirect to={offlinePage.path} />} />
            </Switch>
          )}
        </div>
      </div>
      {online && <Footer footer={footer} facet={facet} />}
    </Router>
  );
};

const Layout: FC<LayoutComponentProps> = ({
  headerLogo,
  facet,
  pages,
  footer,
  offline,
  headerLogoSmall,
}) => (
  <StylesProvider>
    <LayoutProvider initialPage={pages[0]}>
      <LayoutComponent
        pages={pages}
        headerLogo={headerLogo}
        headerLogoSmall={headerLogoSmall}
        footer={footer}
        facet={facet}
        offline={offline}
      />
    </LayoutProvider>
  </StylesProvider>
);

export {Layout};
