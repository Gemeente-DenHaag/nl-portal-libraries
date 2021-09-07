import * as React from 'react';
import {
  Heading2,
  Card,
  Tabs,
  Tab,
  TabContext,
  TabPanel,
} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import {useState} from 'react';
import styles from './cases-page.module.scss';
import {mockCases} from './cases-page-mock';
import {useMediaQuery} from '../../hooks';

const CasesPage = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const isTablet = useMediaQuery('(min-width: 768px)');

  const getCaseCards = (completed: boolean) =>
    mockCases
      .filter(mockCase => (completed ? mockCase.completed : !mockCase.completed))
      .sort((a, b) => (b.createdOn as any) - (a.createdOn as any))
      .map(mockCase => (
        <div className={styles.cases__card} key={mockCase.id}>
          <Card
            variant="case"
            title={intl.formatMessage({id: `case.${mockCase.type}.title`})}
            date={mockCase.createdOn}
            href="#"
          />
        </div>
      ));

  return (
    <section className={styles.cases}>
      <header className={styles.cases__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.cases" />
        </Heading2>
      </header>
      <TabContext value={tabNumber.toString()}>
        <Tabs
          variant={isTablet ? 'standard' : 'fullWidth'}
          value={tabNumber}
          onChange={(_event: React.ChangeEvent<unknown>, newValue: number) => {
            setTabNumber(newValue);
          }}
        >
          <Tab label={intl.formatMessage({id: 'pageTitles.cases'})} value={0} />
          <Tab label={intl.formatMessage({id: 'titles.completedCases'})} value={1} />
        </Tabs>
        <TabPanel value="0">
          <div className={styles.cases__cards}>{getCaseCards(false)}</div>
        </TabPanel>
        <TabPanel value="1">
          <div className={styles.cases__cards}>{getCaseCards(true)}</div>
        </TabPanel>
      </TabContext>
    </section>
  );
};

export {CasesPage};
