import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';

const SignUp = ({ loggedIn }) => (
  <Layout>
    <h1>Sign up</h1>
    {loggedIn ? (
      <Fragment>
        <p>You're already logged in.</p>
        <Link to="/log-out">Log out</Link>
      </Fragment>
    ) : (
      <Fragment>
        <SignUpForm />
        <span>
          or <Link to="/log-in">log in</Link>
        </span>
      </Fragment>
    )}
  </Layout>
);

const USER_LOGGED_IN = gql`
  query {
    user @client {
      loggedIn
    }
  }
`;

export default graphql(USER_LOGGED_IN, {
  props: ({ data: { user } }) => user,
})(SignUp);
