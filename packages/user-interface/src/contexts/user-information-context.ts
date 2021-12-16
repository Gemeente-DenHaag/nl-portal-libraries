import * as React from 'react';

interface UserInformationContextInterface {
  emailadres: string;
  setEmailadres: (value: string) => void;
  telefoonnummer: string;
  setTelefoonnummer: (value: string) => void;
}

export const UserInformationContext = React.createContext<UserInformationContextInterface>(
  {} as UserInformationContextInterface
);
