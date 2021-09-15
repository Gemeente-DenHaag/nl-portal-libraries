import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {useKeycloak} from '@react-keycloak/web';
import {FC} from 'react';
import styles from './logout.module.scss';

interface LogoutProps {
  mobileMenu?: boolean;
}

const Logout: FC<LogoutProps> = ({mobileMenu}) => {
  const {keycloak} = useKeycloak();

  return (
    <Button
      onClick={() => keycloak.logout()}
      className={mobileMenu ? styles['denhaag-button--mobile-menu'] : ''}
    >
      <FormattedMessage id="header.logout" />
    </Button>
  );
};

export {Logout};
