import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Course = ({course}) => {
  if (!course) return <NotFound />;
  const { title, content, affiliateLink } = course;

  return (
    <Layout>
      <article className="course">
        <h1>{ title }</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <Link to={ affiliateLink } target="_blank">Take course →</Link>
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
    course: courseBy( slug: $slug ) {
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
  props: ({ data: { course } }) => ({ course })
})(Course);
