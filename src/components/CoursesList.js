import React from 'react';
import CourseCard from './CourseCard';

export default ({ courses }) => {
  if (!courses.length) return <p>No courses found :(</p>;

  return (
    <section className="courses-list-container">
      <ul className="courses-list">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
    </section>
  );
};
