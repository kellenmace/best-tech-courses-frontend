import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from '../controllers/auth';
import Layout from '../components/Layout';
import LogInForm from '../components/LogInForm';

export default () => (
  <Layout>
    <h1>Log in</h1>
    { isUserLoggedIn() ?
      <Fragment>
        <p>You're already logged in.</p>
        <Link to="/log-out">Log out</Link>
      </Fragment>
      :
      <Fragment>
        <LogInForm />
        <span>or <Link to="/sign-up">sign up</Link></span>
        <Link to="/password-reset">Forgot password?</Link>
      </Fragment>
    }
  </Layout>
);
