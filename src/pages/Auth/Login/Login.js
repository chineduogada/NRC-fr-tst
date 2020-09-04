import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import { Spinner } from '../../../components/Loader/Loader';
import classes from './Login.module.scss';

// Stores User Credentials from server in the local storage
const storeCredentials = (userData) => {
  localStorage.setItem('curUser', JSON.stringify(userData));
};

const initialState = {
  username: '',
  password: '',
};

function Login({ onComplete }) {
  const [state, setState] = useState(initialState);
  const [errorFeedback, setErrorFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = ({ currentTarget: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      const res = await axios.post('/auth', state);

      if (res) {
        storeCredentials(res.data.data);
        onComplete(true);
        setIsProcessing(false);
      } else {
        console.log(res);
        setErrorFeedback(res.data.error);
      }
    } catch (error) {
      // setErrorFeedback(response.data.error);
      console.log(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className={classes.LoginWrapper}>
      <div className={classes.Login}>
        <div className={classes.Container}>
          <div className={classes.Brand}>
            <h1>
              <span>P R M</span>
            </h1>
          </div>

          <form onSubmit={loginHandler}>
            {/* Show error feedback if any */}
            {errorFeedback}
            <div className="form-group">
              <input
                id="username"
                name="username"
                className="form-control"
                type="text"
                value={state.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                id="password"
                name="password"
                className="form-control"
                type="password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <Button
              disabled={isProcessing}
              label={
                isProcessing ? (
                  <>
                    signing in.. <Spinner size="1em" />{' '}
                  </>
                ) : (
                  'sign in'
                )
              }
              fullwidth
              fill
            />

            {/* <span className={classes.Footer} onClick={props.toggleScreen}>Don't have an account?</span> */}
          </form>
        </div>
      </div>

      <div className={classes.Banner}>
        <h2>Experience the workflow of a life time.</h2>
        <ul>
          <li>
            <span>&gt;</span> Track Employees
          </li>
          <li>
            <span>&gt;</span> Manage Departments
          </li>
          <li>
            <span>&gt;</span> Manage Successions
          </li>
          <li>
            <span>&gt;</span> Schedule Trainings
          </li>
          <li>
            <span>&gt;</span> Genarate Reports
          </li>
          <li>
            <span>&gt;</span> and more.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
