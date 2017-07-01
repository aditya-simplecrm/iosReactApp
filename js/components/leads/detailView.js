
import React, { Component } from 'react';
import { TouchableOpacity, Alert, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Form, Item, Label, Input, Thumbnail, Tab, Tabs } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import AppHeader from '../appHeader';

import realm from './realm';
const placeholder = require('../../../images/placeholder.png');

class LeadsDetailView extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.state = {
        title: 'Create Lead',
        right: 'createLead',
        first_name: '',
        last_name: '',
        messsage: '',
        first_name_error: false,
        last_name_error: false,
    }

  }


  render() {
    // const realm = new Realm({schema: [Leads]});
    var data = realm.objects('leads').filtered('id = $0',this.props.id);
    return (
      <Container style={styles.container}>
        <Header>
            <Left>
                <Button transparent onPress={() => Actions.leads()}>
                  <Icon active name="ios-arrow-back" />
                </Button>  
            </Left>
            <Body style={styles.body}>
                <Title>Lead</Title>
            </Body>
            <Right>
                <Button transparent onPress={this.props.openDrawer}>
                  <Icon active name="menu" />
                </Button>                        
            </Right>
        </Header>

        <Content padder>
            
              
              <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: 100}}><Thumbnail large source={placeholder} /></View>
                      <View style={{width: 800}}><Text>{data[0].first_name} {data[0].last_name}</Text></View>
              </View>         
              
              <Header hasTabs/>
              <Tabs initialPage={1}>
                <Tab heading="Basic Info">
                
                  <Body>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                              <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                        <Text>{data[0].first_name} {data[0].last_name}</Text>
                  </Body>               
                </Tab>
                <Tab heading="Appointments">
                  
                </Tab>
              </Tabs>   
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  // title: this.state.title
});

export default connect(mapStateToProps, bindAction)(LeadsDetailView);
