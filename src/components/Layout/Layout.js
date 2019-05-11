import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  };

  render() {
    return (
      <Aux>
        <Toolbar/>
        <SideDrawer
          isShown={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;