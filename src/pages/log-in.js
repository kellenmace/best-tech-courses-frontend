import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LogInForm from '../components/LogInForm';

export default () => (
  <Layout>
    <h1>Log in</h1>
    <LogInForm />
    <span>or <Link to="/sign-up">sign up</Link></span>    
  </Layout>
);
