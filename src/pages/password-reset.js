import React from 'react';
import queryString from 'query-string';
import Layout from '../components/Layout';
import PasswordResetLinkForm from '../components/PasswordResetLinkForm';
import PasswordResetForm from '../components/PasswordResetForm';

export default props => {
  const params = queryString.parse(props.location.search);
  const { key, login } = params;

  return (
    <Layout>
      <h1>Reset password</h1>
      { !key || !login ?
          <PasswordResetLinkForm />
        : 
          <PasswordResetForm key={params.key} login={params.login}/>
      }
    </Layout>
  );
};
