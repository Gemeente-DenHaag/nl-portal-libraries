import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC} from 'react';
import {Header} from '../header';

const Layout: FC = () => (
  <StylesProvider>
    <Header />
  </StylesProvider>
);

export {Layout};
