import * as React from 'react';
import {Fragment, useEffect} from 'react';
import {Card, Heading2, Paragraph} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {useHistory} from 'react-router-dom';
import {useGetTasksQuery} from '@gemeente-denhaag/nl-portal-api';
import styles from './tasks-page.module.scss';

const TasksPage = () => {
  const intl = useIntl();
  intl.formatMessage({id: 'formTranslation.next'});
  const getTaskUrl = (id: string) => `/tasks/task?id=${id}`;
  // const location = useLocation();
  const history = useHistory();
  // const query = useQuery();
  const {data, loading, error, refetch} = useGetTasksQuery();

  const getTaskCards = () =>
    data?.getTasks?.results?.map(task => (
      <div className={styles.tasks__card} key={task.id}>
        <Card
          variant="basic"
          title={intl.formatMessage({id: task.formId})}
          date={new Date(task.date)}
          onClick={() => history.push(getTaskUrl(task.id))}
        />
      </div>
    )) || [];

  const getNoDataMessage = () => (
    <Paragraph>
      <FormattedMessage id="tasks.noOpenTasks" />
    </Paragraph>
  );

  const getErrorMessage = () => (
    <Paragraph>
      <FormattedMessage id="tasks.fetchError" />
    </Paragraph>
  );

  const getContent = () => {
    const cards = getTaskCards();
    if (error) {
      return getErrorMessage();
    }
    return cards.length > 0 ? cards : getNoDataMessage();
  };

  const getSkeleton = () => {
    const getSkeletonCard = (key: number) => (
      <div
        className={styles.tasks__card}
        key={key}
        aria-busy
        aria-disabled
        aria-label={intl.formatMessage({id: 'element.loading'})}
      >
        <Skeleton height={220} />
      </div>
    );

    return (
      <Fragment>
        {getSkeletonCard(0)}
        {getSkeletonCard(1)}
      </Fragment>
    );
  };

  useEffect(() => {
    console.log('Load graph page');
    // refetch();
  });

  // useEffect(() => {
  //   if (queryTab !== tabNumber) {
  //     history.push(`${location.pathname}?${TAB_QUERY_PARAM}=${tabNumber}`);
  //   }
  // }, [tabNumber]);

  // useEffect(() => {
  //   if (queryTab && queryTab !== tabNumber) {
  //     setTabNumber(queryTab);
  //   }
  // }, [queryTab]);

  return (
    <React.Fragment>
      <section className={styles.tasks}>
        <header className={styles.tasks__header}>
          <Heading2>
            <FormattedMessage id="pageTitles.tasks" />
          </Heading2>
        </header>
        {/* <TabContext value={tabNumber.toString()}> */}
        {/*  <Tabs */}
        {/*    variant={isTablet ? 'standard' : 'fullWidth'} */}
        {/*    value={tabNumber} */}
        {/*    onChange={(_event: React.ChangeEvent<unknown>, newValue: number) => { */}
        {/*      setTabNumber(newValue); */}
        {/*    }} */}
        {/*  > */}
        {/*    <Tab label={intl.formatMessage({id: 'titles.openTasks'})} value={0} /> */}
        {/*  </Tabs> */}
        {/*  <TabPanel value="0"> */}
        <div className={styles.tasks__cards}>{loading ? getSkeleton() : getContent()}</div>
        {/*  </TabPanel> */}
        {/* </TabContext> */}
      </section>
    </React.Fragment>
  );
};

export {TasksPage};
