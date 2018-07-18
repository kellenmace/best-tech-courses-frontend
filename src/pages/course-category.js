import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import CoursesList from '../components/CoursesList';

const CourseCategory = ({courseCategory}) => {
  if ( ! courseCategory ) return <NotFound />;
  const { name, slug, imageUrl, coursesList: { courses } } = courseCategory;

  return (
    <Layout>
      <img src={imageUrl} alt={name} />
      <h1>{ name }</h1>
      <CoursesList courses={ courses } />
    </Layout>
  );
};

const NotFound = () => (
  <Layout>
    <p>Course category not found :(</p>
  </Layout>
);

const GET_COURSE_CATEGORY = gql`
  query getCourseCategory($id: ID!) {
    courseCategory(id: $id) {
      id
      slug
      name
      imageUrl
      coursesList: courses {
        courses: nodes {
          id
          title
          instructor
          discount
          slug
          featuredImage {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default withRouter( graphql(GET_COURSE_CATEGORY, {
  options: props => ({ variables: { id: props.router.query.id } }),
  props: ({ data: { courseCategory } }) => ({ courseCategory })
})(CourseCategory) );
