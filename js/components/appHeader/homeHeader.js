/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content, ListItem, Text, CheckBox, Header, Left, Button, Icon, Body, Right, Title } from 'native-base';
import { StyleSheet } from 'react-native';
import { openDrawer } from '../../actions/drawer';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

class AppHeader extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
  };
  render() {

    return (
            
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.openDrawer}>
                          <Icon active name="notifications" />
                        </Button>  
                        
                    </Left>
                    <Body style={styles.body}>
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.props.openDrawer}>
                          <Icon active name="menu" />
                        </Button>                                         
                    </Right>
                </Header>
            
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}
const mapStateToProps = state => ({

});


export default connect(mapStateToProps, bindAction)(AppHeader);

