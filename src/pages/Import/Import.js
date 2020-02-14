import React, { Component } from 'react';
import ImportForm from './ImportForm';
import Section from '../../hoc/Section/Section';
import { mapForReactSelect } from '../../helpers/nameMapper';
import ImportDocumentation from './ImportDocumentation';
import classes from './Import.module.scss';

export default class Import extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: null,

      resourceOptions: [
        { id: 'Department', name: 'departments' },
        { id: 'BloodGroup', name: 'blood groups' },
        { id: 'GPZ', name: 'geo political zones' },
        { id: 'RelationshipType', name: 'relationship types' },
        { id: 'TrainingType', name: 'training types' },
        { id: 'State', name: 'states' },
        { id: 'LGA', name: 'local government areas' },
        { id: 'SenatorialDistrict', name: 'senatorial districts' },
        { id: 'District', name: 'districts' },
        { id: 'SalaryStructure', name: 'salary structures' },
        { id: 'JobGrade', name: 'job grades' },
        { id: 'JobTitle', name: 'job titles' },
        { id: 'JobType', name: 'job types' },
        { id: 'PFA', name: 'pension fund administrators' },
        { id: 'Employee', name: 'employee personal details' },
        { id: 'EmployeeJob', name: 'employee job details' },
        { id: 'EmployeeJob', name: 'employees appoinment details' },
        { id: 'Skill', name: 'skills' },
        { id: 'Qualification', name: 'qualifications' },
        { id: 'CareerReasonCode', name: 'career reason codes' },
        { id: 'IncidenceReasonCode', name: 'incidence reason codes' }
      ]
    };

    this.getSelectedResource = this.getSelectedResource.bind(this);
  }

  /** Extracts the current state of a `Form` component */
  async getSelectedResource(component) {
    console.log(component);
    this.setState({ resource: component.resource.value });
  }

  render() {
    const { resourceOptions, resource } = this.state;
    return (
      <Section
        title="import data"
        subTitle="Import data in only three simple steps"
      >
        <div className={classes.StepsToImport}>
          <ol>
            <li>Select a resource you want to import</li>
            <li>Peek into the documentation for that resource</li>
            <li>
              Choose a file from your drive
              <em>
                <small> (.xls, .xlsx or .csv)</small>
              </em>
            </li>
            <li>
              Oh! 4? Hit the <code>IMPORT</code> button
            </li>
          </ol>
        </div>
        <div className={classes.FormWrapper}>
          <ImportForm
            resourceOptions={resourceOptions}
            getSelectedResource={this.getSelectedResource}
          />
        </div>
        <div className={classes.DocWrapper}>
          {resource ? <ImportDocumentation resource={resource} /> : null}
        </div>
      </Section>
    );
  }
}
