import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import Searchbox from '../../components/Searchbox/Searchbox';
import Filter from '../../components/Filter/Filter';
import Layout from '../../components/Layout/Layout';
import Section from '../../hoc/Section/Section';
import classes from './Employees.module.css';

export default class Employees extends Component {
  render() {
    return (
      <Layout>
        <section className={classes.Employee}>
          <Section title="employees" />

          <header>
            <div className="d-flex justify-content-end">
              <Button label="add new" fill />
              <Button label="print" />
            </div>
            <div className="d-flex justify-content-between mt-2">
              <Searchbox />

              <Filter />
            </div>
            <Row className={classes.TableHeader}>
              <Col>Name</Col>
              <Col>Department</Col>
              <Col>Job Type</Col>
              <Col>Job Title</Col>
            </Row>
          </header>
          <main></main>
          <footer></footer>
        </section>
      </Layout>
    );
  }
}
