import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from '../pages/courses';
import Index from '../pages/index';

// React Router tutorial:
// https://www.youtube.com/watch?v=l9eyot_IXLY
export default() => (
  <BrowserRouter>
    <Switch>
      <Route path="/courses" exact component={Courses} />
      <Route path="/" component={Index} />
    </Switch>
  </BrowserRouter>
);
