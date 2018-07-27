import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from '../pages/courses';
import SignIn from '../pages/sign-in';
import Home from '../pages/home';

// React Router tutorial:
// https://www.youtube.com/watch?v=l9eyot_IXLY
export default() => (
  <BrowserRouter>
    <Switch>
      <Route path="/courses" exact component={Courses} />
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
