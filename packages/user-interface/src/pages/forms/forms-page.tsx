import * as React from 'react';
import {Heading2} from '@gemeente-denhaag/components-react';
import {FormattedMessage} from 'react-intl';
import styles from './forms-page.module.scss';

const FormsPage = () => (
  <section className={styles.forms}>
    <header className={styles.forms__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.forms" />
      </Heading2>
    </header>
  </section>
);
export {FormsPage};
