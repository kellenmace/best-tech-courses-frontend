import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from '../pages/courses';
import Course from '../pages/course';
import CourseCategory from '../pages/course-category';
import SignIn from '../pages/sign-in';
import Home from '../pages/home';

// React Router tutorial:
// https://www.youtube.com/watch?v=l9eyot_IXLY
export default() => (
  <BrowserRouter>
    <Switch>
      <Route path="/courses" exact component={Courses} />
      <Route path="/courses/:slug" component={Course} />
      <Route path="/course-categories/:slug" component={CourseCategory} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
