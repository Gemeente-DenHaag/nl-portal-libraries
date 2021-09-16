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
import {useHistory} from 'react-router-dom';
import {useGetZakenQuery} from '@nl-portal/api';
import styles from './cases-page.module.scss';
import {mockCases} from './cases-page-mock';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

const CasesPage = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const caseUrl = '/zaken/zaak';
  const history = useHistory();
  const {data, error, loading} = useGetZakenQuery();

  const getCaseCards = (completed: boolean) =>
    mockCases
      .filter(mockCase => (completed ? mockCase.completed : !mockCase.completed))
      .sort((a, b) => (b.createdOn as any) - (a.createdOn as any))
      .map(mockCase => (
        <div className={styles.cases__card} key={mockCase.id}>
          <Card
            variant="case"
            title={intl.formatMessage({id: `case.${mockCase.type}.title`})}
            subTitle={mockCase.subtitle}
            date={mockCase.createdOn}
            href={caseUrl}
            onClick={() => history.push(caseUrl)}
          />
        </div>
      ));

  console.log(data, error, loading);

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
