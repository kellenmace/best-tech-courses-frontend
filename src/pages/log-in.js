import React from 'react';
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from '../controllers/auth';
import Layout from '../components/Layout';
import LogInForm from '../components/LogInForm';
import Emoji from '../components/Emoji';

export default () => (
  <Layout>
    <h1>Log in</h1>
    { isUserLoggedIn() ?
      <div>
        <h2>Oh, hey! <Emoji symbol="👋🏼" label="waving hand" /></h2>
        <p>You're logged in.</p>
        <Link to="/log-out">Log out</Link>
      </div>
      :
      <div>
        <LogInForm />
        <span>or <Link to="/sign-up">sign up</Link></span>
        <Link to="/password-reset">Forgot password?</Link>
      </div>
    }
  </Layout>
);
