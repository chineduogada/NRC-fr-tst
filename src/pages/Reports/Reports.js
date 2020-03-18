import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { IoMdFunnel } from 'react-icons/io';
import http from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import Table from '../../components/TableView/TableView';
import GlobalFilters from '../../components/GlobalFilters/GlobalFilters';
import LightBox from '../../components/LightBox/LightBox';
import Loader from '../../components/Loader/Loader';
import Select from '../../components/Select/Select';
import formats from './formats';
import classes from './Reports.module.scss';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      activeColumnFormat: 'formatA',
      columns: formats,
      showFilters: false,
      isProcessing: false
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleFilterDraw = this.toggleFilterDraw.bind(this);
    this.consumeQueryString = this.consumeQueryString.bind(this);
  }

  async resetResultAndPagination() {
    await this.setState({ employees: [], page: 1 });
  }

  async autoFetchFromServer(queryString) {
    this.toggleIsProcessing();

    if (this.state.showFilters) {
      this.toggleFilterDraw();
    }

    const limit = 200;
    let page = 1;
    let countEqualsLimit = true; // assumes that the length of the result sets we get back before the last result set is equal to the pagination limit
    let responseDefined = true; // assumes that the response we get back is not undefined
    while (countEqualsLimit && responseDefined) {
      const employees = [];

      const res = await http.get(
        `/reports${queryString}&page=${page}&limit=${limit}`
      );

      if (res) {
        res.data.data.forEach(employee => {
          employees.push(this.mapToViewModel(employee));
        });

        countEqualsLimit = res.data.data.length === limit;
        page++;

        if (!countEqualsLimit) {
          this.toggleIsProcessing();
        }

        const newState = [...this.state.employees, ...employees];

        this.setState({ employees: newState });
      } else {
        responseDefined = false;
      }
    }
  }

  toggleIsProcessing() {
    this.setState({ isProcessing: !this.state.isProcessing });
  }

  async fetchFromServer(queryString) {
    this.toggleIsProcessing();

    if (this.state.showFilters) {
      this.toggleFilterDraw();
    }
    const employees = [];

    const res = await http.get(`/reports${queryString}`);

    if (res) {
      res.data.data.forEach(employee => {
        employees.push(this.mapToViewModel(employee));
      });

      this.toggleIsProcessing();

      this.setState({ employees });
    }
  }

  async componentDidMount() {
    this.showFiltersIfNoData();
  }

  showFiltersIfNoData() {
    this.setState({ showFilters: !this.state.employees.length });
  }

  toggleFilterDraw() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  mapToViewModel(employee) {
    const { employeeJob, employeeAppointment } = employee;

    const employeeInfo = {
      id: employee.ippisNo,
      firstName: employee.firstName,
      lastName: employee.lastName,
      middleNames: employee.middleNames,
      initials: employee.initials,
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender ? employee.gender.type : null,
      gpz: employee.gpz ? employee.gpz.description : null,
      state: employee.state ? employee.state.state : null,
      senatorialDistrict: employee.senatorialDistrict
        ? employee.senatorialDistrict.name
        : null,
      lga: employee.lga ? employee.lga.lga : null
    };

    if (employee.employeeJob) {
      employeeInfo.department = employeeJob.department
        ? employeeJob.department.description
        : null;
      employeeInfo.district = employeeJob.district
        ? employeeJob.district.siteName
        : null;
      employeeInfo.salaryStructure = employeeJob.salaryStructure
        ? employeeJob.salaryStructure.description
        : null;
    }

    if (employee.employeeAppointment) {
      employeeInfo.resumptionDate = employeeAppointment.resumptionDate;
      employeeInfo.expectedRetirementDate =
        employeeAppointment.expectedRetirementDate;
      employeeInfo.presentJobGrade = employeeAppointment.presentJobGrade
        ? employeeAppointment.presentJobGrade.con
        : null;
      employeeInfo.presentJobTitle = employeeAppointment.presentJobTitle
        ? employeeAppointment.presentJobTitle.description
        : null;
      employeeInfo.presentPositionStep = employeeAppointment.presentPositionStep
        ? employeeAppointment.presentPositionStep.step
        : null;
    }

    return employeeInfo;
  }

  async consumeQueryString(queryString) {
    await this.resetResultAndPagination();
    this.autoFetchFromServer(queryString);
  }

  handleRowClick({ currentTarget, detail }) {
    if (detail > 1) {
      this.props.history.push(`/employees/${currentTarget.id}`);
    }
  }

  handleChange({ currentTarget }) {
    if (currentTarget.value) {
      this.setState({ activeColumnFormat: currentTarget.value });
    }
  }

  render() {
    const {
      employees,
      columns,
      activeColumnFormat,
      showFilters,
      isProcessing
    } = this.state;

    console.log(employees);
    const options = [
      { id: 'formatA', name: 'format a' },
      { id: 'formatB', name: 'format b' },
      { id: 'formatC', name: 'format c' }
    ];

    return (
      <Section
        title="reports"
        // subTitle={
        //   <Fragment>
        //     Go to <Link to="/reports/nominal-rolls">nominal rolls</Link>
        //   </Fragment>
        // }
      >
        {/* <ReportPrintTemplate data={employees} /> */}

        <div className={classes.Reports}>
          <div className={`d-flex ${classes.ReportFilters}`}>
            <div className="format-controller">
              <Select
                label="switch format"
                options={options}
                onChange={this.handleChange}
                selectedOption={activeColumnFormat}
              />
            </div>
            <div className="filter-icon" onClick={this.toggleFilterDraw}>
              <IoMdFunnel />
              <span> filters</span>
            </div>
          </div>

          <GlobalFilters
            showFilters={showFilters}
            queryStringConsumer={this.consumeQueryString}
            isProcessing={isProcessing}
          />

          <div className={`d-flex ${classes.ReportContainer}`}>
            <Table
              columns={columns[activeColumnFormat]}
              data={employees}
              clickHandler={this.handleRowClick}
              enablePrint={true}
            />
          </div>
        </div>
        {isProcessing ? (
          <LightBox>
            <Loader message="generating report" />
          </LightBox>
        ) : null}
      </Section>
    );
  }
}

export default withRouter(Reports);
