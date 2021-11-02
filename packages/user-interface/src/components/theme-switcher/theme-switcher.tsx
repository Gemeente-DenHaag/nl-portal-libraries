import * as React from 'react';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useScript} from 'usehooks-ts';

const ThemeSwitcher = () => {
  const themeSwitcherScript = useScript(
    'https://unpkg.com/@nl-design-system-unstable/theme-switcher'
  );

  useEffect(() => {
    console.log(themeSwitcherScript);
  }, [themeSwitcherScript]);

  return (
    <div>
      <Helmet>
        <link
          href="https://unpkg.com/@utrecht/component-library-css/dist/index.css"
          rel="stylesheet"
        />
      </Helmet>
    </div>
  );
};

export {ThemeSwitcher};
