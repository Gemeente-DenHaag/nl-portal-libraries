import {gql} from '@apollo/client';

export const QUERY_GET_ZAKEN = gql`
  query GetZaak {
    getZaak(id: "{{zaakId}}") {
      uuid
      omschrijving
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
      }
    }
  }
`;
