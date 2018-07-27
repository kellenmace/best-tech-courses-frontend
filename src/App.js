import React from 'react';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './controllers/apollo';
// import logo from './logo.svg';
// import './App.css';

export default () => (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);
