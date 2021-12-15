import * as React from 'react';
import {FC, Fragment, useContext} from 'react';
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
  details: Array<{
    translationKey: string;
    loading?: boolean;
    value?: string | undefined | null | false;
    showEditButton?: boolean;
    regex?: RegExp;
  }>;
}

const DetailList: FC<DetailListProps> = ({details}) => {
  const {hrefLang} = useContext(LocaleContext);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const EMPTY_VALUE = '-';

  const setSessionStorageForProp = (prop: string, value: any, regex?: RegExp) => {
    const defaultValueKey = `account.${prop}.default`;
    const regexKey = `account.${prop}.regex`;

    sessionStorage.removeItem(defaultValueKey);
    sessionStorage.removeItem(regexKey);

    if (value) {
      sessionStorage.setItem(defaultValueKey, value);
    }

    if (regex) {
      const regexObject = {flags: regex.flags, source: regex.source};
      sessionStorage.setItem(regexKey, JSON.stringify(regexObject));
    }
  };

  return (
    <Fragment>
      {details.map(detail => (
        <div className={styles['detail-list__item']} key={detail.translationKey}>
          <span className={styles['detail-list__header']}>
            <b>
              <FormattedMessage id={`account.detail.${detail.translationKey}`} />
            </b>
          </span>
          <div className={styles['detail-list__value-edit']}>
            <span className={styles['detail-list__value']}>
              {detail.loading ? (
                <Skeleton width={isDesktop ? 200 : 150} />
              ) : (
                detail.value || EMPTY_VALUE
              )}
            </span>
            {detail.showEditButton && (
              <Link
                onClick={() =>
                  setSessionStorageForProp(detail.translationKey, detail.value, detail.regex)
                }
                component={RouterLink}
                to={`/account/aanpassen?prop=${detail.translationKey}`}
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
