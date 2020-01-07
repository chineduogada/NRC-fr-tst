import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Layout from '../../components/Layout/Layout';

class Auth extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      isLoginScreenActive: true,
      userIsLoggedIn: true,
      errorFeedback: ''
    };

    // bindings
    this.getInputValueHandler = this.getInputValueHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.toggleLoginAndSignUpScreen = this.toggleLoginAndSignUpScreen.bind(
      this
    );

    // this.checkCredentials();
  }

  // Login form input element values
  loginDetails = {
    email: '',
    password: ''
  };

  signUpDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    jobRole: '',
    department: '',
    address: ''
  };

  // componentDidMount() {
  //   // check if the user is logged in
  //   this.checkCredentials();
  // }

  // Checks if the Client (User) already has credentials in it's localStorage
  checkCredentials() {
    if (this.getCredentials()) {
      // set the user's login state to true
      this.setState({ isUserLoggedIn: true });
    }
  }

  // Stores User Credentials from server in the local storage
  storeCredentials(userData) {
    // 'curUser' = Current User
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
      const res = await axios.post('/auth/signin', this.loginDetails);

      console.log(res.data.data);

      // store user credentials in local storage
      this.storeCredentials(res.data.data);

      // update user sign in state and reset the errorFeedback
      this.setState({
        isUserLoggedIn: true,
        errorFeedback: ''
      });
    } catch ({ response }) {
      this.setState({ errorFeedback: response.data.error });
    }
  }

  async signUpHandler(event) {
    event.preventDefault();

    // Validate the sign up details

    // Attempt signUp
    try {
      console.log(this.signUpDetails);
      const res = await axios.post('/auth/create-user', this.signUpDetails);

      // store user credentials in local storage
      this.storeCredentials(res.data.data);

      // update user sign in state and reset the errorFeedback
      this.setState({
        isUserLoggedIn: true,
        errorFeedback: ''
      });
    } catch (error) {
      if (error.response) {
        this.setState({ errorFeedback: error.response.data.error });
      } else {
        this.setState({ errorFeedback: 'Looks like you are offline' });
      }
    }

    // Scroll to the top of the form so that the user call see the feed back
    window.scrollTo(0, 0);
  }

  // Handles sign out
  signOutHandler() {
    // clear stored credentials
    this.clearCredentials();

    // set the user's login state to false
    this.setState({ isUserLoggedIn: false });
  }

  // Toggles between login and signup screens based by iniverting the boolean `this.state.isLoginScreenActive`
  toggleLoginAndSignUpScreen() {
    const oldState = this.state.isLoginScreenActive;
    this.setState({
      errorFeedback: '', // remove any error feedback on the previous form
      isLoginScreenActive: !oldState
    });
  }

  // Returns either the login or signup screen based on the value of `this.state.isLoginScreenActive` above
  renderLoginOrSignUpScreen() {
    return this.state.isLoginScreenActive
      ? this.renderLoginScreen()
      : this.renderSignUpScreen();
  }

  // returns the Login Screen
  renderLoginScreen() {
    return (
      <Login
        errorFeedback={this.state.errorFeedback}
        changed={event => this.getInputValueHandler(event, this.loginDetails)}
        submitted={this.loginHandler}
        toggleScreen={this.toggleLoginAndSignUpScreen}
      />
    );
  }

  // returns the Login Screen
  renderSignUpScreen() {
    return (
      <SignUp
        errorFeedback={this.state.errorFeedback}
        changed={event => this.getInputValueHandler(event, this.signUpDetails)}
        submitted={this.signUpHandler}
        toggleScreen={this.toggleLoginAndSignUpScreen}
      />
    );
  }

  // Returns the main app. This will only be accessible when the user is loggged in
  renderAppCore() {
    return (
      <Aux>
        <Layout isUserLoggedIn={true} signOutHandler={this.signOutHandler} />
      </Aux>
    );
  }

  // The render method
  render() {
    return (
      <Aux>
        {true ? <Redirect to="/" /> : this.renderLoginOrSignUpScreen()};
      </Aux>
    );
  }
}

export default Auth;
