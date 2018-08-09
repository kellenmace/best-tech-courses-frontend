import React from 'react';
import Layout from '../components/Layout';
import PasswordResetForm from '../components/PasswordResetForm';

export default () => (
  <Layout>
    <h1>Reset password</h1>
    <p>Please enter your email address to recieve a password reset link.</p>
    <PasswordResetForm />
  </Layout>
);
