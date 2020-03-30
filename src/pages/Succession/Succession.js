import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import SuccessionForm from './SuccessionForm';
import Loader from '../../components/Loader/Loader';
import nameMapper from '../../helpers/nameMapper';

class Succession extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,
      dataMappedForUpdateForm: {
        departmentId: '',
        sectionId: '',
        jobTitleId: '',
        employeeCount: '',
        reportTo: '',
        basicQualId: '',
        basicSkillId: '',
        basicTrainingId: '',
        yearsOfExp: '',
        otherQualifications: [],
        otherSkills: [],
        otherTrainings: [],
        otherRequirement: '',
        otherRequirement1: '',
        otherRequirement2: ''
      },
      options: {}
    };
  }

  async fetchOptionsFromServer() {
    const [
      skills,
      qualifications,
      trainingTypes,
      jobTitles,
      departments,
      sections
    ] = await httpService.all([
      httpService.get('/skills?statusId=1'),
      httpService.get('/qualifications?statusId=1'),
      httpService.get('/training-types?statusId=1'),
      httpService.get('/job-titles?statusId=1'),
      httpService.get('/departments?statusId=1'),
      httpService.get('/sections?statusId=1')
    ]);

    const options = {};

    if (skills) {
      options.skills = skills.data.data;
      options.qualifications = qualifications.data.data;
      options.trainings = trainingTypes.data.data;
      options.jobTitles = jobTitles.data.data;
      options.departments = departments.data.data;
      options.sections = sections.data.data;

      this.setState({ options });
    }
  }

  async componentDidMount() {
    await this.fetchOptionsFromServer();
    const res = await httpService.get(`/successions/${this.id}`);

    // console.log(res);

    if (res) {
      this.setState({
        dataMappedForUpdateForm: res.data.data,
        actualData: res.data.data
      });
    }
  }

  render() {
    return this.state.actualData ? (
      <SuccessionForm
        title="succession"
        data={this.state.dataMappedForUpdateForm}
        options={this.state.options}
      />
    ) : (
      <Loader />
    );
  }
}

export default withRouter(Succession);
