import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class RefreshAuthToken extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <button>Refresh JWT Now.</button>
  }
}

const RefreshAuthToken = ({refreshAuthTokenMutation}) => {
  console.log( refreshAuthTokenMutation );
  return <p>RefreshAuthToken component is here.</p>;
};

const REFRESH_AUTH_TOKEN = gql`
  mutation RefreshJwtAuthTokenPayload($jwtRefreshToken: String!, $clientMutationId: String!) {
    refreshJwtAuthToken( input: {
      jwtRefreshToken: $jwtRefreshToken,
      clientMutationId: $clientMutationId
    } ) {
      authToken
    }
  }
`;

export default graphql(REFRESH_AUTH_TOKEN, { name: 'refreshAuthTokenMutation' })(RefreshAuthToken);