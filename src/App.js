import React from 'react';
import Routes from './routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { getToken, isTokenExpired } from './controllers/auth';
// import logo from './logo.svg';
// import './App.css';



// TODO:
// Steps to follow: https://github.com/wp-graphql/wp-graphql-jwt-authentication/issues/6
// See auth & withData files in reactpress-graphql

const client = new ApolloClient({
  uri: "https://besttechcourses.test/graphql/?XDEBUG_SESSION_START=10705",
  request: async operation => {
    const token = getToken('authToken');
    console.log('authToken fetched from localStorage:');
    console.log(token);
    if (token) {
      console.log('Token is valid (not expired).')
    } else {
      console.log('Token is either nonexistent or expired.');
    }

    if (!token) return;

    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
});

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);


// TODO: Mimic this with the header, footer & nav in a Layout component.
// export default class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
