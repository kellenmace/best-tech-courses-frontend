import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SignInForm from '../components/SignInForm';

export default () => (
  <Layout>
    <h1>Sign in</h1>
    <SignInForm />
    <span>or <Link to="/sign-up">sign up</Link></span>    
  </Layout>
);
