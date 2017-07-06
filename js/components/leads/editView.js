
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Picker, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Form, Item, Label, Input,View, Thumbnail } from 'native-base';
import { TouchableOpacity, Alert, ActionSheetIOS, PixelRatio, Image, ImageStore, AsyncStorage } from 'react-native';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import AppHeader from '../appHeader';
import ImagePicker from 'react-native-image-picker';
import realm from './realm';

var BUTTONS = [
  'New',
  'Assigned',
  'In Process',
  'Recycled',
  'Converted',
  'Dead',
  'Cancel'
];
var DESTRUCTIVE_INDEX = -1;
var CANCEL_INDEX = 6;

var BUTTONSCATEGORY = [
  'Warm',
  'Cold',
  'Hot',
  'Cancel'
];
var DESTRUCTIVE_INDEX_CATEGORY = -1;
var CANCEL_INDEX_CATEGORY = 3;

var BUTTONS_ENQUIRY = [
  '',
  'Cold Call',
  'Existing Customer',
  'Self Generated',
  'Employee',
  'Partner',
  'Public Relations',
  'Direct Mail',
  'Conference',
  'Trade Show',
  'Website',
  'Word of mouth',
  'Email',
  'Campaign',
  'Other',
  'Cancel'
];
var DESTRUCTIVE_INDEX_ENQUIRY = -1;
var CANCEL_INDEX_ENQUIRY = 15;

var BUTTONS_CUSTOMER = [
  'Individual',
  'Corporate',
  'Cancel'
];
var DESTRUCTIVE_INDEX_CUSTOMER = -1;
var CANCEL_INDEX_CUSTOMER = 2;
  
const placeholder = require('../../../images/placeholder.png');

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
        email_error: false,
        selected: 'key1',
        clicked: 'none',
        status: 'New',
        category: 'Warm',
        enquiry: '',
        customer: 'Individual',
        city: '',
        state: '',
        postal: '',
        street: '',
        company_name: '',
        office_contact_number: '',
        avatarSource: null,
        videoSource: null
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
                                        creationDate: new Date(),
                                        title: this.state.title,
                                        details: this.state.details,
                                        street: this.state.street,
                                        city: this.state.city,
                                        state: this.state.state,
                                        postal_code: this.state.postal,
                                        country: this.state.country,
                                        contact_number: this.state.mobile,
                                        email: this.state.email,
                                        status: this.state.status,
                                        category: this.state.category,
                                        enquiry_source: this.state.enquiry,
                                        customer_type: this.state.customer,
                                        office_contact_number: office_contact_number,
                                        company_name: this.state.company_name
                                      }
                );
            });

           
            Actions.leadsDetailView({id : id});
      }
  }
  onValueChange (value: string) {
    this.setState({
      selected : value
    });
  }

  _updateStatus = () => {
      Alert.alert('hi');
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 6:
          
          break
        default:
          this.setState({ status: BUTTONS[buttonIndex]});
          break
      }
    });
  }

  showActionSheetForCategory() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONSCATEGORY,
      cancelButtonIndex: CANCEL_INDEX_CATEGORY,
      destructiveButtonIndex: DESTRUCTIVE_INDEX_CATEGORY,
      tintColor: 'green',
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 3:
          
          break
        default:
          this.setState({ category: BUTTONSCATEGORY[buttonIndex]});
          break
      }
    });
  }

  showActionSheetForEnquiry() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS_ENQUIRY,
      cancelButtonIndex: CANCEL_INDEX_ENQUIRY,
      destructiveButtonIndex: DESTRUCTIVE_INDEX_ENQUIRY,
      tintColor: 'green',
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 15:
          
          break
        default:
          this.setState({ enquiry: BUTTONS_ENQUIRY[buttonIndex]});
          break
      }
    });
  }

  showActionSheetForCustomer() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS_CUSTOMER,
      cancelButtonIndex: CANCEL_INDEX_CUSTOMER,
      destructiveButtonIndex: DESTRUCTIVE_INDEX_CUSTOMER,
      tintColor: 'green',
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 2:
          
          break
        default:
          this.setState({ customer: BUTTONS_CUSTOMER[buttonIndex]});
          break
      }
    });
  }

  selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', 'data:image/jpeg;base64,' + response.data);


        if (response.didCancel) {
          // console.log('User cancelled photo picker');
        }
        else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };

          // You can also display the image using data:
          // var source = { uri: 'data:image/jpeg;base64,' + response.uri };
          AsyncStorage.setItem('imageUpload', JSON.stringify(response.data));
          // ImageStore.addImageFromBase64(response.data);
          this.setState({
            avatarSource: source
          });

        }
      });
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
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{width: 100, top:25}}>
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <View><Thumbnail large source={placeholder} /><Icon style={{left:45,bottom:15}} active name="md-camera" md="md-camera" /></View>:
                          <View><Thumbnail large source={this.state.avatarSource} /><Icon style={{left:45,bottom:15}} active name="md-camera" md="md-camera" /></View>
                        }
                        </View>
                      </TouchableOpacity>            
                  </View>
                  <View style={{width: 800}}>
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
                  </View>
              </View> 
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
              <Label>Company Name</Label>
              <Input 
                  onChangeText={(company_name) => this.setState({company_name})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Mobile No</Label>
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
            
            <Item floatingLabel>
              <Label>Office Phone</Label>
              <Input 
                  onChangeText={(office_contact_number) => this.setState({office_contact_number})}
              />
            </Item>
            
            <Label style={{fontSize:15,marginTop:20,marginLeft:18}}>Status</Label>
            <Item onPress={this.showActionSheet.bind(this)}>

                <Input disabled placeholder={this.state.status} style={{top:-1}} />
                <Icon name='md-arrow-dropdown-circle' style={{}}/>
            </Item>

            <Label style={{fontSize:15,marginTop:20,marginLeft:18}}>Category</Label>
            <Item onPress={this.showActionSheetForCategory.bind(this)}>

                <Input disabled placeholder={this.state.category} style={{top:-1}} />
                <Icon name='md-arrow-dropdown-circle' style={{}}/>
            </Item>

            <Label style={{fontSize:15,marginTop:20,marginLeft:18}}>Enquiry Source</Label>
            <Item onPress={this.showActionSheetForEnquiry.bind(this)}>

                <Input disabled placeholder={this.state.enquiry} style={{top:-1}} />
                <Icon name='md-arrow-dropdown-circle' style={{}}/>
            </Item>

            <Label style={{fontSize:15,marginTop:20,marginLeft:18}}>Customer Type</Label>
            <Item onPress={this.showActionSheetForCustomer.bind(this)}>

                <Input disabled placeholder={this.state.customer} style={{top:-1}} />
                <Icon name='md-arrow-dropdown-circle' style={{}}/>
            </Item>

            <Item style={{paddingTop:20}}>
              
              <Input 
                  onChangeText={(street) => this.setState({street})} placeholder='Street'
              />
              <Icon name='ios-search' style={{}}/>
            </Item>

            <Item floatingLabel>
              <Label>City</Label>
              <Input 
                  onChangeText={(city) => this.setState({city})}
              />
            </Item>

            <Item floatingLabel>
              <Label>State</Label>
              <Input 
                  onChangeText={(state) => this.setState({state})}
              />
            </Item>

            <Item floatingLabel>
              <Label>Postal Code</Label>
              <Input 
                  onChangeText={(postal) => this.setState({postal})}
              />
            </Item>

            <Item floatingLabel>
              <Label>Country</Label>
              <Input 
                  onChangeText={(country) => this.setState({country})}
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
