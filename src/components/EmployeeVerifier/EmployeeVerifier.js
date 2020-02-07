import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { IoIosCloseCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { GetImage } from '../../services/employeeService';
import { truncate } from '../../helpers/strings';
import classes from './EmployeeVerifier.module.scss';
import httpService from '../../services/httpService';

const employees = [
  {
    profilePic: '',
    firstName: 'stephen',
    lastName: 'nwakasi',
    middleName: 'ifeanyi',
    ippisNo: 94321,
    department: {
      code: 'FIN',
      description: 'finance'
    },
    presentJobTitle: {
      name: 'HOD'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94322,
    department: {
      code: 'FIN',
      description: 'finance'
    },
    presentJobTitle: {
      name: 'site officer 2'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94323,
    department: {
      code: 'ENG',
      description: 'engineering'
    },
    presentJobTitle: {
      name: 'site officer 2'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94324,
    department: {
      code: 'MRT',
      description: 'marketing'
    },
    presentJobTitle: {
      name: 'social media marketing'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94331,
    department: {
      code: 'ENG',
      description: 'engineering'
    },
    presentJobTitle: {
      name: 'systems admin'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94331,
    department: {
      code: 'FIN',
      description: 'chief accountant'
    },
    presentJobTitle: {
      name: 'systems admin'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94331,
    department: {
      code: 'FIN',
      description: 'finance'
    },
    presentJobTitle: {
      name: 'secretary'
    }
  },
  {
    profilePic: '',
    firstName: 'zurum',
    lastName: 'egwunwankwo',
    middleName: 'jennifer',
    ippisNo: 94421,
    department: {
      code: 'FIN',
      description: 'finance'
    },
    presentJobTitle: {
      name: 'team lead'
    }
  }
];

export default class EmployeeVerifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      employees: [],
      isProcessing: false,
      numInputChar: 0,
      isEmployeeSelected: false,
      checked: null
    };

    this.inputValue = '';

    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleEmployeeSelection = this.handleEmployeeSelection.bind(this);
  }

  updateInputValue(value) {
    this.inputValue = value;
    const { employee } = this.state;
    if (employee) {
      this.setState({
        employee: this.input.value === this.state.employee.ippisNo
      });
    }
  }

  /**
   * Checks the input field as good or bad according to some condition
   * provided by the user
   * @param cb a function provided by the user that returns a truthy/falsy value.
   * The call back takes the `employees` array stored in the state as input
   */
  checkInputField(cb) {
    this.setState({ checked: cb(this.state.employees) });
  }

  componentDidMount() {
    this.input =
      this.verifier.querySelector('input') ||
      this.verifier.querySelector('select') ||
      this.verifier.querySelector('textarea');

    this.input.oninput = ({ currentTarget }) => {
      this.updateInputValue(currentTarget.value);
      this.verifyEmployee();
      if (this.props.onInputChange) {
        this.props.onInputChange(this.state.employee);
      }
    };
  }

  handleEmployeeSelection({ currentTarget }) {
    const selectedEmployee = this.state.employees[currentTarget.id * 1];
    this.input.value = selectedEmployee.ippisNo;
    this.setState({
      isEmployeeSelected: true,
      employee: selectedEmployee,
      employees: []
    });

    this.runOnEmployeeSelection();
  }

  async verifyEmployee() {
    this.setState({ isProcessing: true });
    if (this.inputValue.length > 1) {
      // const results = employees.filter(employee => {
      //     return `${employee.ippisNo}`.includes(this.inputValue);
      // });

      const results = await httpService.get(
        `/employees?ippisNo=${this.inputValue}`
      );

      console.log(results);

      this.setState({ employees: results.data.data.rows, isProcessing: false });

      this.runOnResponseReceived();
    } else {
      this.setState({ employees: [], isProcessing: false });
    }
  }

  /**
   * Runs a callback passed as props to this component and to be run
   * after the user selects an employee from results found.
   */
  runOnEmployeeSelection() {
    const { onEmployeeSelection } = this.props;
    if (onEmployeeSelection) {
      onEmployeeSelection();
    }
  }

  /**
   * Runs a callback passed as props to this component and to be run
   * after a response has been recieved from the server.
   * The callback gets the total number of results found
   */
  runOnResponseReceived() {
    const { onResponseReceived, checkOnResponseRecieved } = this.props;
    if (checkOnResponseRecieved) {
      this.checkInputField(checkOnResponseRecieved);
    }

    if (onResponseReceived) {
      onResponseReceived(this.state.employees);
    }
  }

  profileLayout(employee) {
    return (
      <React.Fragment>
        <span className={classes.ProfilePic}>
          {<GetImage imageSource={employee.photo} />}
        </span>
        <div>
          <p className={classes.Name}>
            {truncate(
              `${employee.firstName || ''} ${employee.lastName ||
                ''} ${employee.middleName || ''}`,
              30
            )}
          </p>
          <p className={classes.Department}>
            {truncate(`${employee.employeeJob.department.description}`, 30)} (
            <span>
              {truncate(
                employee.employeeAppointment.presentJobTitle.description
              )}
              )
            </span>
          </p>
        </div>
      </React.Fragment>
    );
  }

  verificationResult() {
    const { employees } = this.state;
    return !this.props.hideList ? (
      <ul className={classes.VerificationResult}>
        {employees.map((employee, i) => {
          return (
            <li
              key={i}
              id={i}
              onClick={this.handleEmployeeSelection}
              className={classes.Result}
            >
              {this.profileLayout(employee)}
            </li>
          );
        })}
      </ul>
    ) : null;
  }

  renderProcessing() {
    return (
      <Spinner className={classes.Processing} animation='border' size='sm' />
    );
  }

  showEmployee() {
    const { employee } = this.state;
    return `${employee.ippisNo}`.length === this.input.value.length ? (
      <div className={classes.VerifiedEmployee}>
        {this.profileLayout(employee)}
      </div>
    ) : null;
  }

  renderCheckState() {
    return !this.state.isProcessing ? (
      <div className={classes.CheckState}>
        {this.state.checked ? (
          <span className={classes.CheckStatePassed}>
            <span>available</span>{' '}
            <IoIosCheckmarkCircleOutline className={classes.Icon} />
          </span>
        ) : (
          <span className={classes.CheckStateError}>
            <span>unavailable</span>{' '}
            <IoIosCloseCircle className={classes.Icon} />
          </span>
        )}
      </div>
    ) : null;
  }

  render() {
    const { employees, employee, checked, isProcessing } = this.state;
    return (
      <div
        className={classes.Verifier}
        ref={verifier => (this.verifier = verifier)}
      >
        {this.props.children}
        {checked !== null ? this.renderCheckState() : null}
        {isProcessing ? this.renderProcessing() : null}

        {this.props.preventDefault ? null : (
          <React.Fragment>
            {employees.length ? this.verificationResult() : null}
            {employee ? this.showEmployee() : null}
          </React.Fragment>
        )}
      </div>
    );
  }
}
