import React from 'react';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
import Layout from '../components/Layout';
import SignInForm from '../components/SignInForm';
import ConsoleLogActiveUser from '../components/ConsoleLogActiveUser';

export default () => {
  console.log('userData in localStorage is:');
  console.log( JSON.parse( localStorage.getItem('userData') ) );

  return (
    <Layout>
      <h1>Best Tech Courses</h1>
      <SignInForm />
      <ConsoleLogActiveUser />
    </Layout>
  );
};
