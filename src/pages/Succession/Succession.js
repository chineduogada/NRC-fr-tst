import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import SuccessionForm from '../AllSuccessions/SuccessionForm';

class Succession extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      actualData: null,
      dataMappedForUpdateForm: {
        departmentId: '1',
        sectionId: '2',
        jobTitleId: '3',
        employeeCount: '1',
        reportTo: '94321',
        basicQualificationId: '2',
        basicSkillId: '1',
        basicTraining: '1',
        yearsOfExp: '3',
        otherQualifications: [2, 3],
        otherSkills: [1],
        otherTrainings: [2],
        otherRequirement: '',
        otherRequirement1: '',
        otherRequirement2: ''
      }
    };
  }

  async componentDidMount() {
    const res = await httpService.get(`/successions/${this.props.id}`);

    console.log(res);

    if (res) {
      this.setState({ actualData: res.data.data });
    }
  }

  render() {
    return (
      <SuccessionForm
        title='succession'
        data={this.state.dataMappedForUpdateForm}
      />
    );
  }
}

export default withRouter(Succession);
