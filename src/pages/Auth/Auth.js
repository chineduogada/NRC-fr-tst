import React, { Component } from 'react';
// import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Login from './Login/Login';
import Layout from '../../components/Layout/Layout';

class Auth extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      userLoggedIn: false,
      errorFeedback: ''
    };

    // bindings
    this.getInputValueHandler = this.getInputValueHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  // Login form input element values
  loginDetails = {
    email: '',
    password: ''
  };

  componentWillMount() {
    // check if the user is logged in
    this.checkCredentials();
    console.log(this.state);
  }

  // Checks if the Client (User) already has credentials in it's localStorage
  async checkCredentials() {
    if (this.getCredentials()) {
      this.setState({ userLoggedIn: true });
    }
  }

  // Stores User Credentials from server in the local storage
  storeCredentials(userData) {
    localStorage.setItem('curUser', JSON.stringify(userData));
  }

  // Retrieves User Credentials from the local storage
  getCredentials() {
    return JSON.parse(localStorage.getItem('curUser'));
  }

  // Clears Stored Login Credentials on Sign out
  clearCredentials() {
    localStorage.removeItem('curUser');
  }

  // Stores the login detail onChange
  getInputValueHandler({ target }, object) {
    object[target.id] = target.value;
  }

  // This handles the Login form on change
  async loginHandler(event) {
    event.preventDefault();

    // Attempt Login
    try {
      // const res = await axios.post('/auth/signin', this.loginDetails);

      // console.log(res.data.data);

      // store user credentials in local storage
      this.storeCredentials({
        firstName: 'Steve',
        lastName: 'Nwakasi',
        role: 'admin',
        token: 'hello boss'
      });

      console.log(this.state);

      // update user sign in state and reset the errorFeedback
      this.setState({
        userLoggedIn: true,
        errorFeedback: ''
      });
    } catch ({ response }) {
      this.setState({ errorFeedback: response.data.error });
    }
  }

  // Handles sign out
  signOutHandler() {
    // clear stored credentials
    this.clearCredentials();

    console.log('Logged out');

    // set the user's login state to false
    this.setState({ userLoggedIn: false });
  }

  // returns the Login Screen
  renderLoginScreen() {
    console.log('sdfss');
    return (
      <Login
        errorFeedback={this.state.errorFeedback}
        changed={event => this.getInputValueHandler(event, this.loginDetails)}
        submitted={this.loginHandler}
        toggleScreen={this.toggleLoginAndSignUpScreen}
      />
    );
  }

  // Returns the main app. This will only be accessible when the user is loggged in
  renderAppCore() {
    return (
      <Aux>
        <Layout
          userLoggedIn={this.state.userLoggedIn}
          signOutHandler={this.signOutHandler}
        />
      </Aux>
    );
  }

  // The render method
  render() {
    return (
      <Aux>
        {this.state.userLoggedIn
          ? this.renderAppCore()
          : this.renderLoginScreen()}
        ;
      </Aux>
    );
  }
}

export default Auth;
