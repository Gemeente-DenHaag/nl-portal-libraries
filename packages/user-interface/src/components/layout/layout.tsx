import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Header} from '../header';
import {Menu} from '../menu';
import {LayoutContext} from '../../contexts';
import {PortalPage} from '../../interfaces';
import styles from './layout.module.scss';

interface LayoutProps {
  pages: Array<PortalPage>;
  headerLogo: ReactElement;
  headerFacet?: ReactElement;
}

const Layout: FC<LayoutProps> = ({headerLogo, headerFacet, pages}) => {
  const [menuOpened, setMenuState] = useState(false);
  const hideMenu = () => setMenuState(false);
  const showMenu = () => setMenuState(true);

  return (
    <StylesProvider>
      <LayoutContext.Provider value={{menuOpened, hideMenu, showMenu}}>
        <Header logo={headerLogo} facet={headerFacet} />
        <div className={styles['page-container']}>
          <div className={styles['page-container__inner']}>
            <Router>
              <div className={styles['page-container__menu']}>
                <Menu items={pages} />
              </div>
              <div className={styles['page-container__page']}>
                <Switch>
                  {pages.map(page => (
                    <Route exact key={page.path} path={page.path}>
                      {page.pageComponent}
                    </Route>
                  ))}
                  <Route render={() => <Redirect to="/" />} />
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </LayoutContext.Provider>
    </StylesProvider>
  );
};

export {Layout};
