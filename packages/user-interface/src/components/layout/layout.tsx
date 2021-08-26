import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC} from 'react';
import {Header} from '../header';

interface LayoutProps {
  headerLogo: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({headerLogo}) => (
  <StylesProvider>
    <Header logo={headerLogo} />
  </StylesProvider>
);

export {Layout};
