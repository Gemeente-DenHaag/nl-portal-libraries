import * as React from 'react';
import {Heading2} from '@gemeente-denhaag/components-react';
import {useIntl} from 'react-intl';
import {useContext} from 'react';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';
import {useQuery} from '../../hooks';
import styles from './edit-account-page.module.scss';

const EditAccountPage = () => {
  const query = useQuery();
  const intl = useIntl();
  const prop = query.get('prop');
  const {currentLocale} = useContext(LocaleContext);
  const propTranslation = intl.formatMessage({id: `account.detail.${prop}`});

  return (
    <section className={styles['edit-account']}>
      <header className={styles['edit-account__header']}>
        <Heading2>
          {currentLocale.toLowerCase().includes('nl')
            ? `${propTranslation} ${intl.formatMessage({id: 'account.edit'}).toLowerCase()}`
            : `${intl.formatMessage({id: 'account.edit'})} ${propTranslation.toLowerCase()}`}
        </Heading2>
      </header>
    </section>
  );
};

export {EditAccountPage};
