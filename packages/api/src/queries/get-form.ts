import {gql} from '@apollo/client';

export const QUERY_GET_FORM = gql`
  query GetFormDefinitionByName($name: String!) {
    getFormDefinition(name: $name) {
      formDefinition
    }
  }
`;
