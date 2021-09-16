import * as React from 'react';
import {FC, useState} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

interface ApolloWrapperProps {
  uri: string;
}

const ApolloWrapper: FC<ApolloWrapperProps> = ({children, uri}) => {
  const [client] = useState(
    () =>
      new ApolloClient({
        uri,
        cache: new InMemoryCache(),
      })
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export {ApolloWrapper};
