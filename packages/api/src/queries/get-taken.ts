import {gql} from '@apollo/client';

export const QUERY_GET_TASKS = gql`
  query GetTasks {
    getTasks {
      content  {
        id
        objectId
        formId
        status
        date
      }
    }
  }
`;
