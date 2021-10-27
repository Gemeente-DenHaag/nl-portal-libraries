import * as React from 'react';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {useScript} from 'usehooks-ts';

// eslint-disable-next-line
declare const OpenForms: any;

const FormPage = () => {
  const openFormsScript = useScript(
    'https://openformulieren-cg.test.denhaag.nl/static/sdk/open-forms-sdk.js'
  );

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const formId = 'bezwaar\u002Dmaken';
      const baseUrl = 'https://openformulieren\u002Dcg.test.denhaag.nl/api/v1/';
      const targetNode = document.getElementById('openforms\u002Dcontainer');
      const basePath = '/bezwaar\u002Dmaken/';

      const sentryEnv = 'docker';
      const form = new OpenForms.OpenForm(targetNode, {baseUrl, formId, basePath, sentryEnv});
      form.init();
    }
  }, [openFormsScript]);

  return (
    <div>
      <Helmet>
        <link
          href="https://openformulieren-cg.test.denhaag.nl/static/sdk/open-forms-sdk.css"
          rel="stylesheet"
        />
      </Helmet>
      <div id="openforms-container" />
    </div>
  );
};
export {FormPage};
