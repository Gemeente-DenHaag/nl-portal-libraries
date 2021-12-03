import * as React from 'react';
import {Heading2} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import styles from '../case/case-page.module.scss';

const AccountPage = () => (
  <section className={styles.account}>
    <header className={styles.case__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.account" />
      </Heading2>
    </header>
  </section>
);

export {AccountPage};
