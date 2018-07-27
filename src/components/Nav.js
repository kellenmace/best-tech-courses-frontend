import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: '/courses', label: 'Courses' },
  { to: '/sign-in', label: 'Sign In' },
  { to: '/sign-up', label: 'Sign Up' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
});

export default () => (
  <nav>
    <ul>
      {links.map(
        ({ key, to, label }) => (
          <li key={key}>
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
)
