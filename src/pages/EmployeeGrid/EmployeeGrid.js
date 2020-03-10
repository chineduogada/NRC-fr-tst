import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdFunnel, IoMdSearch } from 'react-icons/io';
import { Row, Col } from 'react-bootstrap';
import http from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import GlobalFilters from '../../components/GlobalFilters/GlobalFilters';
import Loader from '../../components/Loader/Loader';
import Input from '../../components/Input/Input';
import NotFound from '../../components/NotFound/NotFound';
import FaceCard from '../../components/Cards/FaceCard/FaceCard';
import formats from './formats';
import classes from './EmployeeGrid.module.scss';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      activeColumnFormat: 'formatA',
      columns: formats,
      showFilters: false,
      isProcessing: false,
      page: 1,
      limit: 20
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleFilterDraw = this.toggleFilterDraw.bind(this);
    this.consumeQueryString = this.consumeQueryString.bind(this);
  }

  async autoFetchFromServer(queryString) {
    const limit = 100;
    let page = 1;
    let countEqualLimit = true; // assumes that the length of the result sets we get back before the last result set is equal to the pagination limit
    let responseDefined = true; // assumes that the response we get back is not undefined
    while (countEqualLimit && responseDefined) {
      const employees = [];

      const res = await http.get(
        `/reports${queryString}&page=${page}&limit=${limit}`
      );

      if (res) {
        res.data.data.forEach(employee => {
          employees.push(this.mapToViewModel(employee));
        });

        countEqualLimit = res.data.data.length === limit;
        page++;

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

  async fetchFromServer(queryString = '?') {
    const { page, limit, showFilters } = this.state;

    this.toggleIsProcessing();
    if (showFilters) {
      this.toggleFilterDraw();
    }
    const employees = [];

    const res = await http.get(
      `/reports${queryString}&page=${page}&limit=${limit}`
    );

    if (res) {
      res.data.data.forEach(employee => {
        employees.push(this.mapToViewModel(employee));
      });

      this.toggleIsProcessing();

      this.setState({
        employees: [...this.state.employees, ...employees],
        page: page + 1
      });
    }
  }

  async componentDidMount() {
    this.fetchFromServer();
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

      employeeInfo.employeeStatus = employeeJob.employeeStatus
        ? employeeJob.employeeStatus.description
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

  consumeQueryString(queryString) {
    this.setState({ employees: [] });

    this.fetchFromServer(queryString);
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

  renderResults(results = []) {
    return results.map(result => {
      return (
        <Col sm={6} md={4} lg={3}>
          <FaceCard data={result} />
        </Col>
      );
    });
  }

  render() {
    const { employees, showFilters, isProcessing } = this.state;

    console.log(employees);
    const options = [
      { id: 'formatA', name: 'format a' },
      { id: 'formatB', name: 'format b' },
      { id: 'formatC', name: 'format c' }
    ];

    return (
      <Section>
        <div className={classes.EmployeeGrid}>
          <div className={classes.ReportFilters}>
            <div className={`d-flex ${classes.ReportFilters_Inner}`}>
              <div className={classes.Search}>
                <IoMdSearch className={classes.SearchIcon} />
                <Input
                  options={options}
                  onChange={this.handleChange}
                  placeholder="search first name, last name or middle name"
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
          </div>

          <div className={`d-flex ${classes.ReportContainer}`}>
            <div>
              <Row className={classes.Grid}>
                {this.renderResults(employees)}
              </Row>
              <div className={classes.LoaderArea}>
                {isProcessing ? (
                  <Loader />
                ) : employees.length ? null : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}

export default withRouter(Reports);
