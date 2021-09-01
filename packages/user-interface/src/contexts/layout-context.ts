import * as React from 'react';

export const LayoutContext = React.createContext({
  menuOpened: false,
  hideMenu: () => {},
  showMenu: () => {},
});
