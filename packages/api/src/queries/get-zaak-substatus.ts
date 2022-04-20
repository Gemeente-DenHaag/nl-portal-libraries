import {gql} from '@apollo/client';

export const QUERY_GET_SUBSTATUS_ZAKEN = gql`
  query GetZaakSubstatus($id: UUID!) {
    getZaak(id: $id) {
      uuid
      omschrijving
      identificatie
      zaaktype {
        identificatie
        omschrijving
      }
      startdatum
      status {
        datumStatusGezet
        statustype {
          omschrijving
          isEindstatus
        }
      }
      statusGeschiedenis {
        datumStatusGezet
        statustype {
          omschrijving
          isEindstatus
        }
        substatussen {
          omschrijving
        }
      }
      statussen {
        omschrijving
      }
      documenten {
        bestandsnaam
        bestandsomvang
        creatiedatum
        formaat
        identificatie
        titel
        uuid
      }
    }
  }
`;
