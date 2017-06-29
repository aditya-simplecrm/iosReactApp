
import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Form, Item, Label, Input } from 'native-base';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import AppHeader from '../appHeader';

import realm from './realm';

class Leads extends Component {

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

  _save = () => {
      if (this.state.first_name == '') {
        this.setState({first_name_error: true});
      
        Alert.alert('Please enter first name');
      }else if (this.state.last_name == '') {
      
        this.setState({last_name_error: true});

        Alert.alert('Please enter last name');
      }      

      if (this.state.last_name_error ===false && this.state.first_name_error === false) {
           var id = realm.where('leads').maximumInt("id") + 1;
           var data = realm.write(() => {
                realm.create('leads', {
                                        id: id
                                        deleted: false, 
                                        first_name: this.state.first_name, 
                                        last_name: this.state.last_name, 
                                        creationDate: new Date()
                                      }
                );
            });

            console.warn(data);
            Actions.leadsDetailView();
      }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
            <Left>
                <Button transparent onPress={() => Actions.pop()}>
                  <Icon name="ios-arrow-back" />
                </Button>
            </Left>
            <Body style={styles.body}>
                <Title>Create Lead</Title>
            </Body>
            <Right>
                <Button transparent onPress={this._save}>
                  <Icon active name="bookmark" />
                </Button>                                            
            </Right>
        </Header>

        <Content padder>

          <Form>
            <Item floatingLabel>
              <Label>First Name*</Label>
              <Input 
                  onChangeText={(first_name) => this.setState({first_name})}
                  
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name*</Label>
              <Input 
                  onChangeText={(last_name) => this.setState({last_name})}
              />
            </Item>
          </Form>
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

export default connect(mapStateToProps, bindAction)(Leads);
