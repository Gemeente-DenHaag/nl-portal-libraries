import React from 'react';
import {render} from '@testing-library/react';
import {intlWrapper} from '@nl-portal/localization';
import {unmountComponentAtNode} from 'react-dom';
import {Page} from './page';
import {LayoutProvider} from '../../providers';

let container!: HTMLElement | undefined;

describe('Page component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    const containerElement = container as HTMLElement;
    unmountComponentAtNode(containerElement);
    containerElement.remove();
    container = undefined;
  });

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
      {wrapper: intlWrapper, container}
    );

    expect(document.title).toContain('Overview');
  });
});
