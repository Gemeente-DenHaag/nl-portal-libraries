import * as React from 'react';
import {FC, Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import styles from './detail-list.module.scss';

interface DetailListProps {
  details: Array<{headerTranslationKey: string; value: string; showEditButton?: boolean}>;
}

const DetailList: FC<DetailListProps> = ({details}) => (
  <Fragment>
    {details.map(detail => (
      <div className={styles['detail-list__item']}>
        <span>
          <b>
            <FormattedMessage id={`account.detail.${detail.headerTranslationKey}`} />
          </b>
        </span>
      </div>
    ))}
  </Fragment>
);
export {DetailList};
