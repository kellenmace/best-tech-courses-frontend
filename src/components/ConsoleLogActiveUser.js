import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ConsoleLogActiveUser = props => {
  console.log('The current user is:')
  console.log( props );
  return (
    <p>Current user data logged to console.</p>
  );
};

const GET_VIEWER = gql`
  query getViewer {
    viewer {
      id
      username
    }
  }
`;

export default graphql(GET_VIEWER, {
  props: ({ data: { viewer } }) => viewer,
})(ConsoleLogActiveUser);
