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
  openFormsFormId: string;
  openFormsEntryEnv: string;
  openFormsSdkUrl: string;
  openFormsStylesUrl: string;
}

const FormPage: FC<FormPageProps> = ({
  openFormsBaseUrl,
  openFormsFormId,
  openFormsEntryEnv,
  openFormsSdkUrl,
  openFormsStylesUrl,
}) => {
  const {enableFullscreenForm, disableFullscreenForm, setCurrentFormTitle, clearCurrentFormTitle} =
    useContext(LayoutContext);
  const openFormsScript = useScript(formatUrlTrailingSlash(openFormsSdkUrl, false));
  const query = useQuery();
  const queryFormId = query.get('id');
  const FORM_ID_SESSION_STORAGE_KEY = 'FORM_ID';

  useEffect(() => {
    localStorage.removeItem(FORM_ID_SESSION_STORAGE_KEY);
    enableFullscreenForm();

    if (queryFormId) {
      localStorage.setItem(FORM_ID_SESSION_STORAGE_KEY, queryFormId);
    }

    return () => {
      disableFullscreenForm();
      clearCurrentFormTitle();
      localStorage.removeItem(FORM_ID_SESSION_STORAGE_KEY);
    };
  }, []);

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const sessionStorageFormId = localStorage.getItem(FORM_ID_SESSION_STORAGE_KEY);
      const formId = queryFormId || sessionStorageFormId || openFormsFormId;
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
