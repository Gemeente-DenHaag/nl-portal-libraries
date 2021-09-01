import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC, ReactElement, useState} from 'react';
import {Header} from '../header';
import {Menu} from '../menu';
import {LayoutContext} from '../../contexts';

interface LayoutProps {
  headerLogo: ReactElement;
  headerFacet?: ReactElement;
}

const Layout: FC<LayoutProps> = ({headerLogo, headerFacet}) => {
  const [menuOpened, setMenuState] = useState(false);
  const hideMenu = () => setMenuState(false);
  const showMenu = () => setMenuState(true);

  return (
    <StylesProvider>
      <LayoutContext.Provider value={{menuOpened, hideMenu, showMenu}}>
        <Header logo={headerLogo} facet={headerFacet} />
        <Menu />
      </LayoutContext.Provider>
    </StylesProvider>
  );
};

export {Layout};
