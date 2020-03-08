import React, { Component } from 'react';
import DropDrawal from '../DropDrawal/DropDrawal';
import httpService from '../../services/httpService';
import nameMapper, { mapForReactSelect } from '../../helpers/nameMapper';
import transformToQueryString from '../../helpers/transformToQueryString';
import FilterForm from './FilterForm';
import Button from '../Button/Button';
import classes from './GlobalFilters.module.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        gpz: [],
        senatorialDistrict: [],
        state: [],
        lga: [],
        gender: [],
        department: [],
        district: [],
        salaryStructure: [],
        employeeStatus: [],
        jobType: [],
        jobTitle: [],
        jobGrade: []
      },

      queryString: '',

      showDrawal: false,
      formDataIsRequested: false,
      isProcessing: false
    };

    this.toggleDrawal = this.toggleDrawal.bind(this);
    this.extractFormData = this.extractFormData.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  toggleDrawal() {
    this.setState({ showDrawal: !this.state.showDrawal });
  }

  async getOptions() {
    const [
      gpz,
      senatorialDistricts,
      states,
      lga,
      genders,
      departments,
      districts,
      salaryStructures,
      employeeStatuses,
      jobTitles,
      jobTypes,
      jobGrades
    ] = await httpService.all([
      httpService.get('/gpz'),
      httpService.get('/senatorial-districts'),
      httpService.get('/states'),
      httpService.get('/lga'),
      httpService.get('/genders'),
      httpService.get('/departments'),
      httpService.get('/districts'),
      httpService.get('/salary-structures'),
      httpService.get('/employee-statuses'),
      httpService.get('/job-titles'),
      httpService.get('/job-types'),
      httpService.get('/job-grades')
    ]);

    if (gpz) {
      const options = {
        gpz: mapForReactSelect(gpz.data.data, 'description'),
        lga: mapForReactSelect(lga.data.data, 'lga'),
        senatorialDistrict: mapForReactSelect(
          senatorialDistricts.data.data,
          'name'
        ),
        state: mapForReactSelect(states.data.data, 'state'),
        gender: mapForReactSelect(genders.data.data, 'type'),
        department: mapForReactSelect(departments.data.data, 'description'),
        district: mapForReactSelect(districts.data.data, 'siteName'),
        salaryStructure: mapForReactSelect(
          salaryStructures.data.data,
          'description'
        ),
        employeeStatus: mapForReactSelect(
          employeeStatuses.data.data,
          'description'
        ),
        jobTitle: mapForReactSelect(jobTitles.data.data, 'description'),
        jobType: mapForReactSelect(jobTypes.data.data, 'type'),
        jobGrade: mapForReactSelect(jobGrades.data.data, 'con')
      };

      this.setState({
        options
      });
    }
  }

  componentDidMount() {
    this.getOptions();
  }

  exposeQueryString(queryString) {
    const { queryStringConsumer } = this.props;
    if (queryStringConsumer) {
      queryStringConsumer(queryString);
    }
  }

  extractFormData(formData) {
    console.log(formData);
    const queryString = transformToQueryString(formData);
    console.log(queryString);
    this.exposeQueryString(queryString);
    this.toggleRequestForFormData();
  }

  toggleRequestForFormData() {
    this.setState({ formDataIsRequested: !this.state.formDataIsRequested });
  }

  applyFilter() {
    this.toggleRequestForFormData();
  }

  render() {
    const { options, formDataIsRequested } = this.state;
    const { isProcessing } = this.props;

    return (
      <div className={classes.GlobalFilters}>
        <DropDrawal
          showDrawal={this.props.showFilters}
          title="Filter Result"
          footer={
            <Button
              label="Apply Filter"
              fill
              block
              fullwidth
              onClick={isProcessing ? null : this.applyFilter}
              disabled={isProcessing}
            />
          }
        >
          <div className={classes.GlobalFilters_Inner}>
            <FilterForm
              options={options}
              formDataIsResquested={formDataIsRequested}
              formDataConsumer={this.extractFormData}
            />
          </div>
        </DropDrawal>
      </div>
    );
  }
}
