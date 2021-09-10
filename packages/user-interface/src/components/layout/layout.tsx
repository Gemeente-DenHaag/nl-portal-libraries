import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Header} from '../header';
import {Menu} from '../menu';
import {LayoutContext} from '../../contexts';
import {PortalFooter, PortalPage} from '../../interfaces';
import styles from './layout.module.scss';
import {Page} from '../page';
import {CurrentPageIndicator} from '../current-page-indicator';
import {Footer} from '../footer';

interface LayoutProps {
  pages: Array<PortalPage>;
  headerLogo: ReactElement;
  facet?: ReactElement;
  footer: PortalFooter;
}

const Layout: FC<LayoutProps> = ({headerLogo, facet, pages, footer}) => {
  const [menuOpened, setMenuState] = useState(false);
  const [messagesCount, setMessagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(pages[0]);
  const hideMenu = () => setMenuState(false);
  const showMenu = () => setMenuState(true);

  return (
    <StylesProvider>
      <LayoutContext.Provider
        value={{
          menuOpened,
          hideMenu,
          showMenu,
          messagesCount,
          setMessagesCount,
          currentPage,
          setCurrentPage,
        }}
      >
        <Router>
          <Header logo={headerLogo} facet={facet} homePage={pages.find(page => page.isHome)} />
          <CurrentPageIndicator />
          <div className={styles['page-container']}>
            <div className={styles['page-container__inner']}>
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
                            <Route key={childPage.path} path={`${page.path}${childPage.path}`}>
                              <Page page={childPage}>{childPage.pageComponent}</Page>
                            </Route>
                          ))
                        : []),
                    ],
                    []
                  )}
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
              </div>
            </div>
          </div>
          <Footer footer={footer} facet={facet} />
        </Router>
      </LayoutContext.Provider>
    </StylesProvider>
  );
};

export {Layout};
