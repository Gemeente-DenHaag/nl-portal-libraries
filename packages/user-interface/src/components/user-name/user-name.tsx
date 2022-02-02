import * as React from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {FC, useContext, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {useGetPersoonLazyQuery} from '@gemeente-denhaag/nl-portal-api';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';
import styles from './user-name.module.scss';

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
    if (data) {
      const firstNames = data?.getPersoon?.naam.voornamen;
      const lastName = data?.getPersoon?.naam.geslachtsnaam;

      if (firstNames && lastName) {
        setUserName(`${firstNames} ${lastName}`);
      } else if (lastName) {
        setUserName(lastName);
      } else if (firstNames) {
        setUserName(firstNames);
      }
    }
  }, [data]);

  return (
    <div className={classNames({[styles['user-name--mobile-menu']]: mobileMenu})}>
      <Paragraph>
        {intl.formatMessage({id: 'header.welcome'}) +
          (userName ? ` ${userName}` : `${loading ? ' ' : ''}`)}
        {!error && loading && !userName && <Skeleton width={80} />}
      </Paragraph>
    </div>
  );
};
export {UserName};
