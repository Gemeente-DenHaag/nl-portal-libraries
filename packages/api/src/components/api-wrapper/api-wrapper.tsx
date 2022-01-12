import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';
import {ApiContext} from '../../contexts';

interface ApiWrapperProps {
  graphqlUri: string;
  restUri: string;
}

const ApiWrapper: FC<ApiWrapperProps> = ({children, graphqlUri, restUri}) => {
  const {keycloakToken} = useContext(KeycloakContext);
  const httpLink = new HttpLink({uri: graphqlUri});

  const getLink = (authToken: string) =>
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      return forward(operation);
    }).concat(httpLink);

  const [client] = useState(
    () =>
      new ApolloClient({
        uri: graphqlUri,
        cache: new InMemoryCache(),
        link: getLink(keycloakToken),
      })
  );

  useEffect(() => {
    client.setLink(getLink(keycloakToken));
  }, [keycloakToken]);

  return keycloakToken ? (
    <ApiContext.Provider value={{restUri}}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApiContext.Provider>
  ) : null;
};

export {ApiWrapper};
