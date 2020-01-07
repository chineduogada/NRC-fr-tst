import React from 'react';
import InputField from '../../../components/InputField/InputField';
import Button from '../../../components/Button/Button';
import classes from './SignUp.module.css';
import image from '../../../assets/bg4-2.svg';

const signup = props => {
  const errorFeedback =
    props.errorFeedback !== '' ? (
      <p className="error">{props.errorFeedback}</p>
    ) : null;

  return (
    <div className={classes.LoginWrapper}>
      <div className={classes.Banner}>
        <div className={classes.Image}>
          <img src={image} alt="catch up with team mates" />
        </div>
      </div>

      <div className={classes.Login}>
        <div className={classes.Brand}>
          <h1>New Employee Account</h1>
        </div>

        <p>
          Set up a new user account. Account credentials will be sent to the
          email address provided. Please, ensure that the email is correct.
        </p>

        <form onSubmit={props.submitted}>
          {/* Show error feedback if any */}
          {errorFeedback}
          <InputField
            changed={props.changed}
            id="firstName"
            type="text"
            name="first name *"
          />
          <InputField
            changed={props.changed}
            id="lastName"
            type="text"
            name="last name *"
          />
          <InputField
            changed={props.changed}
            id="email"
            type="email"
            name="email *"
          />
          <InputField
            changed={props.changed}
            id="password"
            type="password"
            name="password *"
          />
          <InputField
            changed={props.changed}
            id="confirmPassword"
            type="password"
            name="confirm password *"
          />
          <InputField
            changed={props.changed}
            id="gender"
            type="select"
            name="gender *"
            options={[
              { name: 'Select gender' },
              { name: 'male' },
              { name: 'female' }
            ]}
          />
          <InputField
            changed={props.changed}
            id="jobRole"
            type="select"
            name="job role *"
            options={[
              { name: 'Select job role' },
              { name: 'Finance' },
              { name: 'Communication' },
              { name: 'Research' },
              { name: 'Analytics' }
            ]}
          />
          <InputField
            changed={props.changed}
            id="department"
            type="select"
            name="department *"
            options={[
              { name: 'Select department' },
              { name: 'Finance' },
              { name: 'Communication' },
              { name: 'Research' },
              { name: 'Analytics' }
            ]}
          />
          <InputField
            changed={props.changed}
            id="address"
            type="text"
            name="address *"
          />
          <Button size="full-width">create account</Button>
        </form>
      </div>
    </div>
  );
};

export default signup;
