import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import CleanSlate from '../../../components/CleanSlate/CleanSlate';
import Form from '../../../components/Form/Form';
import InformationBlock from '../../../components/InformationBlock/InformationBlock';
import Table from '../../../components/ReactTable/Table';
import Button from '../../../components/Button/Button';
import httpService from '../../../services/httpService';
import Loader from '../../../components/Loader/Loader';
import Section from '../../../hoc/Section/Section';
import Input from '../../../components/Input/Input';
import nameMapper from '../../../helpers/nameMapper';
import classes from './EmployeeRelation.module.scss';

export default class EmployeeRelationInfo extends Form {
  constructor(props) {
    super(props);

    this.handleBeneficairyPercentChange = this.handleBeneficairyPercentChange.bind(
      this
    );
    this.handleNewBeneficairyPercentChange = this.handleNewBeneficairyPercentChange.bind(
      this
    );
    this.calculateTotalPercentage = this.calculateTotalPercentage.bind(this);
    this.handleAddRelation = this.handleAddRelation.bind(this);
  }

  state = {
    columns: [
      { accessor: 'serialCode', Header: 'Serial Code' },
      { accessor: 'relationshipType', Header: 'Relationship Type' },
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
      beneficiaryPercentage: 0,
      serialCode: ''
    },
    errors: {},
    hasRelation: null,
    addRelation: false,
    relations: [],

    options: {
      relationshipTypes: []
    },

    beneficiaryPercentages: [],

    totalPercentage: 0
  };

