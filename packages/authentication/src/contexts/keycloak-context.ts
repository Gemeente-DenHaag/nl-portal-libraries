import * as React from 'react';

interface KeycloakContextInterface {
  keycloakToken: string;
  setKeycloakToken: (token: string) => void;
}

export const KeycloakContext = React.createContext<KeycloakContextInterface>(
  {} as KeycloakContextInterface
);
