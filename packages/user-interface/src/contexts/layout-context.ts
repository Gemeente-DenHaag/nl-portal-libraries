import * as React from 'react';
import {PortalPage} from '../interfaces';

interface LayoutContextInterface {
  menuOpened: boolean;
  hideMenu: () => void;
  showMenu: () => void;
  messagesCount: number;
  setMessagesCount: (value: number) => void;
  currentPage: PortalPage;
  setCurrentPage: (value: PortalPage) => void;
  headerHidden: boolean;
  setHeaderHidden: (value: boolean) => void;
}

export const LayoutContext = React.createContext<LayoutContextInterface>(
  {} as LayoutContextInterface
);
