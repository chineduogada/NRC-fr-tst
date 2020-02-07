import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { verifyIPPIS } from '../../services/employeeService';
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
      isEmployeeSelected: false
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
    // this.setState({ isProcessing: true })
    if (this.inputValue.length > 1) {
      // const results = employees.filter(employee => {
      //     return `${employee.ippisNo}`.includes(this.inputValue);
      // });

      const results = await httpService.get(
        `/employees?ippisNo=${this.inputValue}`
      );

      console.log(results);

      this.setState({ employees: results.data.data.rows });

      this.runOnResponseReceived();
    } else {
      this.setState({ employees: [] });
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
    const { onResponseReceived } = this.props;
    if (onResponseReceived) {
      onResponseReceived(this.state.employees.length);
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

  showEmployee() {
    const { employee } = this.state;
    return `${employee.ippisNo}`.length === this.input.value.length ? (
      <div className={classes.VerifiedEmployee}>
        {this.profileLayout(employee)}
      </div>
    ) : null;
  }

  render() {
    const { employees, employee } = this.state;
    return (
      <div
        className={classes.Verifier}
        ref={verifier => (this.verifier = verifier)}
      >
        {this.props.children}
        {employees.length ? this.verificationResult() : null}
        {employee ? this.showEmployee() : null}
      </div>
    );
  }
}
