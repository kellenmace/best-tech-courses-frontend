import React from 'react';
import { logUserOut } from '../controllers/auth'
import Layout from '../components/Layout';
import Emoji from '../components/Emoji';

export default () => {
  logUserOut();

  return (
    <Layout>
      <h1>Catch ya later <Emoji symbol="✌🏼" label="victory hand" /></h1>
      <p>You've been logged out.</p>
    </Layout>
  );
};
