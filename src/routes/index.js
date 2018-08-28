import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from '../pages/courses';
import Course from '../pages/course';
import CourseCategory from '../pages/course-category';
import SignUp from '../pages/sign-up';
import LogIn from '../pages/log-in';
import LogOut from '../pages/log-out';
import SetPassword from '../pages/set-password';
import Home from '../pages/home';

// React Router tutorial:
// https://www.youtube.com/watch?v=l9eyot_IXLY
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/courses" exact component={Courses} />
      <Route path="/courses/:slug" component={Course} />
      <Route path="/course-categories/:slug" component={CourseCategory} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/log-in" exact component={LogIn} />
      <Route path="/log-out" exact component={LogOut} />
      <Route path="/set-password" exact component={SetPassword} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
