import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {useIntl} from 'react-intl';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import {useGetPersoonLazyQuery, useGetBedrijfLazyQuery} from '@gemeente-denhaag/nl-portal-api';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import styles from './user-name.module.scss';
import {getNameString} from '../../utils';

interface UserNameProps {
  mobileMenu?: boolean;
}

const UserName: FC<UserNameProps> = ({mobileMenu}) => {
  const intl = useIntl();
  const [userName, setUserName] = useState('');
  const [loadPersoon, {loading: persoonLoading, data: persoonData, error: persoonError}] =
    useGetPersoonLazyQuery();
  const [loadBedrijf, {loading: bedrijfLoading, data: bedrijfData, error: bedrijfError}] =
    useGetBedrijfLazyQuery();
  const {keycloakToken} = useContext(KeycloakContext);
  const getDecodedToken = (jwtToken: string) => jwt_decode<{kvk?: string; bsn?: string}>(jwtToken);

  useEffect(() => {
    if (keycloakToken) {
      const decodedToken = getDecodedToken(keycloakToken);
      if (decodedToken.bsn) {
        loadPersoon();
      } else if (decodedToken.kvk) {
        loadBedrijf();
      }
    }
  }, [keycloakToken]);

  useEffect(() => {
    setUserName(getNameString(persoonData?.getPersoon?.naam));
  }, [persoonData]);

  useEffect(() => {
    setUserName(bedrijfData?.getBedrijf?.naam || '');
  }, [bedrijfData]);

  return (
    <div
      className={classNames(styles['user-name'], {[styles['user-name--mobile-menu']]: mobileMenu})}
    >
      <Paragraph className={styles['user-name__paragraph']}>
        {intl.formatMessage({id: 'header.welcome'}) +
          (userName ? ` ${userName}` : `${persoonLoading || bedrijfLoading ? ' ' : ''}`)}
        {!persoonError && !bedrijfError && persoonLoading && bedrijfLoading && !userName && (
          <Skeleton width={80} />
        )}
      </Paragraph>
    </div>
  );
};
export {UserName};
