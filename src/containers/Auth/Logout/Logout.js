import React from 'react';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to='/'/>;
  }
}

const mapDispatchToProps = dispatch => (
  {
    onLogout: () => dispatch(actions.logout())
  }
)

export default Logout;