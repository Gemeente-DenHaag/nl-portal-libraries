import * as React from 'react';
import {Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {FC, useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import styles from './user-name.module.scss';

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({mobileMenu}) => {
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
    <div className={classNames({[styles['user-name--mobile-menu']]: mobileMenu})}>
      <Paragraph>
        <FormattedMessage id="header.welcome" values={{userName}} />
        {!userName && <Skeleton width={80} />}
      </Paragraph>
    </div>
  );
};
export {UserName};
