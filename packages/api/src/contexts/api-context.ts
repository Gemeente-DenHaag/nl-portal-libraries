import * as React from 'react';

interface ApiContextInterface {
  restUri: string;
}

export const ApiContext = React.createContext<ApiContextInterface>({} as ApiContextInterface);
