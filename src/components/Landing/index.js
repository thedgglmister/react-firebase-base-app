import React from 'react';

import { withForwardUsersHome } from '../Session';

const LandingPage = () => (
  <div>
    <h1>LandingPage</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withForwardUsersHome(condition)(LandingPage);
