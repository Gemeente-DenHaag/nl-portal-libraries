import * as React from 'react';
import {Button, StylesProvider, Card} from '@gemeente-denhaag/denhaag-component-library';

export const ExampleComponent = () => (
  <StylesProvider>
    <Button>Test</Button>
    <Card title="Test" date={new Date()} href="test" variant="case" />
  </StylesProvider>
);
