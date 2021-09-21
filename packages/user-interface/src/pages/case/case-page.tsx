import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/api';
import {useEffect} from 'react';
import {Heading2} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {useQuery} from '../../hooks';
import styles from './case-page.module.scss';

const CasePage = () => {
  const query = useQuery();
  const {data, loading, refetch} = useGetZaakQuery({
    variables: {id: query.get('id')},
  });

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
    </section>
  );
};
export {CasePage};
