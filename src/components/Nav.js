import React from 'react';
import { Link } from 'react-router-dom';
import { isUserSignedIn, getGravatar } from '../controllers/auth';

const links = [
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
];

if ( isUserSignedIn() ) {
  links.push({ to: '/account', label: <img src={ getGravatar() } alt="User Avatar" /> });
  // TODO: add Account and Sign out submenu items.
} else {
  // https://unsplash.com/
  links.push({ to: '/sign-in', label: 'Sign In' });
  links.push({ to: '/sign-up', label: 'Join free' });
}

export default () => (
  <nav>
    <ul>
      {links.map(
        ({ to, label }) => (
          <li key={`nav-link-${to}-${label}`}>
            <Link to={to}>{label}</Link>
          </li>
        )
      )}
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
