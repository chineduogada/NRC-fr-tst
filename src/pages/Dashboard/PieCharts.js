import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import httpService from '../../services/httpService';
import prepareChartData from '../../helpers/prepareChartData';
import Select from '../../components/Select/Select';
import { Spinner } from '../../components/Loader/Loader';
import PieChart from '../../components/Charts/PieChart';
import Section from '../../hoc/Section/Section';
import classes from './Dashboard.module.scss';

class BarCharts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      genders: {
        name: 'gender',
        url: '/summary/employees?groupBy=genderId',
        data: [],
        targetKeyInRow: 'genderId',
        targetKeyInOption: 'type',
      },

      employeeStatuses: {
        name: 'employee status',
        url: '/summary/employee-jobs?groupBy=employeeStatusId',
        data: [],
        targetKeyInRow: 'employeeStatusId',
        targetKeyInOption: 'description',
      },

      salaryStructures: {
        name: 'salary structure',
        url: '/summary/employee-jobs?groupBy=salaryStructureId',
        data: [],
        targetKeyInRow: 'salaryStructureId',
        targetKeyInOption: 'description',
      },

      options: {},
    };
  }

  async processSummaryData(res, targetSummary) {
    const { options } = this.props;
    const { targetKeyInRow, targetKeyInOption } = this.state[targetSummary];

    let preparedData = [];

    if (res) {
      preparedData = await prepareChartData(
        res.data.data,
        options[targetSummary],
        targetKeyInRow,
        targetKeyInOption
      );
    }

    return preparedData;
  }

  async fetchActiveSummary() {
    const { salaryStructures, employeeStatuses, genders } = this.state;
    const [
      salaryStructureData,
      employeeStatusData,
      genderData,
    ] = await httpService.all([
      httpService.get(salaryStructures.url),
      httpService.get(employeeStatuses.url),
      httpService.get(genders.url),
    ]);

    const updatedSalaryStructures = {
      ...salaryStructures,
      data: await this.processSummaryData(
        salaryStructureData,
        'salaryStructures'
      ),
    };
    const updatedEmployeeStatuses = {
      ...salaryStructures,
      data: await this.processSummaryData(
        employeeStatusData,
        'employeeStatuses'
      ),
    };
    const updatedGenders = {
      ...salaryStructures,
      data: await this.processSummaryData(genderData, 'genders'),
    };

    this.setState({
      salaryStructures: updatedSalaryStructures,
      employeeStatuses: updatedEmployeeStatuses,
      genders: updatedGenders,
    });
  }

  async componentDidMount() {
    await this.fetchActiveSummary();
  }

  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    const { salaryStructures, employeeStatuses, genders } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h4 style={{ fontSize: '1.2rem', color: '#058f43' }}>
          {/* Employees grouped by {name} */}
        </h4>
        <Section>
          <div className={classes.PieChartSummary}>
            <div className={classes.Summary}>
              <h5>Genders</h5>
              <PieChart data={genders.data} />
            </div>
            <div className={classes.Summary}>
              <h5>Salary Structures</h5>
              <PieChart data={salaryStructures.data} />
            </div>
            <div className={classes.Summary}>
              <h5>Employee Status</h5>
              <PieChart data={employeeStatuses.data} />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: {
      salaryStructures: state.options.salaryStructure,
      genders: state.options.gender,
      employeeStatuses: state.options.employeeStatus,
    },
  };
};

export default connect(mapStateToProps)(BarCharts);
