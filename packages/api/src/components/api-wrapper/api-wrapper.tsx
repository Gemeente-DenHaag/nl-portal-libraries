import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {KeycloakContext, formatUrlTrailingSlash} from '@gemeente-denhaag/nl-portal-authentication';
import {ApiContext} from '../../contexts';

interface ApiWrapperProps {
  graphqlUri: string;
  restUri: string;
}

const ApiWrapper: FC<ApiWrapperProps> = ({children, graphqlUri, restUri}) => {
  const LOCAL_STORAGE_REST_URI_KEY = 'REST_URI';
  const LOCAL_STORAGE_KEYCLOAK_TOKEN_KEY = 'KEYCLOAK_TOKEN';
  const formattedGraphqlUri = formatUrlTrailingSlash(graphqlUri, false);
  const formattedRestUri = formatUrlTrailingSlash(restUri, false);
  const {keycloakToken} = useContext(KeycloakContext);
  const httpLink = new HttpLink({uri: formattedGraphqlUri});

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
        uri: formattedGraphqlUri,
        cache: new InMemoryCache(),
        link: getLink(keycloakToken),
      })
  );

  useEffect(() => {
    client.setLink(getLink(keycloakToken));
    sessionStorage.setItem(LOCAL_STORAGE_KEYCLOAK_TOKEN_KEY, keycloakToken);
  }, [keycloakToken]);

  sessionStorage.setItem(LOCAL_STORAGE_REST_URI_KEY, formattedRestUri);
  return keycloakToken ? (
    <ApiContext.Provider value={{restUri: formattedRestUri}}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApiContext.Provider>
  ) : null;
};

export {ApiWrapper};
