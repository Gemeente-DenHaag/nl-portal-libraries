import * as React from 'react';

interface LayoutContextInterface {
  menuOpened: boolean;
  hideMenu: () => void;
  showMenu: () => void;
  messagesCount: number;
  setMessagesCount: (value: number) => void;
}

export const LayoutContext = React.createContext<LayoutContextInterface>(
  {} as LayoutContextInterface
);
