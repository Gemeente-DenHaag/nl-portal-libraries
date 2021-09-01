import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement, useState} from 'react';
import {Header} from '../header';
import {Menu} from '../menu';
import {LayoutContext} from '../../contexts';
import {PortalPage} from '../../interfaces';

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
        <Menu items={pages} />
      </LayoutContext.Provider>
    </StylesProvider>
  );
};

export {Layout};
