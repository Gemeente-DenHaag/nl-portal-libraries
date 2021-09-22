import * as React from 'react';
import {FC} from 'react';
import {ZaakStatus} from '@nl-portal/api';
import {Step, Timeline} from '@gemeente-denhaag/denhaag-component-library';
import styles from './status-history.module.scss';

interface StatusHistoryProps {
  statuses: Array<ZaakStatus> | undefined;
}

const StatusHistory: FC<StatusHistoryProps> = ({statuses}) => {
  const sortedStatuses = statuses
    ?.map(status => ({
      ...status,
      datumStatusGezet: new Date(status.datumStatusGezet),
    }))
    .sort((a, b) => a.datumStatusGezet.getTime() - b.datumStatusGezet.getTime());
  const amountOfStatuses = sortedStatuses?.length;
  const activeStep = amountOfStatuses ? amountOfStatuses - 1 : 0;

  return (
    <div className={styles['status-history']}>
      <Timeline activeStep={activeStep}>
        {sortedStatuses?.map(status => (
          <Step
            key={status.statustype.omschrijving}
            label={status.statustype.omschrijving}
            completed
          />
        ))}
      </Timeline>
    </div>
  );
};
export {StatusHistory};
