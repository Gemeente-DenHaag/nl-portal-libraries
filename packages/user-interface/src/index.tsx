import * as React from 'react';
import {Button, StylesProvider, Card} from '@gemeente-denhaag/denhaag-component-library';
import {useKeycloak} from '@react-keycloak/web';

export const ExampleComponent = () => {
  const {keycloak} = useKeycloak();

  return (
    <StylesProvider>
      <Button onClick={() => keycloak.logout()}>Logout</Button>
      <Card title="Test" date={new Date()} href="test" variant="case" />
    </StylesProvider>
  );
};
