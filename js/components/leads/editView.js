
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

class LeadsEditView extends Component {

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
        title: '',
        email: '',
        mobile: '',
        details: '',
        email_error: false

    }

  }

  _save = () => {
      if (this.state.first_name == '') {
        this.setState({first_name_error: true});
      
        Alert.alert('Please enter first name');
      }else if (this.state.last_name == '') {
      
        this.setState({last_name_error: true});

        Alert.alert('Please enter last name');
      }else if (this.state.email != '') {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (!re.test(this.state.email)) {
          this.setState({email_error: true});

          Alert.alert('Email is invalid');            
        }

      }      

      if (this.state.last_name_error ===false && this.state.first_name_error === false) {
           var id = realm.objects('leads').length + 1;
           var data = realm.write(() => {
                realm.create('leads', {
                                        id: id,
                                        deleted: false, 
                                        first_name: this.state.first_name, 
                                        last_name: this.state.last_name, 
                                        creationDate: new Date()
                                      }
                );
            });

           
            Actions.leadsDetailView({id : id});
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
            <Item floatingLabel>
              <Label>Title</Label>
              <Input 
                  onChangeText={(title) => this.setState({title})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Details</Label>
              <Input 
                  onChangeText={(details) => this.setState({details})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Mobile Number</Label>
              <Input 
                  onChangeText={(mobile) => this.setState({mobile})}
              />
            </Item>

            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                  onChangeText={(email) => this.setState({email})}
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

export default connect(mapStateToProps, bindAction)(LeadsEditView);
