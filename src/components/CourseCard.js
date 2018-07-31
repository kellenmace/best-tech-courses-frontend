import React from 'react';
import { Link } from 'react-router-dom'
import DefaultLogo from '../images/logo-default';

const CourseCard = ({ course }) => {
  const { title, slug, instructor, discount, featuredImage } = course;
  const imageUrl = featuredImage && featuredImage.sourceUrl ? featuredImage.sourceUrl : '';
  const image = imageUrl ? <img src={ imageUrl } alt={ title } /> : <DefaultLogo />;

  return (
    <li className="course-card">
      <Link to={`/courses/${slug}`}>
          { image }
          <h3>{ title }</h3>
          <span>{ instructor }</span>
          <span>${ discount }</span>
      </Link>
    </li>
  );
};

export default CourseCard;

CourseCard.defaultProps = {
  course: {
    id: '',
    title: '',
    slug: '',
    instructor: '',
    discount: '',
    featuredImage: {
      sourceUrl: ''
    }
  }
}
