import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withForwardUsersHome = condition => Component => {

  class WithForwardUsersHome extends React.Component {
    constructor(props) {
      super(props);

      this.listener = props.firebase.onAuthUserListener(
        authUser => {
          if (condition(authUser)) {
            this.props.history.push(ROUTES.HOME);
          }
        },
        () => null,
      );




      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          console.log(211);
          console.log(authUser)
          console.log(condition(authUser));
          if (condition(authUser)) {
            this.props.history.push(ROUTES.HOME);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? null : <Component {...this.props} />
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithForwardUsersHome);
};

export default withForwardUsersHome;
