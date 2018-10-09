import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import Emoji from '../components/Emoji';

const Course = props => {
  const { course, loading, error } = props;

  if (loading)
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Error message="Sorry– unable to load course." />
      </Layout>
    );

  const { courseId, title, content, affiliateLink } = course;

  const handleClick = async event => {
    const { loggedIn, addTimer } = props;

    if (!loggedIn) {
      event.preventDefault();
      props.history.push('/sign-up');
    }

    try {
      const startTimestamp = Date.now();
      const response = await addTimer({
        variables: { courseId, startTimestamp },
      });
      // TODO: display timer.
    } catch (error) {
      // TODO: handle error.
      event.preventDefault();
    }
  };

  return (
    <Layout>
      <article className="course">
        <h1>{title}</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        <a onClick={handleClick} href={affiliateLink} target="_blank" rel="noopener noreferrer">
          Take course →
        </a>
        <div style={{ border: '5px solid #ccc' }}>
          <h3>Time left to register</h3>
          <LoadingSpinner />
        </div>
        <span>
          <Emoji symbol="⏱" label="stopwatch" />
          You have 30 minutes to register for this course after clicking through to it. If you need
          more time, just come back here and press the button again.
        </span>
      </article>
    </Layout>
  );
};

const GET_COURSE = gql`
  query getCourse($slug: String) {
    course: courseBy(slug: $slug) {
      courseId
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

const USER_LOGGED_IN = gql`
  query {
    user @client {
      loggedIn
    }
  }
`;

const ADD_TIMER = gql`
  mutation addTimer($courseId: String!, $startTimestamp: String!) {
    addTimer(courseId: $courseId, startTimestamp: $startTimestamp) @client {
      timers
    }
  }
`;

export default compose(
  graphql(GET_COURSE, {
    options: props => ({ variables: { slug: props.match.params.slug } }),
    props: ({ data: { course, loading, error } }) => ({
      course,
      loading,
      error,
    }),
  }),
  graphql(USER_LOGGED_IN, {
    props: ({ data: { user } }) => user,
  }),
  graphql(ADD_TIMER, { name: 'addTimer' })
)(Course);
