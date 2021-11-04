import React from 'react';
import {render} from '@testing-library/react';
import {intlWrapper} from '@nl-portal/localization';
import {Page} from './page';
import {LayoutProvider} from '../../providers';

describe('Page component', () => {
  it('should correctly set the document title', () => {
    const testPage = {
      icon: <span />,
      pageComponent: <span />,
      path: '/',
      titleTranslationKey: 'overview',
      showInMenu: true,
      isHome: true,
    };

    render(
      <LayoutProvider initialPage={testPage}>
        <Page page={testPage}>
          <span>test</span>
        </Page>
      </LayoutProvider>,
      {wrapper: intlWrapper}
    );

    expect(document.title).toContain('Overview');
  });
});
