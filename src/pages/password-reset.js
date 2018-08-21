import React from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import PasswordResetLinkForm from '../components/PasswordResetLinkForm';
import PasswordResetForm from '../components/PasswordResetForm';

export default props => {
  const params = queryString.parse(props.location.search);
  const { key: resetKey, login } = params;

  return (
    <Layout>
      <h1>Reset password</h1>
      { !resetKey || !login ?
          <PasswordResetLinkForm />
        : 
          <PasswordResetForm resetKey={resetKey} login={login}/>
      }
    </Layout>
  );
};
