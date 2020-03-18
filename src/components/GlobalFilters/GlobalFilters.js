import React, { Component, Fragment } from 'react';
import DropDrawal from '../DropDrawal/DropDrawal';
import httpService from '../../services/httpService';
import { mapForReactSelect } from '../../helpers/nameMapper';
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
        jobGrade: [],
        steps: []
      },

      queryString: '',

      showDrawal: false,
      formDataIsRequested: false,
      isProcessing: false,
      resetForm: false
    };

    this.toggleDrawal = this.toggleDrawal.bind(this);
    this.extractFormData = this.extractFormData.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
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
      jobGrades,
      steps
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
      httpService.get('/job-grades'),
      httpService.get('/steps')
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
        jobGrade: mapForReactSelect(jobGrades.data.data, 'con'),
        step: mapForReactSelect(steps.data.data, 'step')
      };

      this.setState({
        options
      });
    }
  }

  componentDidMount() {
    this.getOptions();
  }

  toggleResetForm() {
    this.setState({ resetForm: !this.state.resetForm });
  }

  handleFormReset() {
    this.toggleResetForm();

    setTimeout(() => this.toggleResetForm, 1000);
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
    const { options, formDataIsRequested, resetForm } = this.state;
    const { isProcessing } = this.props;

    return (
      <div className={classes.GlobalFilters}>
        <DropDrawal
          showDrawal={this.props.showFilters}
          title="Filter Result"
          footer={
            <Fragment>
              <Button
                label="clear filters"
                plain
                onClick={isProcessing ? null : this.handleFormReset}
                disabled={isProcessing}
              />
              <Button
                label="Apply Filter"
                fill
                onClick={isProcessing ? null : this.applyFilter}
                disabled={isProcessing}
              />
            </Fragment>
          }
        >
          <div className={classes.GlobalFilters_Inner}>
            <FilterForm
              options={options}
              formDataIsResquested={formDataIsRequested}
              formDataConsumer={this.extractFormData}
              // resetForm={resetForm}
            />
          </div>
        </DropDrawal>
      </div>
    );
  }
}
