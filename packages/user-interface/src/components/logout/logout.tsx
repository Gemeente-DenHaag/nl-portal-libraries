import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {useKeycloak} from '@react-keycloak/web';

const Logout = () => {
  const {keycloak} = useKeycloak();

  return (
    <Button onClick={() => keycloak.logout()}>
      <FormattedMessage id="app.logout" />
    </Button>
  );
};

export {Logout};
