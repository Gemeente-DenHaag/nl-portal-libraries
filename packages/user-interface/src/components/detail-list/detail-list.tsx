import * as React from 'react';
import {FC, Fragment, useContext, useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from '@gemeente-denhaag/components-react';
import {EditIcon} from '@gemeente-denhaag/icons';
import Skeleton from 'react-loading-skeleton';
import {LocaleContext} from '@gemeente-denhaag/nl-portal-localization';
import {Link as RouterLink} from 'react-router-dom';
import styles from './detail-list.module.scss';
import {useMediaQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

interface DetailListProps {
  details: Array<{headerTranslationKey: string; value: string; showEditButton?: boolean}>;
}

const DetailList: FC<DetailListProps> = ({details}) => {
  const {hrefLang} = useContext(LocaleContext);
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Fragment>
      {details.map(detail => (
        <div className={styles['detail-list__item']} key={detail.headerTranslationKey}>
          <span className={styles['detail-list__header']}>
            <b>
              <FormattedMessage id={`account.detail.${detail.headerTranslationKey}`} />
            </b>
          </span>
          <div className={styles['detail-list__value-edit']}>
            <span className={styles['detail-list__value']}>
              {loading ? <Skeleton width={isDesktop ? 200 : 150} /> : detail.value}
            </span>
            {detail.showEditButton && (
              <Link
                component={RouterLink}
                to={`/account/aanpassen?prop=${detail.headerTranslationKey}`}
                hrefLang={hrefLang}
                icon={<EditIcon />}
                iconAlign="start"
              >
                {isDesktop && <FormattedMessage id="account.edit" />}
              </Link>
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export {DetailList};
