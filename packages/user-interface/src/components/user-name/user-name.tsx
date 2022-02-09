import * as React from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {FC, useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {useGetPersoonLazyQuery} from '@gemeente-denhaag/nl-portal-api';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';
import styles from './user-name.module.scss';
import {getNameString} from '../../utils/person-data';

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({mobileMenu}) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');
  const [loadPerson, {loading, data, error}] = useGetPersoonLazyQuery();
  const {keycloakToken} = useContext(KeycloakContext);

  useEffect(() => {
    if (keycloakToken) {
      loadPerson();
    }
  }, [keycloakToken]);

  useEffect(() => {
    setUserName(getNameString(data?.getPersoon?.naam));
  }, [data]);

  return (
    <div
      className={classNames(styles['user-name'], {[styles['user-name--mobile-menu']]: mobileMenu})}
    >
      <Paragraph className={styles['user-name__paragraph']}>
        {intl.formatMessage({id: 'header.welcome'}) +
          (userName ? ` ${userName}` : `${loading ? ' ' : ''}`)}
        {!error && loading && !userName && <Skeleton width={80} />}
      </Paragraph>
    </div>
  );
};
export {UserName};
