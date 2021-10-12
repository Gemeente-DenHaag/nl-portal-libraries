import * as React from 'react';
import {useGetDocumentenQuery} from '@nl-portal/api';
import {useIntl} from 'react-intl';
import {useEffect} from 'react';
import {useQuery} from '../../hooks';
import {LinkToParent} from '../../components';

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
    <div>
      <LinkToParent
        text={
          !loading
            ? intl.formatMessage({id: `case.${data?.getZaak.zaaktype.identificatie}.title`})
            : ''
        }
        routePath={getCaseUrl(id || '')}
      />
    </div>
  );
};
export {DocumentsPage};
