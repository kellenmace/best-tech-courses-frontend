import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import Emoji from '../components/Emoji';

const LogOut = props => {
  const { loggedIn, updateloggedInStatus } = props;

  if (loggedIn) {
    updateloggedInStatus({
      variables: {
        loggedIn: false,
      },
    });
  }

  return (
    <Layout>
      <h1>
        Catch ya later <Emoji symbol="✌🏼" label="peace sign" />
      </h1>
      <p>You've been logged out.</p>
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

const UPDATE_LOGGED_IN_STATUS = gql`
  mutation updateloggedInStatus($loggedIn: Bool!) {
    updateloggedInStatus(loggedIn: $loggedIn) @client {
      loggedIn
    }
  }
`;

export default compose(
  graphql(USER_LOGGED_IN, {
    props: ({ data: { user } }) => user,
  }),
  graphql(UPDATE_LOGGED_IN_STATUS, { name: 'updateloggedInStatus' })
)(LogOut);
