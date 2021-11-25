import * as React from 'react';
import {FC, useContext, useEffect, useState} from 'react';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {KeycloakContext} from '@gemeente-denhaag/nl-portal-authentication';

interface ApolloWrapperProps {
  uri: string;
}

const ApolloWrapper: FC<ApolloWrapperProps> = ({children, uri}) => {
  const {keycloakToken} = useContext(KeycloakContext);
  const httpLink = new HttpLink({uri});

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
        uri,
        cache: new InMemoryCache(),
        link: getLink(keycloakToken),
      })
  );

  useEffect(() => {
    client.setLink(getLink(keycloakToken));
  }, [keycloakToken]);

  return keycloakToken ? <ApolloProvider client={client}>{children}</ApolloProvider> : null;
};

export {ApolloWrapper};
