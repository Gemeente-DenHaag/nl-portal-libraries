import * as React from 'react';
import {FC, useContext, useEffect} from 'react';
import {useScript} from 'usehooks-ts';
import {Helmet} from 'react-helmet';
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
  const openFormsScript = useScript(openFormsSdkUrl);
  const query = useQuery();
  const queryFormId = query.get('id');

  useEffect(() => {
    enableFullscreenForm();

    return () => {
      disableFullscreenForm();
      clearCurrentFormTitle();
    };
  }, []);

  useEffect(() => {
    if (typeof OpenForms !== 'undefined') {
      const formId = queryFormId || openFormsFormId;
      const baseUrl = openFormsBaseUrl;
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
        <link href={openFormsStylesUrl} rel="stylesheet" />
      </Helmet>
      <div id="openforms-container" />
    </div>
  );
};
export {FormPage};
