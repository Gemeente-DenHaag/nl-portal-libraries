import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/api';
import {FC, Fragment, ReactElement, useContext, useEffect} from 'react';
import {Heading2, Heading3, Link, Paragraph} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {
  ArchiveIcon,
  ArrowRightIcon,
  CalendarIcon,
  DocumentIcon,
  MegaphoneIcon,
} from '@gemeente-denhaag/icons';
import {Link as RouterLink} from 'react-router-dom';
import {LocaleContext} from '@nl-portal/localization';
import classNames from 'classnames';
import {useMediaQuery, useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import {DocumentList, MetaIcon, StatusHistory} from '../../components';
import {BREAKPOINTS} from '../../constants';
import {stringToId} from '../../utils';
import {getMockDocuments} from '../../mock';

interface CasePageProps {
  statusHistoryFacet?: ReactElement;
  statusHistoryBackground?: ReactElement;
}

const CasePage: FC<CasePageProps> = ({statusHistoryFacet, statusHistoryBackground}) => {
  const intl = useIntl();
  const query = useQuery();
  const {hrefLang} = useContext(LocaleContext);
  const id = query.get('id');
  const {data, loading, error, refetch} = useGetZaakQuery({
    variables: {id},
  });
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const getDocumentsUrl = (caseId: string) => `/zaken/zaak/documenten?id=${caseId}`;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className={styles.case}>
      {!error ? (
        <Fragment>
          <header className={styles.case__header}>
            <Heading2>
              {loading ? (
                <div
                  aria-busy
                  aria-disabled
                  aria-label={intl.formatMessage({id: 'element.loading'})}
                >
                  <Skeleton width={250} />
                </div>
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
          <div className={styles.case__status}>
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
          </div>
          <div className={styles.case__documents}>
            <div
              className={classNames(styles['case__documents-header'], {
                [styles['case__documents-header--tablet']]: isTablet,
              })}
            >
              <Heading3 className={classNames({[styles['case__sub-header']]: !isTablet})}>
                <FormattedMessage id="pageTitles.documents" />
              </Heading3>
              <div
                className={classNames(styles['case__documents-link'], {
                  [styles['case__documents-link--tablet']]: isTablet,
                })}
              >
                <Link
                  component={RouterLink}
                  to={getDocumentsUrl(id || '')}
                  icon={<ArrowRightIcon />}
                  iconAlign="end"
                  hrefLang={hrefLang}
                >
                  <FormattedMessage id="case.showAllDocuments" />
                </Link>
              </div>
            </div>
            <DocumentList documents={loading ? undefined : getMockDocuments(3)} />
          </div>
        </Fragment>
      ) : (
        <Paragraph>
          <FormattedMessage id="case.fetchError" />
          test
        </Paragraph>
      )}
    </section>
  );
};
export {CasePage};
