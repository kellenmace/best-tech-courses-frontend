import React from 'react';
import Routes from './routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import logo from './logo.svg';
// import './App.css';

const client = new ApolloClient({
  uri: "https://besttechcourses.test/graphql"
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
