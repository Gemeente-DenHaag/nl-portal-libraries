import React from 'react';
import {render, screen} from '@testing-library/react';
import {Page} from './page';

it('renders page components', () => {
  render(
    <Page
      page={{
        icon: <span />,
        pageComponent: <span />,
        path: '/',
        titleTranslationKey: 'overview',
        showInMenu: true,
        isHome: true,
      }}
    >
      <span>test</span>
    </Page>
  );
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});
