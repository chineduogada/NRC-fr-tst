import React, { Component } from 'react';
import ImportForm from './ImportForm';
import Section from '../../hoc/Section/Section';
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
        { id: 'Employee', name: 'employees' }
      ]
    };

    this.getSelectedResource = this.getSelectedResource.bind(this);
  }

  /** Extracts the current state of a `Form` component */
  async getSelectedResource(component) {
    this.setState({ resource: component.resource.value });
  }

  render() {
    const { resourceOptions, resource } = this.state;
    return (
      <Section
        title='import data'
        subTitle='Import data in only three simple steps'
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
