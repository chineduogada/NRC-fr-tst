import React from 'react';
import CleanSlate from '../../../components/CleanSlate/CleanSlate';
import Form from '../../../components/Form/Form';
import Table from '../../../components/ReactTable/Table';
import Joi from 'joi-browser';
import Button from '../../../components/Button/Button';
import http from '../../../services/httpService';
import Loader from '../../../components/Loader/Loader';
import Section from '../../../hoc/Section/Section';

export default class EmployeeRelationInfo extends Form {
  state = {
    columns: [
      { accessor: 'serialCode', Header: 'Serial Code' },
      { accessor: 'relationshipTypeId', Header: 'Relationship Type' },
      { accessor: 'surname', Header: 'Surname' },
      { accessor: 'otherNames', Header: 'Other Names' },
      { accessor: 'dateOfBirth', Header: 'DOB' },
      { accessor: 'mobileNumber', Header: 'Mobile Number' },
      { accessor: 'addressLine1', Header: 'Address Line 1' },
      { accessor: 'addressLine2', Header: 'Address Line 2' },
      { accessor: 'addressLine3', Header: 'Address Line 3' },
      { accessor: 'addressLine4', Header: 'Address Line 4' },
      { accessor: 'email', Header: 'Email' },
      { accessor: 'beneficiary', Header: 'Beneficiary' },
      { accessor: 'beneficiaryPercentage', Header: 'Beneficiary Percentage' }
    ],

    formData: {
      relationshipTypeId: '',
      surname: '',
      otherNames: '',
      dateOfBirth: '',
      mobileNumber: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      email: '',
      beneficiary: '',
      beneficiaryPercentage: '',
      serialCode: ''
    },
    errors: {},
    hasRelation: null,
    addRelation: false,
    relations: []
  };

  schema = {
    relationshipTypeId: Joi.string(),
    surname: Joi.string(),
    otherNames: Joi.string(),
    dateOfBirth: Joi.string(),
    mobileNumber: Joi.number(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    addressLine3: Joi.string(),
    addressLine4: Joi.string(),
    email: Joi.string().email(),
    beneficiary: Joi.string(),
    beneficiaryPercentage: Joi.number(),
    serialCode: Joi.number()
  };

  handleSlate = () => {
    const hasRelation = !this.state.hasRelation;

    this.setState({ hasRelation, addRelation: true });
  };

  handleAddRelation = () => {
    const addRelation = !this.state.addRelation;

    this.setState({ addRelation });
  };

  async doSubmit(event) {
    const relations = [this.state.formData, ...this.state.relations];

    event.currentTarget.reset();

    this.setState({ relations });

    const obj = this.state.formData;
    const res = await http.post(`/employees/${this.props.ippisNo}/relations`, [
      { ...obj, ippisNo: this.props.ippisNo }
    ]);

    console.log(res);
  }

  async componentDidMount() {
    const relations = [];
    const res = await http.get(`/employee/${this.props.ippisNo}/relations`);

    if (res) {
      res.data.data.forEach(relation => {
        relations.push(this.mapToViewModel(relation));
      });

      this.setState({ hasRelation: res.data.data.length, relations });
    }
  }

  mapToViewModel = relation => {
    return {
      serialCode: relation.serialCode,
      relationshipTypeId: relation.relationshipType.type,
      surname: relation.surname,
      otherNames: relation.otherNames,
      dateOfBirth: relation.dateOfBirth,
      mobileNumber: relation.mobileNumber,
      addressLine1: relation.addressLine1,
      addressLine2: relation.addressLine2,
      addressLine3: relation.addressLine3,
      addressLine4: relation.addressLine4,
      email: relation.email,
      beneficiary: relation.beneficiary,
      beneficiaryPercentage: relation.beneficiaryPercentage
    };
  };

  render() {
    const { columns, relations, hasRelation, addRelation } = this.state;

    return hasRelation !== null ? (
      hasRelation ? (
        <Section>
          <Button
            style={{ marginLeft: '0.5em' }}
            highlight
            label="add relation"
            onClick={this.handleAddRelation}
          />
          {addRelation ? (
            <header>
              <div className="sect">
                <form onSubmit={this.handleSubmit}>
                  <div>
                    {this.renderSelect(
                      'relationship type',
                      'relationshipTypeId',
                      [
                        { id: '1', name: 'father' },
                        { id: '2', name: 'mother' }
                      ]
                    )}
                    {this.renderInput('surname', 'surname', '')}
                    {this.renderInput('other names', 'otherNames', '')}
                    {this.renderInput(
                      'date of birth',
                      'dateOfBirth',
                      '',
                      null,
                      'date'
                    )}
                    {this.renderInput(
                      'mobile number',
                      'mobileNumber',
                      '',
                      null,
                      'number'
                    )}
                    {this.renderInput('address line 1', 'addressLine1', '')}
                    {this.renderInput('address line 2', 'addressLine2', '')}
                    {this.renderInput('address line 3', 'addressLine3', '')}
                    {this.renderInput('address line 4', 'addressLine4', '')}
                    {this.renderInput('email', 'email', '', null, 'email')}
                    {this.renderSelect('beneficiary', 'beneficiary', [
                      { id: 'Y', name: 'yes' },
                      { id: 'N', name: 'no' }
                    ])}
                    {this.state.formData.beneficiary === 'Y'
                      ? this.renderInput(
                          'beneficiary percentage',
                          'beneficiaryPercentage',
                          'eg: 20',
                          null,
                          'number'
                        )
                      : null}
                    {this.renderInput(
                      'serialCode',
                      'serialCode',
                      '',
                      null,
                      'number'
                    )}
                  </div>
                  {this.renderButton('save')}
                </form>
              </div>
            </header>
          ) : null}

          <main className="sect">
            <Table columns={columns} data={relations} />
          </main>
        </Section>
      ) : (
        <CleanSlate
          onControlSlate={this.handleSlate}
          msg="no relation has been registered for this employee"
          buttonLabel="add relation"
        />
      )
    ) : (
      <Loader />
    );
  }
}
