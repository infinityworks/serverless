import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/layouts/app';
import HomePage from './views/layouts/homePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);
