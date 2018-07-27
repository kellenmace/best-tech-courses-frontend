import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ConsoleLogActiveUser = props => {
  console.log('ConsoleLogActiveUser props (should contain current user):')
  console.log( props );

  return (
    <div>
      <p>ConsoleLogActiveUser data logged to console.</p>
    </div>
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
