import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLogo from '../images/logo-default';

const CourseCategoryCard = ({ courseCategory }) => {
  const { slug, name, imageUrl } = courseCategory;
  const image = imageUrl ? <img src={imageUrl} alt={name} /> : <DefaultLogo />;

  return (
    <li className="course-cat-card">
      <Link to={`/course-categories/${slug}`}>
        {image}
        <h3>{name}</h3>
      </Link>
    </li>
  );
};

export default CourseCategoryCard;
