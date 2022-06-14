import * as React from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
// @ts-ignore
import {Form} from '@formio/react';
import {Helmet} from 'react-helmet';
import './task-page.css';
import _ from 'lodash';
import {
  useGetFormDefinitionByNameQuery,
  useSubmitTaskMutation,
} from '@gemeente-denhaag/nl-portal-api';

const TaskPage = () => {
  const location: any = useLocation();
  const [formName, setFormName] = useState('');
  const [taskId, setTaskId] = useState('');
  const [submission, setSubmission] = useState({
    data: {},
  });
  const [mutateFunction, {loading: loadingSubmitTask, error: errorSubmitTask}] =
    useSubmitTaskMutation();
  const [mutating, setMutationStatus] = useState(false);
  const history = useHistory();

  const {data, loading} = useGetFormDefinitionByNameQuery({
    variables: {name: formName},
  });

  const transformPrefilledDataToFormioSubmission = (submissionData: any) => {
    const keys = Object.keys(submissionData);
    let prefillData: any = {};
    const arrayPrefilledData: any = [];
    keys.forEach(key => {
      prefillData = key
        .split('.')
        .reverse()
        .reduce((a, v, i) => {
          if (i === 0) {
            return {...a, [v]: submissionData[key]};
          }
          return {[v]: a};
        }, {});

      arrayPrefilledData.push(prefillData);
    });
    let payload = {};
    arrayPrefilledData.forEach((item: any) => {
      payload = _.merge(payload, item);
    });

    submission.data = payload;
    setSubmission(submission);
  };

  const getTaskData = () => {
    if (location.state != null && Object.keys(location.state).length > 0) {
      localStorage.setItem(location.state.id, JSON.stringify(location.state));
    } else {
      const storage: any = localStorage.getItem(
        location?.search.substring(location?.search.lastIndexOf('=') + 1)
      );
      const savedStated = storage != null ? JSON.parse(storage) : null;

      if (savedStated?.data != null) {
        location.state = savedStated;
      }
    }
    setFormName(location.state.formId);
    setTaskId(location.state.id);
    transformPrefilledDataToFormioSubmission(location.state.data);
  };

  const navigateToTasksPage = (): void => {
    history.push(`/taken/`);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    if (mutating && !loadingSubmitTask) {
      if (!errorSubmitTask) {
        navigateToTasksPage();
      }
      setMutationStatus(false);
    }
  }, [loadingSubmitTask]);

  const completeTask = (submissionData: any) => {
    setMutationStatus(true);
    mutateFunction({
      variables: {
        id: `${taskId}`,
        submission: submissionData,
      },
    });
  };

  const setFormSubmission = (formioSubmission: any) => {
    if (_.isEqual(formioSubmission.data, submission.data)) {
      // eslint-disable-next-line no-param-reassign
      formioSubmission.data = {...formioSubmission.data, ...submission.data};
      setSubmission(formioSubmission);
    }
  };

  const onFormSubmit = (formioSubmission: any) => {
    if (formioSubmission?.state === 'submitted') {
      completeTask(formioSubmission.data);
    }
  };

  const redrawForm = (form: any) => {
    form.triggerRedraw();
  };

  const removeLocalStorage = () => {
    localStorage.removeItem(formName);
  };

  const getSubmittedMessage = () => (
    <React.Fragment>
      <h2 className="utrecht-heading-2 utrecht-heading-2--distanced pb-1">Taak is afgerond</h2>
      <Link
        onClick={removeLocalStorage}
        className="btn btn-primary"
        role="button"
        rel="noopener noreferrer"
        to="/taken"
      >
        Klik hier om terug te gaan naar je openstaande taken
      </Link>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Helmet>
        <link href="https://cdn.form.io/formiojs/formio.full.min.css" rel="stylesheet" />
      </Helmet>
      {!loading ? (
        <Form
          form={data?.getFormDefinition?.formDefinition}
          formReady={redrawForm}
          submission={submission}
          onChange={setFormSubmission}
          onSubmit={onFormSubmit}
        />
      ) : (
        getSubmittedMessage()
      )}
    </React.Fragment>
  );
};

export {TaskPage};