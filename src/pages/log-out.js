import React from 'react';
import { logUserOut } from '../controllers/auth'
import Layout from '../components/Layout';

export default () => {
  logUserOut();

  return (
    <Layout>
      <h1>Catch ya later ✌🏼</h1>
      <p>You've been logged out.</p>
    </Layout>
  );
};