  schema = {
    relationshipTypeId: Joi.string(),
    surname: Joi.string(),
    otherNames: Joi.string(),
    dateOfBirth: Joi.string(),
    mobileNumber: Joi.number(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string()
      .allow('')
      .optional(),
    addressLine3: Joi.string()
      .allow('')
      .optional(),
    addressLine4: Joi.string()
      .allow('')
      .optional(),
    email: Joi.string().email(),
    beneficiary: Joi.string(),
    beneficiaryPercentage: Joi.number()
      .allow('')
      .optional(),
    serialCode: Joi.number()
  };

  handleSlate = () => {
    const hasRelation = !this.state.hasRelation;

    this.setState({ hasRelation, addRelation: true });
  };

  async handleAddRelation() {
    const addRelation = !this.state.addRelation;

    await this.setState({ addRelation });

    this.setBeneficiaryPercentages();
    this.calculateTotalPercentage();
  }

  async doSubmit(event) {
    if (Number(this.state.totalPercentage) === 100) {
      const obj = this.state.formData;

      const res = await httpService.post(
        `/employees/${this.props.ippisNo}/relations`,
        [{ ...obj, ippisNo: this.props.ippisNo }]
      );

      if (res) {
        this.stopProcessing();
        toast.success('relation successfully added');
        this.Form.reset();
        this.Form.querySelectorAll('select')[0].focus();
        const relations = [
          this.embedRelationshipType(obj),
          ...this.state.relations
        ];
        this.setState({ relations });
      }
    } else {
      this.stopProcessing();
    }
  }

  async getOptions() {
    const res = await httpService.get('/relationship-types');

    if (res) {
      const options = {};
      options.relationshipTypes = nameMapper(res.data.data, 'type');
      this.setState({ options });
    }
  }

  async componentDidMount() {
    this.getOptions();

    const relations = [];
    const res = await httpService.get(
      `/employees/${this.props.ippisNo}/relations`
    );

    if (res) {
      res.data.data.forEach(relation => {
        relations.push(this.mapToViewModel(relation));
      });

      console.log(relations);

      this.setState({ hasRelation: res.data.data.length, relations });
    }
  }

  mapToViewModel = relation => {
    return {
      id: relation.id,
      serialCode: relation.serialCode,
      relationshipTypeId: relation.relationshipTypeId,
      relationshipType: relation.relationshipType.type,
      surname: relation.surname,
      otherNames: relation.otherNames,
      dateOfBirth: relation.dateOfBirth,
      mobileNumber: relation.mobileNumber,
      addressLine1: relation.addressLine1,
      addressLine2: relation.addressLine2 || 'null',
      addressLine3: relation.addressLine3 || 'null',
      addressLine4: relation.addressLine4 || 'null',
      email: relation.email,
      beneficiary: relation.beneficiary,
      beneficiaryPercentage: relation.beneficiaryPercentage || '0'
    };
  };

  handleNewBeneficairyPercentChange({ currentTarget }) {
    this.setState({
      formData: {
        ...this.state.formData,
        beneficiaryPercentage: currentTarget.value
      }
    });
  }

  setBeneficiaryPercentages() {
    const beneficiaryPercentages = this.state.relations.map(relation => {
      if (relation.beneficiary.toLowerCase() === 'y') {
        return {
          id: relation.id,
          beneficiaryPercentage: relation.beneficiaryPercentage
        };
      }
    });

    this.setState({ beneficiaryPercentages });
  }

  embedRelationshipType(newRelation) {
    const { relationshipTypes } = this.state.options;
    return {
      ...newRelation,
      relationshipType: relationshipTypes.filter(
        type => (type.id = Number(newRelation.relationshipTypeId))
      )[0].type
    };
  }

  calculateTotalPercentage() {
    const beneficiaries = this.state.beneficiaryPercentages;

    let totalPercentage = 0;

    beneficiaries.forEach(
      beneficiary =>
        (totalPercentage += Number(beneficiary.beneficiaryPercentage, 10))
    );

    const { beneficiaryPercentage } = this.state.formData;

    if (beneficiaryPercentage) {
      totalPercentage += Number(beneficiaryPercentage, 10);
    }
    console.log(totalPercentage);

    this.setState({ totalPercentage: totalPercentage });
  }

  handleBeneficairyPercentChange({ currentTarget }) {
    const oldState = [...this.state.beneficiaryPercentages];
    const { id, dataset, value } = currentTarget;

    const updatedBeneficiaryPercentages = oldState.map(beneficiary => {
      console.log(beneficiary, dataset, id, value);
      if (beneficiary.id === Number(dataset.id, 10)) {
        return { ...beneficiary, beneficiaryPercentage: value };
      }

      return beneficiary;
    });

    this.setState({ beneficiaryPercentages: updatedBeneficiaryPercentages });
  }

  renderBeneficiaries() {
    return this.state.relations.map((relation, idx) => {
      if (relation.beneficiary.toLowerCase() === 'y') {
        console.log(relation);
        return (
          <div key={idx} className={`d-flex ${classes.Beneficiary}`}>
            <span>{`${relation.surname} (${relation.serialCode})`}</span>
            <Input
              data-id={relation.id}
              defaultValue={relation.beneficiaryPercentage}
              onChange={this.handleBeneficairyPercentChange}
              onKeyUp={this.calculateTotalPercentage}
            />
          </div>
        );
      }
    });
  }

  renderForm() {
    const { options } = this.state;

    return (
      <div className={classes.Form}>
        <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
          <InformationBlock>
            {this.renderSelect(
              'relationship type',
              'relationshipTypeId',
              options.relationshipTypes
            )}
            {this.renderInput('surname', 'surname', '')}
            {this.renderInput('other names', 'otherNames', '')}
            {this.renderInput('date of birth', 'dateOfBirth', '', null, 'date')}
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
            {this.renderInput('serialCode', 'serialCode', '', null, 'number')}
            {this.renderSelect('beneficiary', 'beneficiary', [
              { id: 'Y', name: 'yes' },
              { id: 'N', name: 'no' }
            ])}
          </InformationBlock>

          {this.state.formData.beneficiary === 'Y' ? (
            <div className={classes.Beneficiaries}>
              <p>Beneficiary Percentages</p>

              {this.renderBeneficiaries()}

              <div className={`d-flex ${classes.Beneficiary}`}>
                <span>{this.state.formData.surname || 'New beneficiary'}</span>
                <Input
                  onChange={this.handleNewBeneficairyPercentChange}
                  onKeyUp={this.calculateTotalPercentage}
                  placeholder="Ex.: 10, 15.5, 6"
                  name="beneficiaryPercentage"
                  error={
                    this.state.formData.beneficiaryPercentage
                      ? ''
                      : 'field cannot be empty'
                  }
                />
              </div>

              <div className={`d-flex ${classes.Beneficiary}`}>
                <span>Total</span>
                <Input
                  value={this.state.totalPercentage}
                  onChange={() => null}
                  disabled
                  error={
                    Number(this.state.totalPercentage, 10) !== 100
                      ? 'Total must be 100%'
                      : ''
                  }
                />
              </div>
            </div>
          ) : null}
          {this.renderButton('save')}
        </form>
      </div>
    );
  }

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
          {addRelation ? this.renderForm() : null}

          <main className="sect">
            <Table columns={columns} data={relations} />
          </main>
        </Section>
      ) : (
        <CleanSlate
          onSlateButtonClick={this.handleSlate}
          msg="no relation has been registered for this employee"
          buttonLabel="add relation"
        />
      )
    ) : (
      <Loader />
    );
  }
}
