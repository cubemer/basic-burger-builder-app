import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => (
      {showSideDrawer: !prevState.showSideDrawer}
    ));
    console.log('hello toggle please')
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
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