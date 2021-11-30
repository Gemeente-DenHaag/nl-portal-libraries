import * as React from 'react';
import {useContext, useEffect} from 'react';
import {LayoutContext} from '../../contexts';

// eslint-disable-next-line
declare const OpenForms: any;

const FormPage = () => {
  const {enableFullscreenForm, disableFullscreenForm, setCurrentFormTitle, clearCurrentFormTitle} =
    useContext(LayoutContext);

  useEffect(() => {
    enableFullscreenForm();

    return () => {
      disableFullscreenForm();
      clearCurrentFormTitle();
    };
  }, []);

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const formId = 'bezwaar\u002Dmaken';
      const baseUrl = 'https://openformulieren\u002Dcg.test.denhaag.nl/api/v1/';
      const targetNode = document.getElementById('openforms\u002Dcontainer');

      const sentryEnv = 'docker';
      const form = new OpenForms.OpenForm(targetNode, {baseUrl, formId, sentryEnv});

      form.init();

      const checkFormName = () => {
        const formName = form?.formObject?.name;

        if (formName) {
          setCurrentFormTitle(formName);
        } else {
          setTimeout(checkFormName, 250);
        }
      };

      checkFormName();
    }
  }, []);

  return (
    <div>
      <div id="openforms-container" />
    </div>
  );
};
export {FormPage};
