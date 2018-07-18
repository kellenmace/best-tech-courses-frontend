import React from 'react';
import Layout from '../components/Layout';
import CourseCategoriesList from '../components/CourseCategoriesList';

const Courses = () => (
  <Layout>
    <h1>What do you want to learn?</h1>
    <CourseCategoriesList />
  </Layout>
);

export default Courses;
