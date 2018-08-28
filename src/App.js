import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Routes from './routes';
import { apolloClient } from './controllers/apollo';
// import './App.css';

export default () => (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);
