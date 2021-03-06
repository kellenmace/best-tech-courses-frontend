import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import CoursesList from '../components/CoursesList';
import Emoji from '../components/Emoji';

const CourseCategory = props => {
  const { courseCategories, loading, error } = props;

  if (loading)
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Error message="Sorry– unable to load courses." />
      </Layout>
    );

  if (!courseCategories || !courseCategories.edges.length)
    return (
      <Layout>
        <p>
          Course category not found <Emoji symbol="☹️" label="frowning face" />
        </p>
      </Layout>
    );

  const courseCategory = courseCategories.edges[0].courseCategory;
  const { name, imageUrl, coursesList } = courseCategory;
  const courses = coursesList.courses.map(index => index.course);

  return (
    <Layout>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <CoursesList courses={courses} />
    </Layout>
  );
};

const GET_COURSE_CATEGORY = gql`
  query getCourseCategory($slug: [String]) {
    courseCategories(where: { slug: $slug }) {
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
  props: ({ data: courseCategories }) => courseCategories,
})(CourseCategory);
