
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { setUser } from '../../actions/user';
import styles from './styles';


const background = require('../../../images/simplecrm_logo_1.png');
const background2 = require('../../../images/simplecrm_logo_2.1.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false,
      message: ''
    };
  }

  setUser(username) {
    this.props.setUser(username);
  }

    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch("http://127.0.0.1/suitecrm/login.php", {
                method: "POST",
                dataType: 'jsonp',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            })
            .then((response) => {
                  return response.json() // << This is the problem
            })
            .then((response) => {

                
                  proceed = true;
                  if (response.success === true) {
                    AsyncStorage.setItem('username',this.state.username);
                    Actions.home();
                  }else{
                    this.setState({ message: response.message });  
                  }
                 
                // else this.setState({ message: response.message });
                
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                // if (proceed) this.props.onLoginPress();
            })
            .catch(err => {
              this.setState({ message: err.message });
              this.setState({ isLoggingIn: false })
            });
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
          <Image source={background} style={styles.logo1}></Image>
            <Image source={background2} style={styles.logo2} ></Image>

              <View style={styles.bg}>
                  {!!this.state.message && (
                  <Text
                          style={{fontSize: 14, color: 'red', padding: 5}}>
                          {this.state.message}
                      </Text>
                  )}
                <Item style={styles.input}>
                  <Icon active name="person" />
                  <Input  
                        ref={component => this._username = component}
                        placeholder='Username' 
                        onChangeText={(username) => this.setState({username})}
                        autoFocus={true}
                        onFocus={this.clearUsername}
                  />
                </Item>
                <Item style={styles.input}>
                  <Icon name="unlock" />
                  <Input
                        ref={component => this._password = component}
                        placeholder='Password' 
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry={true}
                        onFocus={this.clearPassword}
                        onSubmitEditing={this._userLogin}
                        secureTextEntry
                  />
                </Item>

                {this.state.isLoggingIn && <Spinner color='blue' />}
                <Button 
                      block 
                      style={styles.btn} 
                      disabled={this.state.isLoggingIn||!this.state.username||!this.state.password} 
                      onPress={this._userLogin}
                >
                  <Text>Login</Text>
                </Button>
                <Content style={styles.bg}>
                  <Text style={styles.textCenter}>Forget Password?</Text>
                </Content>
                <Content style={styles.bg}>
                  <Text style={styles.textCenter}>www.simplecrm.com.sg</Text>
                </Content>
                
              </View>
            
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(username)),
  };
}


export default connect(null, bindActions)(Login);
