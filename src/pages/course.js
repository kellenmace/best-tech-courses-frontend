import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Course = ({ course }) => {
  if (!course) return <NotFound />;
  const { title, content, affiliateLink } = course;

  // TODO:
  // Handle link click. If user is not logged in, send them to the sign up/login page.
  // If user is logged in, display countdown timer and save affiliate link click CPT
  // Maybe do this in a modal instead, and have users click a second time.

  return (
    <Layout>
      <article className="course">
        <h1>{title}</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
          Take course →
        </a>
      </article>
    </Layout>
  );
};

const NotFound = () => (
  <Layout>
    <p>Course not found :(</p>
  </Layout>
);

const GET_COURSE = gql`
  query getCourse($slug: String) {
    course: courseBy(slug: $slug) {
      title
      content
      instructor
      discount
      affiliateLink
      featuredImage {
        sourceUrl
      }
    }
  }
`;

export default graphql(GET_COURSE, {
  options: props => ({ variables: { slug: props.match.params.slug } }),
  props: ({ data: { course } }) => ({ course }),
})(Course);
