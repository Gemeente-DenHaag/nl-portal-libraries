import * as React from 'react';
import {FC, Fragment} from 'react';
import {ZaakStatus} from '@nl-portal/api';
import {Paragraph, Step, Timeline} from '@gemeente-denhaag/denhaag-component-library';
import Skeleton from 'react-loading-skeleton';
import styles from './status-history.module.scss';

interface StatusHistoryProps {
  statuses: Array<ZaakStatus> | undefined;
  loading: boolean;
}

const StatusHistory: FC<StatusHistoryProps> = ({statuses, loading}) => {
  const sortedStatuses = statuses
    ?.map(status => ({
      ...status,
      datumStatusGezet: new Date(status.datumStatusGezet),
    }))
    .sort((a, b) => a.datumStatusGezet.getTime() - b.datumStatusGezet.getTime());
  const amountOfStatuses = sortedStatuses?.length;
  const activeStep = amountOfStatuses ? amountOfStatuses - 1 : 0;

  const getSkeletonStep = (key: number) => (
    <div key={key} className={styles['skeleton-step']}>
      <div className={styles['skeleton-step__circle']}>
        <Skeleton circle height={20} width={20} />
      </div>
      <Paragraph>
        <Skeleton width={200} />
      </Paragraph>
    </div>
  );

  return (
    <div className={styles['status-history']}>
      {!loading && sortedStatuses ? (
        <Timeline activeStep={activeStep}>
          {sortedStatuses?.map(status => (
            <Step
              key={status.statustype.omschrijving}
              label={status.statustype.omschrijving}
              completed
            />
          ))}
        </Timeline>
      ) : (
        <Fragment>
          {getSkeletonStep(0)}
          {getSkeletonStep(1)}
        </Fragment>
      )}
    </div>
  );
};
export {StatusHistory};
