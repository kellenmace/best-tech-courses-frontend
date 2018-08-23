import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getToken, isTokenExpired, setAuthToken, getUuid } from './auth';
//import { catchErrors } from '../handlers/errorHandlers';

const authLink = setContext( async (_, { headers }) => {
  let token = getToken('authToken');

  if ( token && isTokenExpired(token)) {
    token = await refreshAuthToken();
  }

  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const refreshAuthToken = async () => {
  const query = `
    mutation RefreshJWTAuthToken( $input: RefreshJwtAuthTokenInput! ) {
      refreshJwtAuthToken( input:$input ) {
        authToken
      }
    }
  `;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          jwtRefreshToken: getToken('refreshToken'),
          clientMutationId: getUuid()
        }
      }
    })
  };

  try {
    const response = await (await fetch('https://besttechcourses.test/graphql', options)).json();

    if (response.errors && response.errors.length) return null;

    const token = response.data.refreshJwtAuthToken.authToken;

    setAuthToken(token);
    return token;
  } catch (error) {
    return null;
  }
};

const httpLink = createHttpLink({
  uri: 'https://besttechcourses.test/graphql/',
  credentials: 'same-origin'
});

export const apolloClient = new ApolloClient({
  link: concat( authLink, httpLink ),
  cache: new InMemoryCache(),
});

// TODO:
// Redirect user to Sign In page if token refresh was unsucessful.
// Although, this is only necessary for protected content - we don't
// want to redirect to the Sign In page if someone is only trying to
// access public content. Maybe handle this in the individual pages/components
// instead.
//
// import { Redirect } from 'react-router-dom';
// if (error) {
//   return <Redirect to='/sign-in' push />;
// }





/*

// SET AUTH TOKEN TO AN OLD, EXPIRED ONE
// Run this on the command line.

const USERDATA_KEY = 'userData';
const storeUserData = userData => {
  localStorage.setItem(USERDATA_KEY, JSON.stringify(userData));
};
const setAuthToken = newToken => {
  const userData = JSON.parse( localStorage.getItem(USERDATA_KEY) );
  if (!userData || !userData.authToken) return;
  userData.authToken = newToken;
  storeUserData(userData);
};
setAuthToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYmVzdHRlY2hjb3Vyc2VzLnRlc3QiLCJpYXQiOjE1MzIwODM0MjMsIm5iZiI6MTUzMjA4MzQyMywiZXhwIjoxNTMyMDgzNzIzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.K-dta7QqBUsRRyste1O1bhmBlM0dhRu1qRt8MiPRSIs');


*/