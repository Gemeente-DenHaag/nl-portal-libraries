import * as React from 'react';

interface UserInformationContextInterface {
  userInformation: {[key: string]: string};
  setUserInformation: (key: string, value: string) => void;
}

export const UserInformationContext = React.createContext<UserInformationContextInterface>(
  {} as UserInformationContextInterface
);
