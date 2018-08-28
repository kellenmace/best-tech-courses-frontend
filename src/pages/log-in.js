import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import LogInForm from '../components/LogInForm';
import Emoji from '../components/Emoji';

const LogIn = props => {
  const { loggedIn } = props;

  return (
    <Layout>
      <h1>Log in</h1>
      {loggedIn ? (
        <div>
          <h2>
            Oh, hey! <Emoji symbol="👋🏼" label="waving hand" />
          </h2>
          <p>You're logged in.</p>
          <Link to="/log-out">Log out</Link>
        </div>
      ) : (
        <div>
          <LogInForm />
          <span>
            or <Link to="/sign-up">sign up</Link>
          </span>
          <Link to="/password-reset">Forgot password?</Link>
        </div>
      )}
    </Layout>
  );
};

const USER_LOGGED_IN = gql`
  query {
    user @client {
      loggedIn
    }
  }
`;

export default graphql(USER_LOGGED_IN, {
  props: ({ data: { user } }) => user,
})(LogIn);
