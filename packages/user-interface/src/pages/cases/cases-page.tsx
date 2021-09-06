import * as React from 'react';
import {Heading2, Card} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import styles from './cases-page.module.scss';

const CasesPage = () => (
  <section className={styles.cases}>
    <header className={styles.cases__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.cases" />
      </Heading2>
    </header>
    <Card variant="case" title="test" date={new Date()} href="./" />
  </section>
);
export {CasesPage};
