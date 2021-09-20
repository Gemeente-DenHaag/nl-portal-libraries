import * as React from 'react';
import {
  Heading2,
  Card,
  Tabs,
  Tab,
  TabContext,
  TabPanel,
  Paragraph,
} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useGetZakenQuery} from '@nl-portal/api';
import styles from './cases-page.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

const CasesPage = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const getCaseUrl = (id: string) => `/zaken/zaak?id=${id}`;
  const history = useHistory();
  const {data, loading, refetch} = useGetZakenQuery();

  const getCaseCards = (completed: boolean) =>
    data?.getZaken
      .filter(zaak => {
        const isEndStatus = zaak?.status?.statustype.isEindstatus;
        return completed ? isEndStatus : !isEndStatus;
      })
      .map(zaak => (
        <div className={styles.cases__card} key={zaak.uuid}>
          <Card
            archived={completed}
            variant="case"
            title={zaak.zaaktype.identificatie}
            subTitle={zaak.omschrijving}
            date={new Date(zaak.startdatum)}
            onClick={() => history.push(getCaseUrl(zaak.uuid))}
          />
        </div>
      )) || [];

  const getNoDataMessage = (completed: boolean) => (
    <Paragraph className={styles['cases__no-data-message']}>
      <FormattedMessage id={completed ? 'cases.noClosedCases' : 'cases.noOpenCases'} />
    </Paragraph>
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className={styles.cases}>
      <header className={styles.cases__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.cases" />
        </Heading2>
      </header>
      {!loading && (
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
            <div className={styles.cases__cards}>
              {getCaseCards(false)?.length > 0 ? getCaseCards(false) : getNoDataMessage(false)}
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div className={styles.cases__cards}>
              {getCaseCards(false)?.length > 0 ? getCaseCards(true) : getNoDataMessage(true)}
            </div>
          </TabPanel>
        </TabContext>
      )}
    </section>
  );
};

export {CasesPage};
