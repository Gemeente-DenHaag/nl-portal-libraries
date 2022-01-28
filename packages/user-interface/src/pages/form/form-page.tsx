import * as React from 'react';
import {FC, useContext, useEffect} from 'react';
import {useScript} from 'usehooks-ts';
import {Helmet} from 'react-helmet';
import {formatUrlTrailingSlash} from '@gemeente-denhaag/nl-portal-authentication';
import {LayoutContext} from '../../contexts';
import {useQuery} from '../../hooks';

// eslint-disable-next-line
declare const OpenForms: any;

interface FormPageProps {
  openFormsBaseUrl: string;
  openFormsEntryEnv: string;
  openFormsSdkUrl: string;
  openFormsStylesUrl: string;
}

const FormPage: FC<FormPageProps> = ({
  openFormsBaseUrl,
  openFormsEntryEnv,
  openFormsSdkUrl,
  openFormsStylesUrl,
}) => {
  const {enableFullscreenForm, disableFullscreenForm, setCurrentFormTitle, clearCurrentFormTitle} =
    useContext(LayoutContext);
  const openFormsScript = useScript(formatUrlTrailingSlash(openFormsSdkUrl, false));
  const query = useQuery();
  const queryFormId = query.get('id');
  const FORM_ID_LOCAL_STORAGE_KEY = 'FORM_ID';

  useEffect(() => {
    enableFullscreenForm();

    if (queryFormId) {
      localStorage.setItem(FORM_ID_LOCAL_STORAGE_KEY, queryFormId);
    }

    return () => {
      disableFullscreenForm();
      clearCurrentFormTitle();
    };
  }, []);

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const localStorageFormId = localStorage.getItem(FORM_ID_LOCAL_STORAGE_KEY);
      const formId = queryFormId || localStorageFormId || '';
      const baseUrl = formatUrlTrailingSlash(openFormsBaseUrl, true);
      const targetNode = document.getElementById('openforms\u002Dcontainer');

      const sentryEnv = openFormsEntryEnv;
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
  }, [openFormsScript]);

  return (
    <div>
      <Helmet>
        <link href={formatUrlTrailingSlash(openFormsStylesUrl, false)} rel="stylesheet" />
      </Helmet>
      <div id="openforms-container" />
    </div>
  );
};
export {FormPage};
