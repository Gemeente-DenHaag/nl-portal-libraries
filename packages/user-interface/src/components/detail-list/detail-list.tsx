import * as React from 'react';
import {FC, Fragment, useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {IconButton, Button} from '@gemeente-denhaag/components-react';
import {EditIcon} from '@gemeente-denhaag/icons';
import Skeleton from 'react-loading-skeleton';
import styles from './detail-list.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

interface DetailListProps {
  details: Array<{headerTranslationKey: string; value: string; showEditButton?: boolean}>;
}

const DetailList: FC<DetailListProps> = ({details}) => {
  const [loading, setLoading] = useState(true);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Fragment>
      {details.map(detail => (
        <div className={styles['detail-list__item']}>
          <span className={styles['detail-list__header']}>
            <b>
              <FormattedMessage id={`account.detail.${detail.headerTranslationKey}`} />
            </b>
          </span>
          <div className={styles['detail-list__value-edit']}>
            <span className={styles['detail-list__value']}>
              {loading ? <Skeleton width={isTablet ? 250 : 150} /> : detail.value}
            </span>
            {isTablet ? (
              <Button icon={<EditIcon />} iconAlign="start">
                <FormattedMessage id="account.edit" />
              </Button>
            ) : (
              <IconButton>
                <EditIcon />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export {DetailList};
