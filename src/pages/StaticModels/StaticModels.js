import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosArrowBack }  from 'react-icons/io';
import SimpleTabs from '../../components/SimpleTabs/SimpleTabs';
import Section from '../../hoc/Section/Section';
import classes from './StaticModels.module.scss';

class StaticModels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    render() {
        return (
            <Section title={`${this.state.isActive} static models`}></Section>
        )
    }
}

export default withRouter(StaticModels);


