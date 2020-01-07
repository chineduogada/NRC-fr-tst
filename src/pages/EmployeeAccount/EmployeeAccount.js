import React, { Component } from 'react';
import axios from 'axios';
import Feedback from '../../components/Feedback/Feedback';
import Section from '../../hoc/Section/Section';
import SignUp from '../Auth/SignUp/SignUp';

class EmployeeAccount extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      errorFeedback: '',
      feedback: '',
    };

    // bindings
    this.getInputValueHandler = this.getInputValueHandler.bind(this);
    this.signUpHandler = this.signUpHandler.bind(this);
  }


  signUpDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    jobRole: '',
    department: '',
    address: '',
  }

  // Stores the login detail onChange
  getInputValueHandler({ target }, object) {
    object[target.id] = target.value;
  }

  async signUpHandler(event) {
    event.preventDefault();
    event.persist();

    // Validate the sign up details

    // Attempt signUp
    try {
      console.log(this.signUpDetails);
      const res = await axios.post('/auth/create-user', this.signUpDetails);

      // clear the form
      event.target.reset();

      // update user sign in state and reset the errorFeedback
      this.setState({
        isUserLoggedIn: true,
        feedback: res.data.data.message,
        errorFeedback: '',
      });

    } catch (error) {
      if (error.response) {
        this.setState({ errorFeedback: error.response.data.error });
      } else {
        this.setState({ feedback: 'Looks like you are offline' });
      }
    }

    // Scroll to the top of the form so that the user call see the feed back
    window.scrollTo(0, 0);
  }

  // returns the Login Screen
  render() {
    return (
      <Section>
        <SignUp errorFeedback={this.state.errorFeedback}
          changed={(event) => this.getInputValueHandler(event, this.signUpDetails)}
          submitted={this.signUpHandler} />

        {/* Place Feedback here */}
        <Feedback message={this.state.feedback} />

      </Section>
    );
  }
}

export default EmployeeAccount;
