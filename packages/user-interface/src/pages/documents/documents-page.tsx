import * as React from 'react';
import {useGetDocumentenQuery} from '@nl-portal/api';
import {FormattedMessage, useIntl} from 'react-intl';
import {Fragment, useEffect} from 'react';
import {Heading2} from '@gemeente-denhaag/denhaag-component-library';
import {useQuery} from '../../hooks';
import {LinkToParent} from '../../components';
import styles from './documents-page.module.scss';

const DocumentsPage = () => {
  const query = useQuery();
  const intl = useIntl();
  const id = query.get('id');
  const {data, loading, refetch} = useGetDocumentenQuery({
    variables: {id},
  });
  const getCaseUrl = (caseId: string) => `/zaken/zaak?id=${caseId}`;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Fragment>
      <LinkToParent
        text={
          !loading
            ? intl.formatMessage({id: `case.${data?.getZaak.zaaktype.identificatie}.title`})
            : ''
        }
        routePath={getCaseUrl(id || '')}
      />
      <section className={styles.documents}>
        <header className={styles.case__header}>
          <Heading2>
            <FormattedMessage id="pageTitles.documents" />
          </Heading2>
        </header>
      </section>
    </Fragment>
  );
};
export {DocumentsPage};
