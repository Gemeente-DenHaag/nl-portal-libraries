import * as React from 'react';
import {Heading2, Card} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import styles from './cases-page.module.scss';
import {mockCases} from './cases-page-mock';

const CasesPage = () => {
  const intl = useIntl();

  return (
    <section className={styles.cases}>
      <header className={styles.cases__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.cases" />
        </Heading2>
      </header>
      <div className={styles.cases__cards}>
        {mockCases.map(mockCase => (
          <div className={styles.cases__card} key={mockCase.id}>
            <Card
              variant="case"
              title={intl.formatMessage({id: `case.${mockCase.type}.title`})}
              date={mockCase.createdOn}
              href="./"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export {CasesPage};
