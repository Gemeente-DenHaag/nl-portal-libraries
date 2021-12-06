import * as React from 'react';
import {Heading2, Heading3} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import styles from './account-page.module.scss';

const AccountPage = () => (
  <section className={styles.account}>
    <header className={styles.account__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.account" />
      </Heading2>
    </header>
    <div className={styles['account__sub-section']}>
      <Heading3 className={styles['account__sub-header']}>
        <FormattedMessage id="account.contactHeader" />
      </Heading3>
    </div>
    <div className={styles['account__sub-section']}>
      <Heading3 className={styles['account__sub-header']}>
        <FormattedMessage id="account.notificationsHeader" />
      </Heading3>
    </div>
    <div className={styles['account__sub-section']}>
      <Heading3 className={styles['account__sub-header']}>
        <FormattedMessage id="account.detailsHeader" />
      </Heading3>
    </div>
    <div className={styles['account__sub-section']}>
      <Heading3 className={styles['account__sub-header']}>
        <FormattedMessage id="account.addressHeader" />
      </Heading3>
    </div>
  </section>
);

export {AccountPage};
