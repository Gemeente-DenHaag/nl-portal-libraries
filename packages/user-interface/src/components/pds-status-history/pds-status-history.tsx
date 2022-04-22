import * as React from 'react';
import {FC, Fragment, ReactElement} from 'react';
import {StatusType, ZaakSubstatus} from '@gemeente-denhaag/nl-portal-api';
import {Paragraph} from '@gemeente-denhaag/components-react';
import Skeleton from 'react-loading-skeleton';
import {useIntl} from 'react-intl';
import {
  StepHeading,
  Step,
  StepList,
  StepMarker,
  SubStepList,
  SubStepMarker,
  SubStep,
  SubStepHeading,
  StepHeader,
  StepSection,
  StepExpandedIcon,
} from '@gemeente-denhaag/process-steps';
import styles from '../status-history/status-history.module.scss';
import {stringToId} from '../../utils';
import {ZaakStatus} from '../status-history/status-history-type';

interface PDSStatusHistoryProps {
  caseId?: string;
  statusHistory?: Array<ZaakStatus>;
  statuses?: Array<StatusType>;
  status?: ZaakStatus;
  loading: boolean;
  facet?: ReactElement;
  background?: ReactElement;
}

const PDSStatusHistory: FC<PDSStatusHistoryProps> = ({
  caseId,
  statusHistory,
  statuses,
  status,
  loading,
}) => {
  const intl = useIntl();
  const currentStatusId = stringToId(status?.statustype?.omschrijving || '');
  const statusIds = statuses?.map(statusType => stringToId(statusType.omschrijving || ''));
  const currentStatusIndex = statusIds?.findIndex(statusId => statusId === currentStatusId);
  const amountOfStatuses = statusHistory?.length;
  let activeStep = 0;

  if (currentStatusIndex && currentStatusIndex !== -1) {
    activeStep = currentStatusIndex;
  } else if (amountOfStatuses) {
    activeStep = amountOfStatuses - 1;
  }

  const getSkeletonStep = (key: number) => (
    <div
      key={key}
      className={styles['skeleton-step']}
      aria-busy
      aria-disabled
      aria-label={intl.formatMessage({id: 'element.loading'})}
    >
      <div className={styles['skeleton-step__circle']}>
        <Skeleton circle height={20} width={20} />
      </div>
      <Paragraph>
        <Skeleton width={200} />
      </Paragraph>
    </div>
  );

  const getSubstatusComponent = (substatusses?: Array<ZaakSubstatus>) => (
    <SubStepList>
      {substatusses?.map(value => (
        <SubStep>
          <SubStepMarker />
          <SubStepHeading>{value.omschrijving}</SubStepHeading>
        </SubStep>
      ))}
    </SubStepList>
  );

  return (
    <div style={{marginBlock: '16px'}}>
      {!loading && statuses ? (
        <StepList>
          {statuses.map((statusType, index) => {
            const checked = index < activeStep;
            const current = index === activeStep;
            const substatusses: Array<ZaakSubstatus> | undefined = statusHistory?.find(
              s => s.statustype.omschrijving === statusType.omschrijving
            )?.substatussen;
            return (
              <Step checked={checked} current={current} expanded={current}>
                <StepSection>
                  <StepHeader>
                    <StepMarker>{index + 1}</StepMarker>
                    <StepHeading>
                      {intl.formatMessage({
                        id: `case.${caseId}.status.${stringToId(`${statusType.omschrijving}`)}`,
                      })}
                    </StepHeading>
                    {substatusses && <StepExpandedIcon />}
                  </StepHeader>
                </StepSection>
                {substatusses && getSubstatusComponent(substatusses)}
              </Step>
            );
          })}
        </StepList>
      ) : (
        <Fragment>
          {getSkeletonStep(0)}
          {getSkeletonStep(1)}
        </Fragment>
      )}
    </div>
  );
};
export {PDSStatusHistory};
