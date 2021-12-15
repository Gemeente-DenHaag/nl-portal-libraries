import * as React from 'react';
import {Button, Heading2, TextField} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useContext, useEffect, useState} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';
import {useHistory} from 'react-router-dom';
import {useUpdateBurgerProfielMutation} from '@gemeente-denhaag/nl-portal-api';
import {useQuery} from '../../hooks';
import styles from './edit-account-page.module.scss';

const EditAccountPage = () => {
  const {currentLocale} = useContext(LocaleContext);
  const query = useQuery();
  const intl = useIntl();
  const history = useHistory();
  const [mutateFunction, {loading, error}] = useUpdateBurgerProfielMutation();

  const prop = query.get('prop');
  const propTranslation = intl.formatMessage({id: `account.detail.${prop}`});
  const errorTranslation = intl.formatMessage({id: `account.detail.${prop}.error`});

  const defaultValueKey = `account.${prop}.default`;
  const defaultValue = sessionStorage.getItem(defaultValueKey);

  const regexKey = `account.${prop}.regex`;
  const regexValue = sessionStorage.getItem(regexKey);
  const regexObject = regexValue && JSON.parse(regexValue);
  const regex: RegExp = regexObject && new RegExp(regexObject.source, regexObject.flags);

  const [valid, setValidity] = useState(regex ? regex.test(defaultValue || '') : true);
  const [value, setValue] = useState(defaultValue || '');
  const [mutating, setMutationStatus] = useState(false);

  const navigateToAccountPage = (): void => {
    history.push(`/account/`);
  };

  const onSave = (): void => {
    setMutationStatus(true);
    mutateFunction({variables: {klant: {[`${prop}`]: `${value}`}}});
  };

  useEffect(() => {
    if (regex) {
      setValidity(regex.test(value));
    }
  }, [value]);

  useEffect(() => {
    if (mutating && !loading) {
      if (!error) {
        navigateToAccountPage();
      }
      setMutationStatus(false);
    }
  }, [loading]);

  return (
    <section className={styles['edit-account']}>
      <header className={styles['edit-account__header']}>
        <Heading2>
          {currentLocale.toLowerCase().includes('nl')
            ? `${propTranslation} ${intl.formatMessage({id: 'account.edit'}).toLowerCase()}`
            : `${intl.formatMessage({id: 'account.edit'})} ${propTranslation.toLowerCase()}`}
        </Heading2>
      </header>
      <div className={styles['edit-account__text-field-container']}>
        <TextField
          onChange={e => setValue(e.target.value)}
          label={propTranslation}
          className={styles['edit-account__text-field']}
          defaultValue={defaultValue || ''}
          error={!valid}
          helperText={!valid ? errorTranslation : ''}
          disabled={loading}
        />
      </div>
      <div className={styles['edit-account__buttons']}>
        <Button
          className={styles['edit-account__button']}
          onClick={onSave}
          disabled={!valid || loading}
        >
          <FormattedMessage id="account.save" />
        </Button>
        <Button
          variant="secondary-action"
          className={styles['edit-account__button']}
          onClick={navigateToAccountPage}
          disabled={loading}
        >
          <FormattedMessage id="account.cancel" />
        </Button>
      </div>
    </section>
  );
};

export {EditAccountPage};
