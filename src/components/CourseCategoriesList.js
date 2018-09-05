import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import CourseCategoryCard from './CourseCategoryCard';

class CourseCategoriesList extends Component {
  state = {
    search: '',
  };

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  getVisibleCategories = () => {
    const {
      courseCategoriesList: { courseCategories },
    } = this.props;
    const { search } = this.state;

    if (!courseCategories || !courseCategories.length) return [];

    const categories = courseCategories.map(index => index.courseCategory);

    if (!search) return categories;

    return categories.filter(category =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  render() {
    const { loading, error } = this.props;
    const { search } = this.state;

    if (loading) return <LoadingSpinner />;
    if (error) return <Error message="Sorry– unable to load course categories." />;

    const categoriesVisible = this.getVisibleCategories();

    return (
      <section className="course-cat-list-container">
        <input
          type="text"
          placeholder="Language / framework"
          name="search"
          onChange={this.handleSearch}
          value={search}
        />
        {categoriesVisible && categoriesVisible.length ? (
          <ul className="course-cat-list">
            {categoriesVisible.map(courseCategory => (
              <CourseCategoryCard key={courseCategory.id} courseCategory={courseCategory} />
            ))}
          </ul>
        ) : (
          <p>No course categories found :(</p>
        )}
      </section>
    );
  }
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
  props: ({ data: { courseCategoriesList, loading, error } }) => ({
    courseCategoriesList,
    loading,
    error,
  }),
})(CourseCategoriesList);
