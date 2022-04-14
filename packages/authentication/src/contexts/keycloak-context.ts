import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import {DecodedToken} from '../interfaces';

interface KeycloakContextInterface {
  keycloakToken: string;
  setKeycloakToken: (token: string) => void;
  decodedToken: DecodedToken | undefined;
  setDecodedToken: Dispatch<SetStateAction<DecodedToken | undefined>>;
}

export const KeycloakContext = React.createContext<KeycloakContextInterface>(
  {} as KeycloakContextInterface
);
