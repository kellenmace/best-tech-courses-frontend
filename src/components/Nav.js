import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getGravatar } from '../controllers/auth';

const Nav = props => {
  const { loggedIn } = props;

  const links = [{ to: '/courses', label: 'Courses' }, { to: '/about', label: 'About' }];

  if (loggedIn) {
    links.push({ to: '/account', label: <img src={getGravatar()} alt="User Avatar" /> });
    // TODO: add Account and log out submenu items.
  } else {
    links.push({ to: '/log-in', label: 'Log In' });
    links.push({ to: '/sign-up', label: 'Sign up' });
  }

  return (
    <nav>
      <ul>
        {links.map(({ to, label }) => (
          <li key={`nav-link-${to}-${label}`}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>

      {/* TODO:
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
        }
      `}</style> */}
    </nav>
  );
};

const USER_LOGGED_IN = gql`
  query {
    user @client {
      loggedIn
    }
  }
`;

export default graphql(USER_LOGGED_IN, {
  props: ({ data: { user } }) => user,
})(Nav);
