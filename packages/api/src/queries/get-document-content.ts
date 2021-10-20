import {gql} from '@apollo/client';

export const QUERY_GET_DOCUMENT_CONTENT = gql`
  query GetDocumentContent($id: UUID!) {
    getDocumentContent(id: $id) {
      content
    }
  }
`;
