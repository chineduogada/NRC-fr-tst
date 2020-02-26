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
import Modal from '../../../components/Modal/Modal';
import nameMapper from '../../../helpers/nameMapper';
import objectKeyEliminator from '../../../helpers/obJectKeyEliminator';
import classes from './EmployeeRelation.module.scss';

export default class EmployeeRelationInfo extends Form {
  constructor(props) {
    super(props);

    this.state = {
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
        beneficiaryPercentage: '',
        serialCode: ''
      },
      errors: {},
      hasRelation: null,
      addRelation: false,
      relations: [],

      activeRelation: {},

      options: {
        relationshipTypes: []
      },

      beneficiaryPercentages: [],

      totalPercentage: 0,

      beneficiaries: [],

      showModal: false,

      isDeleteting: false
    };

    this.initialFormState = { ...this.state.formData };

    this.handleBeneficairyPercentChange = this.handleBeneficairyPercentChange.bind(
      this
    );
    this.handleNewBeneficairyPercentChange = this.handleNewBeneficairyPercentChange.bind(
      this
    );
    this.calculateTotalPercentage = this.calculateTotalPercentage.bind(this);
    this.handleAddRelation = this.handleAddRelation.bind(this);
    this.handleBeneficiaryStatusChange = this.handleBeneficiaryStatusChange.bind(
      this
    );

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.preprocessRelationRemoval = this.preprocessRelationRemoval.bind(this);
  }

  schema = {
    relationshipTypeId: Joi.number(),
    surname: Joi.string(),
    otherNames: Joi.string(),
    dateOfBirth: Joi.string(),
    mobileNumber: Joi.number()
      .allow('')
      .optional(),
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
    const { addRelation, activeRelation } = this.state;

    await this.setState({ addRelation: !addRelation });

    this.resetBeneficiaryPercentages();
    this.resetForm();

    if (!addRelation) {
      this.setBeneficiaryPercentages();
      this.calculateTotalPercentage();
    }

    if (activeRelation) {
      this.resetActiveRelationState();
    }
  }

  async handleRowClick(event) {
    const { currentTarget } = event;

    if (!Number(currentTarget.id, 10)) return;

    if (event.detail === 1) {
      this.setState({ addRelation: true });
      await this.resetActiveRelationState();
      await this.resetForm();
      await this.setState({ beneficiaryPercentages: [] });
      await this.setActiveRelation(Number(currentTarget.id, 10));
      await this.fillFormWithActiveRelation();
      await this.setBeneficiaryPercentages();

      this.calculateTotalPercentage();
    }
  }

  resetForm() {
    this.setState({ formData: this.initialFormState });
  }

  fillFormWithActiveRelation() {
    this.setState({
      formData: objectKeyEliminator(this.state.activeRelation, [
        'id',
        'relationshipType'
      ])
    });
  }

  setActiveRelation(id) {
    const activeRelation = this.state.relations.filter(
      relation => relation.id === id
    )[0];
    this.setState({ activeRelation });
  }

  resetActiveRelationState() {
    this.setState({ activeRelation: {} });
  }

  handleBeneficiaryStatusChange({ beneficiary }) {
    if (
      beneficiary.value.toLowerCase() !== 'y' &&
      !this.state.activeRelation.id
    ) {
      this.resetBeneficiaryPercentages();
    }
  }

  resetBeneficiaryPercentages() {
    setTimeout(() => {
      this.resetPercentageOfCurrentRelation();
      this.setBeneficiaryPercentages();
      this.calculateTotalPercentage();
    }, 100);
  }

  resetPercentageOfCurrentRelation() {
    // const { activeRelation } = this.state;
    const formData = { ...this.state.formData };

    formData.beneficiaryPercentage = '';

    this.setState({ formData });
  }

  async handleDelete() {
    const { activeRelation, beneficiaryPercentages } = this.state;
    this.setState({ isDeleteting: true });

    if (activeRelation.beneficiary === 'N') {
      const res = httpService.delete(
        `/employee-relations/${activeRelation.id}`,
        {
          data: beneficiaryPercentages
        }
      );

      if (res) {
        this.resetForm();
        this.Form.reset();
        this.fetchRelations();
        this.hideModal();
        this.resetActiveRelationState();
        toast.success('Relation successfully removed');
        this.setState({ addRelation: false, isDeleteting: false });
      } else {
        this.stopProcessing();
        this.setState({ isDeleteting: false });
      }
    }
  }

  isRelationIsBeneficiary() {
    return this.state.activeRelation.beneficiary === 'Y';
  }

  runShowModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  preprocessRelationRemoval() {
    this.runShowModal();
  }

  async updateRelation(formData) {
    const { activeRelation } = this.state;
    if (activeRelation.id) {
      const res = await httpService.put(
        `/employee-relations/${activeRelation.id}`,
        {
          ...formData,
          ippisNo: this.props.ippisNo,
          beneficiaries: this.state.beneficiaryPercentages
        }
      );

      if (res) {
        this.stopProcessing();
        // this.resetForm();
        // this.Form.reset();
        this.fetchRelations();
        toast.success('relation successfully added');
        // this.setState({ addRelation: false });
      } else {
        this.stopProcessing();
      }
    }
  }

  async createRelation(formData) {
    if (!this.state.activeRelation.id) {
      const res = await httpService.post(
        `/employees/${this.props.ippisNo}/relations`,
        {
          ...formData,
          ippisNo: this.props.ippisNo,
          beneficiaries: this.state.beneficiaryPercentages
        }
      );

      if (res) {
        this.stopProcessing();
        toast.success('relation successfully added');
        this.resetForm();
        this.Form.reset();
        this.Form.querySelectorAll('select')[0].focus();
        const relations = [
          this.embedRelationshipType(formData),
          ...this.state.relations
        ];
        this.setState({ relations });
        this.fetchRelations();
      } else {
        this.stopProcessing();
      }
    }
  }

  async doSubmit(event) {
    const { totalPercentage, formData } = this.state;

    if (Number(totalPercentage) === 100 || formData.beneficiary === 'N') {
      this.createRelation(formData);
      this.updateRelation(formData);
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

  async fetchRelations() {
    const relations = [];
    const res = await httpService.get(
      `/employees/${this.props.ippisNo}/relations`
    );

    if (res) {
      res.data.data.forEach(relation => {
        relations.push(this.mapToViewModel(relation));
      });

      this.setState({ hasRelation: res.data.data.length, relations });
    }
  }

  componentDidMount() {
    this.getOptions();
    this.fetchRelations();
  }

  mapToViewModel = relation => {
    return {
      id: relation.id,
      serialCode: relation.serialCode,
      relationshipTypeId: relation.relationshipTypeId,
      relationshipType: relation.relationshipType
        ? relation.relationshipType.type
        : '',
      surname: relation.surname,
      otherNames: relation.otherNames,
      dateOfBirth: relation.dateOfBirth,
      mobileNumber: relation.mobileNumber,
      addressLine1: relation.addressLine1,
      addressLine2: relation.addressLine2 || '',
      addressLine3: relation.addressLine3 || '',
      addressLine4: relation.addressLine4 || '',
      email: relation.email || '',
      beneficiary: relation.beneficiary,
      beneficiaryPercentage: relation.beneficiaryPercentage || ''
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
    const { activeRelation } = this.state;

    const beneficiaryPercentages = this.state.relations.filter(
      relation =>
        (relation.beneficiaryPercentage && relation.id !== activeRelation.id) ||
        (relation.beneficiary.toLowerCase() === 'y' &&
          relation.id !== activeRelation.id)
    );

    this.setState({ beneficiaryPercentages });
  }

  embedRelationshipType(newRelation) {
    const { relationshipTypes } = this.state.options;

    const relationshipType = relationshipTypes.filter(
      type => type.id === Number(newRelation.relationshipTypeId)
    );

    return {
      ...newRelation,
      relationshipType: relationshipTypes.filter(
        type => type.id === Number(newRelation.relationshipTypeId)
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

    this.setState({ totalPercentage: totalPercentage });
  }

  handleBeneficairyPercentChange({ currentTarget }) {
    const oldState = [...this.state.beneficiaryPercentages];
    const { dataset, value } = currentTarget;

    const updatedBeneficiaryPercentages = oldState.map(beneficiary => {
      if (beneficiary.id === Number(dataset.id, 10)) {
        return { ...beneficiary, beneficiaryPercentage: value };
      }

      return beneficiary;
    });

    this.setState({ beneficiaryPercentages: updatedBeneficiaryPercentages });
  }

  renderBeneficiaries() {
    console.log(this.state.beneficiaryPercentages);

    return this.state.beneficiaryPercentages.map((relation, idx) => {
      return (
        <div key={idx} className={`d-flex ${classes.Beneficiary}`}>
          <span>{`${relation.surname} ${relation.otherNames} (${relation.serialCode})`}</span>
          <Input
            data-id={relation.id}
            defaultValue={relation.beneficiaryPercentage}
            onChange={this.handleBeneficairyPercentChange}
            onKeyUp={this.calculateTotalPercentage}
          />
        </div>
      );
    });
  }

  cannotMakeNoBeneficiary() {
    const { formData, activeRelation, totalPercentage } = this.state;
    return (
      (formData.beneficiary === 'Y' &&
        activeRelation.id &&
        formData.beneficiaryPercentage !== '' &&
        Number(totalPercentage, 10) === 100) ||
      (Number(totalPercentage, 10) !== 100 &&
        formData.beneficiaryPercentage !== '') ||
      (formData.beneficiaryPercentage !== '' &&
        formData.beneficiary === 'Y' &&
        Number(totalPercentage, 10) !== 100)
    );

    // return false;
  }

  renderForm() {
    const {
      options,
      formData,
      activeRelation,
      addRelation,
      totalPercentage
    } = this.state;

    return (
      <div className={classes.Form}>
        {activeRelation.id ? (
          <div className={`${classes.Actions} ${classes.Right}`}>
            <br />
            <Button
              style={{ marginLeft: '0.5em' }}
              danger
              label={'remove relation'}
              onClick={this.preprocessRelationRemoval}
            />
          </div>
        ) : null}

        <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
          <InformationBlock>
            {this.renderSelect(
              'relationship type',
              'relationshipTypeId',
              options.relationshipTypes,
              null,
              null,
              formData.relationshipTypeId
            )}
            {this.renderInput('surname', 'surname', '', formData.surname)}
            {this.renderInput(
              'other names',
              'otherNames',
              '',
              formData.otherNames
            )}
            {this.renderInput(
              'date of birth',
              'dateOfBirth',
              '',
              formData.dateOfBirth,
              'date'
            )}
            {this.renderInput(
              'mobile number',
              'mobileNumber',
              '',
              formData.mobileNumber,
              'number'
            )}
            {this.renderInput(
              'address line 1',
              'addressLine1',
              '',
              formData.addressLine1
            )}
            {this.renderInput(
              'address line 2',
              'addressLine2',
              '',
              formData.addressLine2
            )}
            {this.renderInput(
              'address line 3',
              'addressLine3',
              '',
              formData.addressLine3
            )}
            {this.renderInput(
              'address line 4',
              'addressLine4',
              '',
              formData.addressLine4
            )}
            {this.renderInput('email', 'email', '', formData.email, 'email')}
            {this.renderInput(
              'serialCode',
              'serialCode',
              '',
              formData.serialCode,
              'number'
            )}
            {this.renderSelect(
              'beneficiary',
              'beneficiary',
              [
                { id: 'Y', name: 'yes' },
                { id: 'N', name: 'no' }
              ],
              this.handleBeneficiaryStatusChange,
              this.cannotMakeNoBeneficiary(),
              formData.beneficiary
            )}
          </InformationBlock>

          {this.state.formData.beneficiary === 'Y' ? (
            <div className={classes.Beneficiaries}>
              <p>
                Beneficiary Percentages{' '}
                {console.log(this.cannotMakeNoBeneficiary())}
              </p>

              {this.renderBeneficiaries()}

              <div className={`d-flex ${classes.Beneficiary}`}>
                <span>
                  {formData.surname
                    ? `${formData.surname} ${formData.otherNames}`
                    : 'New beneficiary'}
                </span>
                <Input
                  onChange={this.handleNewBeneficairyPercentChange}
                  value={this.state.formData.beneficiaryPercentage}
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
          {this.renderButton(activeRelation.id ? 'save' : 'update')}
        </form>
      </div>
    );
  }

  removalPrompt() {
    return (
      <>
        <p>This operation can not be reversed. Proceed?</p>
        <div className={`${classes.Actions} ${classes.Right}`}>
          <Button
            label="proceed"
            danger
            onClick={this.handleDelete}
            disabled={this.state.isDeleteting}
          />
        </div>
      </>
    );
  }

  render() {
    const {
      columns,
      relations,
      hasRelation,
      addRelation,
      showModal,
      formData,
      activeRelation
    } = this.state;

    return hasRelation !== null ? (
      hasRelation ? (
        <Section>
          <Button
            style={{ marginLeft: '0.5em' }}
            highlight
            label={addRelation ? 'cancel' : 'add relation'}
            onClick={this.handleAddRelation}
          />
          {addRelation ? this.renderForm() : null}

          <main className="sect">
            <Table
              columns={columns}
              data={relations}
              clickHandler={this.handleRowClick}
            />
          </main>

          <Modal
            title="delete record"
            openModal={showModal}
            onClose={() => this.hideModal()}
          >
            {activeRelation.beneficiary === 'Y' ? (
              <p>
                This relation is a beneficiary! You must make a relation a
                non-beneficairy before deletion.
              </p>
            ) : (
              this.removalPrompt()
            )}
          </Modal>
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
