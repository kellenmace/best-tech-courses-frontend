import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';

export default () => (
  <Layout>
    <h1>Sign up</h1>
    <SignUpForm />
    <span>or <Link to="/sign-in">sign in</Link></span>    
  </Layout>
);
