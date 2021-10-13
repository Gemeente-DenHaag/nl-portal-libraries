import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
  facet?: ReactElement;
  footer: PortalFooter;
  offline?: boolean;
}

const LayoutComponent: FC<LayoutComponentProps> = ({headerLogo, facet, pages, footer, offline}) => {
  const {headerHeight} = useContext(LayoutContext);
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
        facet={facet}
        homePage={pages.find(page => page.isHome)}
        offline={offline}
      />
      <div className={styles['page-container']} style={{paddingBlockStart: headerHeight}}>
        <div className={styles['page-container__inner']}>
          {!offline ? (
            <Fragment>
              <div className={styles['page-container__menu']}>
                <Menu items={pages} />
              </div>
              <div className={styles['page-container__page']}>
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
          ) : (
            <Switch>
              <Route exact key={0} path={offlinePage.path}>
                <Page page={offlinePage}>{offlinePage.pageComponent}</Page>
              </Route>
              <Route key={1} render={() => <Redirect to={offlinePage.path} />} />
            </Switch>
          )}
        </div>
      </div>
      <Footer footer={footer} facet={facet} />
    </Router>
  );
};

const Layout: FC<LayoutComponentProps> = ({headerLogo, facet, pages, footer, offline}) => (
  <StylesProvider>
    <LayoutProvider initialPage={pages[0]}>
      <LayoutComponent
        pages={pages}
        headerLogo={headerLogo}
        footer={footer}
        facet={facet}
        offline={offline}
      />
    </LayoutProvider>
  </StylesProvider>
);

export {Layout};
