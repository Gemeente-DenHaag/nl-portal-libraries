import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/api';
import {FC, ReactElement, useEffect} from 'react';
import {Heading2, Heading3} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {ArchiveIcon, CalendarIcon, DocumentIcon, MegaphoneIcon} from '@gemeente-denhaag/icons';
import {useMediaQuery, useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import {MetaIcon, StatusHistory} from '../../components';
import {BREAKPOINTS} from '../../constants';
import {stringToId} from '../../utils';

interface CasePageProps {
  statusHistoryFacet?: ReactElement;
  statusHistoryBackground?: ReactElement;
}

const CasePage: FC<CasePageProps> = ({statusHistoryFacet, statusHistoryBackground}) => {
  const intl = useIntl();
  const query = useQuery();
  const {data, loading, refetch} = useGetZaakQuery({
    variables: {id: query.get('id')},
  });
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className={styles.case}>
      <header className={styles.case__header}>
        <Heading2>
          {loading ? (
            <Skeleton width={250} />
          ) : (
            <FormattedMessage id={`case.${data?.getZaak.zaaktype.identificatie}.title`} />
          )}
        </Heading2>
      </header>
      <div className={styles['case__meta-icons']}>
        <MetaIcon
          title={intl.formatMessage({id: 'case.caseNumber'})}
          subtitle={(!loading && data?.getZaak.identificatie) || ''}
          icon={<ArchiveIcon />}
          showRightBorder={isMobile || isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.creationDate'})}
          subtitle={(!loading && data?.getZaak.startdatum) || ''}
          icon={<CalendarIcon />}
          showRightBorder={isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.status'})}
          subtitle={
            (!loading &&
              intl
                .formatMessage({
                  id: `case.${data?.getZaak.zaaktype.identificatie}.status.${stringToId(
                    data?.getZaak.status?.statustype.omschrijving || ''
                  )}`,
                })
                .toLowerCase()) ||
            ''
          }
          icon={<MegaphoneIcon />}
          showRightBorder={isMobile || isDesktop}
        />
        <MetaIcon
          title={intl.formatMessage({id: 'case.documents'})}
          subtitle={(!loading && '0') || ''}
          icon={<DocumentIcon />}
        />
      </div>
      <Heading3 className={styles['case__sub-header']}>
        <FormattedMessage id="case.statusHeader" />
      </Heading3>
      <StatusHistory
        caseId={data?.getZaak.zaaktype.identificatie}
        statuses={data?.getZaak.statusGeschiedenis}
        loading={loading}
        facet={statusHistoryFacet}
        background={statusHistoryBackground}
      />
    </section>
  );
};
export {CasePage};
