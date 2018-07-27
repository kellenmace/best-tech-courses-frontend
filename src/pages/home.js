import React from 'react';
import Layout from '../components/Layout';
import ConsoleLogActiveUser from '../components/ConsoleLogActiveUser';

export default () => {
  console.log('userData in localStorage is:');
  console.log( JSON.parse( localStorage.getItem('userData') ) );

  return (
    <Layout>
      <h1>Best Tech Courses</h1>
      <p>Here is homepage content.</p>
      <ConsoleLogActiveUser />
    </Layout>
  );
};
