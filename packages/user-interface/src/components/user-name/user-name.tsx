import * as React from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {FC, useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {useGetPersoonQuery} from '@gemeente-denhaag/nl-portal-api';
import styles from './user-name.module.scss';

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({mobileMenu}) => {
  const intl = useIntl();
  const {keycloak} = useKeycloak();
  const [userName, setUserName] = useState('');
  const [userNameRetrieved, setUserNameRetrieved] = useState(false);
  const {data, loading, error} = useGetPersoonQuery();

  console.log(data, loading, error);

  const getUserName = async () => {
    try {
      const userProfile = await keycloak.loadUserProfile();

      if (userProfile?.lastName) {
        if (userProfile?.firstName) {
          setUserName(`${userProfile.firstName} ${userProfile.lastName}`);
        } else {
          setUserName(`${userProfile.lastName}`);
        }
      }

      setUserNameRetrieved(true);
    } catch {
      setUserNameRetrieved(true);
    }
  };

  useEffect(() => {
    if (!userName && !userNameRetrieved) {
      getUserName();
    }
  }, []);

  return (
    <div className={classNames({[styles['user-name--mobile-menu']]: mobileMenu})}>
      <Paragraph>
        {intl.formatMessage({id: 'header.welcome'}) + (userName ? ` ${userName}` : '')}
        {!userName && !userNameRetrieved && <Skeleton width={80} />}
      </Paragraph>
    </div>
  );
};
export {UserName};
