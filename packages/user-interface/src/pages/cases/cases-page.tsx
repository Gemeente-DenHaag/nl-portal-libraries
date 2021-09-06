import * as React from 'react';
import {Heading2, Card} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import styles from './cases-page.module.scss';
import {mockCases} from './cases-page-mock';

const CasesPage = () => (
  <section className={styles.cases}>
    <header className={styles.cases__header}>
      <Heading2>
        <FormattedMessage id="pageTitles.cases" />
      </Heading2>
    </header>
    <div className={styles.cases__cards}>
      {mockCases.map(mockCase => (
        <div className={styles.cases__card}>
          <Card variant="case" title={mockCase.type} date={mockCase.createdOn} href="./" />
        </div>
      ))}
    </div>
  </section>
);
export {CasesPage};
