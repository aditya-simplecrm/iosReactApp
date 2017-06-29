
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, ListItem, Left, Icon, Body } from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';


import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  _userLogout = () => {
      AsyncStorage.removeItem('username');
      Actions.login();
  }
  render() {
    return (
      <Content style={styles.sidebar} >
        <ListItem button onPress={() => { Actions.home(); this.props.closeDrawer(); }} >
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.leads(); this.props.closeDrawer(); }} >
          <Text>Leads</Text>
        </ListItem>
        <ListItem button onPress={() => {this._userLogout(); this.props.closeDrawer(); }} icon>
          
          <Body>
            <Text>Sign Out</Text>
          </Body>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(SideBar);
