import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from '../controllers/auth';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';

export default () => (
  <Layout>
    <h1>Sign up</h1>
    { isUserLoggedIn() ?
      <Fragment>
        <p>You're already logged in.</p>
        <Link to="/log-out">Log out</Link>
      </Fragment>
      :
      <Fragment>
        <SignUpForm />
        <span>or <Link to="/log-in">log in</Link></span>
      </Fragment>
    }
  </Layout>
);
