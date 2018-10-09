import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { concat, ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';
import { deleteUserData } from './userData';
import { isAuthTokenValid, getToken, isTokenExpired, setAuthToken, getUuid } from './auth';
import {
  getActiveTimersFromLocalStorage,
  getOtherActiveTimers,
  saveTimersToLocalStorage,
} from './timers';
// import { catchErrors } from '../handlers/errorHandlers';

const cache = new InMemoryCache();

const defaultState = {
  user: {
    __typename: 'user',
    loggedIn: isAuthTokenValid(),
  },
  timers: getActiveTimersFromLocalStorage(),
};

// Local state link.
const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateloggedInStatus: (_, { loggedIn }, { cache }) => {
        const query = gql`
          query {
            user @client {
              __typename
              loggedIn
            }
          }
        `;

        const previousState = cache.readQuery({ query });

        const data = {
          ...previousState,
          user: {
            ...previousState.user,
            loggedIn,
          },
        };

        cache.writeData({ query, data });

        if (!loggedIn) {
          deleteUserData();
        }

        return null;
      },
      // Pass in an object with a courseId and a startTimestamp.
      addTimer: (_, timer, { cache }) => {
        const query = gql`
          query {
            timers @client {
              __typename
              courseId
              startTimestamp
            }
          }
        `;

        const previousState = cache.readQuery({ query });

        const data = {
          ...previousState,
          timers: [
            ...getOtherActiveTimers(previousState.timers, timer.courseId),
            {
              __typename: 'timer',
              ...timer,
            },
          ],
        };

        cache.writeData({ query, data });
        saveTimersToLocalStorage(data.timers);

        return null;
      },
    },
  },
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
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          jwtRefreshToken: getToken('refreshToken'),
          clientMutationId: getUuid(),
        },
      },
    }),
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

// Authentication link.
const authLink = setContext(async (_, { headers }) => {
  let token = getToken('authToken');

  if (token && isTokenExpired(token)) {
    token = await refreshAuthToken();
  }

  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// HTTP link.
const httpLink = createHttpLink({
  uri: 'https://besttechcourses.test/graphql/',
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([stateLink, concat(authLink, httpLink)]),
  cache,
});

// TODO:
// Redirect user to Sign In page if token refresh was unsucessful.
// Although, this is only necessary for protected content - we don't
// want to redirect to the Sign In page if someone is only trying to
// access public content. Maybe handle this in the individual pages/components
// instead.
