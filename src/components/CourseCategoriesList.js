import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CourseCategoryCard from '../components/CourseCategoryCard';

const CourseCategoriesList = props => {
  if ( ! props.courseCategories || ! props.courseCategories.length ) return <p>No course categories found :(</p>;

  const courseCategories = props.courseCategories.map( index => index.courseCategory );

  return (
    <section className="course-cat-list-container">
      <ul className="course-cat-list">
        {courseCategories.map( courseCategory => (
          <CourseCategoryCard key={ courseCategory.id } courseCategory={ courseCategory } />
        ) )}
      </ul>
    </section>
  );
}

const GET_COURSE_CATEGORIES = gql`
  query getCourseCategories {
    courseCategoriesList: courseCategories {
      courseCategories: edges {
        courseCategory: node {
          id
          slug
          name
          imageUrl
        }
      }
    }
  }
`;

export default graphql(GET_COURSE_CATEGORIES, {
  props: ({ data: { courseCategoriesList } }) => courseCategoriesList,
})(CourseCategoriesList);
