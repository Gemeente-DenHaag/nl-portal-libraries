import {gql} from '@apollo/client';

export const QUERY_GET_TASKS = gql`
  query GetTasks {
    getTasks {
      results {
        date
        formId
        id
        objectId
        status
      }
    }
  }
`;
