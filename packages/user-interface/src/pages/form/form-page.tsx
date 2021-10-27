import * as React from 'react';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useScript} from 'usehooks-ts';

// eslint-disable-next-line
declare const OpenForms: any;

const FormPage = () => {
  const openFormsScript = useScript(
    'https://denhaag.test.open-formulieren.nl/sdk/open-forms-sdk.js'
  );

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const formId = 'bezwaar\u002Dmaken';
      const baseUrl = 'https://denhaag.test.open\u002Dformulieren.nl/api/v1/';
      const targetNode = document.getElementById('openforms\u002Dcontainer');
      const basePath = '/bezwaar\u002Dmaken/';

      const sentryEnv = 'denhaag\u002Dtest';
      const form = new OpenForms.OpenForm(targetNode, {baseUrl, formId, basePath, sentryEnv});
      form.init();
    }
  }, [openFormsScript]);

  return (
    <div>
      <Helmet>
        <link
          href="https://denhaag.test.open-formulieren.nl/sdk/open-forms-sdk.css"
          rel="stylesheet"
        />
      </Helmet>
      <div id="openforms-container" />
    </div>
  );
};
export {FormPage};
