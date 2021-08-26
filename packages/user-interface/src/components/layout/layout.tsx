import * as React from 'react';
import {StylesProvider} from '@gemeente-denhaag/denhaag-component-library';
import {FC} from 'react';
import {Header} from '../header';

interface LayoutProps {
  headerLogo: React.ReactNode;
  headerFacet?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({headerLogo, headerFacet}) => (
  <StylesProvider>
    <Header logo={headerLogo} facet={headerFacet} />
  </StylesProvider>
);

export {Layout};
