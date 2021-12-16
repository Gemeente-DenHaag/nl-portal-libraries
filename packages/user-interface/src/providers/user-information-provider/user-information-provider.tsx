import * as React from 'react';
import {FC, useState} from 'react';
import {UserInformationContext} from '../../contexts';

const UserInformationProvider: FC = ({children}) => {
  const [emailadres, setEmailadres] = useState('');
  const [telefoonnummer, setTelefoonnummer] = useState('');

  return (
    <UserInformationContext.Provider
      value={{
        emailadres,
        setEmailadres,
        telefoonnummer,
        setTelefoonnummer,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export {UserInformationProvider};
