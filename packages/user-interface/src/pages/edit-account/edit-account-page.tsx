import * as React from 'react';
import {Button, Heading2, TextField} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';
import {useHistory} from 'react-router-dom';
import {useQuery} from '../../hooks';
import styles from './edit-account-page.module.scss';

const EditAccountPage = () => {
  const query = useQuery();
  const intl = useIntl();
  const history = useHistory();
  const prop = query.get('prop');
  const {currentLocale} = useContext(LocaleContext);
  const propTranslation = intl.formatMessage({id: `account.detail.${prop}`});

  const navigateToAccountPage = () => {
    history.push(`/account/`);
  };

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
        <TextField label={propTranslation} className={styles['edit-account__text-field']} />
      </div>
      <div className={styles['edit-account__buttons']}>
        <Button className={styles['edit-account__button']} onClick={navigateToAccountPage}>
          <FormattedMessage id="account.save" />
        </Button>
        <Button
          variant="secondary-action"
          className={styles['edit-account__button']}
          onClick={navigateToAccountPage}
        >
          <FormattedMessage id="account.cancel" />
        </Button>
      </div>
    </section>
  );
};

export {EditAccountPage};
