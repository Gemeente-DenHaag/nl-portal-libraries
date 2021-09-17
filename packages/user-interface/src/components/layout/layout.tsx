import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Header} from '../header';
import {Menu} from '../menu';
import {PortalFooter, PortalPage} from '../../interfaces';
import styles from './layout.module.scss';
import {Page} from '../page';
import {Footer} from '../footer';
import {LayoutProvider} from '../../providers';
import {LayoutContext} from '../../contexts';

interface LayoutComponentProps {
  pages: Array<PortalPage>;
  headerLogo: ReactElement;
  facet?: ReactElement;
  footer: PortalFooter;
}

const LayoutComponent: FC<LayoutComponentProps> = ({headerLogo, facet, pages, footer}) => {
  const {headerHeight} = useContext(LayoutContext);

  return (
    <Router>
      <Header logo={headerLogo} facet={facet} homePage={pages.find(page => page.isHome)} />
      <div className={styles['page-container']} style={{paddingBlockStart: headerHeight}}>
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
  );
};

const Layout: FC<LayoutComponentProps> = ({headerLogo, facet, pages, footer}) => (
  <StylesProvider>
    <LayoutProvider initialPage={pages[0]}>
      <LayoutComponent pages={pages} headerLogo={headerLogo} footer={footer} facet={facet} />
    </LayoutProvider>
  </StylesProvider>
);

export {Layout};
