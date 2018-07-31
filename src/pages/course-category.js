import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CoursesList from '../components/CoursesList';

const CourseCategory = props => {
  if (! props.courseCategories || ! props.courseCategories.edges.length) {
    return <NotFound />;
  }
  const courseCategory = props.courseCategories.edges[0].courseCategory;
  const { name, imageUrl, coursesList } = courseCategory;
  const courses = coursesList.courses.map( index => index.course );

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
  query getCourseCategory($slug: [String]) {
    courseCategories( where: {
      slug: $slug
    } ) {
      edges {
        courseCategory: node {
          id
          courseCategoryId
          termTaxonomyId
          name
          slug
          imageUrl
          coursesList: courses {
            courses: edges {
              course: node {
                id
                slug
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
          }
        }
      }
    }
  }
`;

export default graphql(GET_COURSE_CATEGORY, {
  options: props => ({ variables: { slug: props.match.params.slug } }),
  props: ({ data: courseCategories }) => (courseCategories)
})(CourseCategory);
