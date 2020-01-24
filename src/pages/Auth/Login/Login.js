import React from 'react';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import classes from './Login.module.css';

const login = props => {
  const errorFeedback =
    props.errorFeedback !== '' ? (
      <p className='error'>{props.errorFeedback}</p>
    ) : null;

  console.log('hi');

  return (
    <div className={classes.LoginWrapper}>
      <div className={classes.Login}>
        <div className={classes.Container}>
          <div className={classes.Brand}>
            <h1>
              <span>NRC</span> - HR
            </h1>
          </div>

          <form onSubmit={props.submitted}>
            {/* Show error feedback if any */}
            {errorFeedback}
            <InputField
              changed={props.changed}
              id='email'
              type='text'
              name='username *'
            />
            <InputField
              changed={props.changed}
              id='password'
              type='password'
              name='password *'
            />
            <Button label='sign in' size='full-width'>
              sign in
            </Button>

            {/* <span className={classes.Footer} onClick={props.toggleScreen}>Don't have an account?</span> */}
          </form>
        </div>
      </div>

      <div className={classes.Banner}>
        <h2>Experience the workflow of a life time.</h2>
        <ul>
          <li>
            <span>></span> Track Employees
          </li>
          <li>
            <span>></span> Manage Departments
          </li>
          <li>
            <span>></span> Manage Successions
          </li>
          <li>
            <span>></span> Schedule Trainings
          </li>
          <li>
            <span>></span> Genarate Reports
          </li>
          <li>
            <span>></span> and more.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default login;
