import * as React from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useScript} from 'usehooks-ts';

const ThemeSwitcher = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const themeSwitcherScript = useScript(
    'https://unpkg.com/@nl-design-system-unstable/theme-switcher'
  );

  useEffect(() => {
    if (themeSwitcherScript === 'ready') {
      setScriptLoaded(true);
    }
  }, [themeSwitcherScript]);

  return (
    <Fragment>
      <Helmet>
        <link
          href="https://unpkg.com/@utrecht/component-library-css/dist/index.css"
          rel="stylesheet"
        />
      </Helmet>
      {scriptLoaded && (
        // @ts-ignore
        <nl-theme-switcher // @ts-ignore
          themes={JSON.stringify([
            {
              className: 'denhaag-theme',
              title: 'Gemeente Den Haag',
              href: 'https://unpkg.com/@utrecht/design-tokens/dist/theme/index.css',
            },
            {
              className: 'utrecht-theme',
              title: 'Gemeente Utrecht',
              href: 'https://unpkg.com/@utrecht/design-tokens/dist/theme/index.css',
            },
          ])}
        />
      )}
    </Fragment>
  );
};

export {ThemeSwitcher};