import * as React from 'react';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';
import {FormattedMessage} from 'react-intl';

const UserName = () => {
  const {keycloak} = useKeycloak();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserName = async () => {
      const userProfile = await keycloak.loadUserProfile();
      setUserName(`${userProfile.firstName} ${userProfile.lastName}`);
    };

    if (!userName) {
      getUserName();
    }
  }, []);

  return (
    <Paragraph>
      <FormattedMessage id="header.welcome" values={{userName: userName || '...'}} />
    </Paragraph>
  );
};
export {UserName};
