import {Scalars, ZaakStatusType, ZaakSubstatus} from '@gemeente-denhaag/nl-portal-api';

export type ZaakStatus = {
  __typename?: 'ZaakStatus';
  datumStatusGezet: Scalars['String'];
  statustype: ZaakStatusType;
  substatussen?: Array<ZaakSubstatus>;
};
