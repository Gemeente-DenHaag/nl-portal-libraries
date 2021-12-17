import * as React from 'react';
import {FC, useState} from 'react';
import {UserInformationContext} from '../../contexts';

const UserInformationProvider: FC = ({children}) => {
  const [userInformation, modifyUserInformation] = useState({});

  const setUserInformation = (key: string, value: string): void => {
    modifyUserInformation({...userInformation, [key]: value});
  };

  return (
    <UserInformationContext.Provider
      value={{
        userInformation,
        setUserInformation,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export {UserInformationProvider};
