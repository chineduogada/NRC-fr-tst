import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosArrowBack, IoIosLink } from 'react-icons/io';
import { Link } from 'react-router-dom';
import SimpleTabs from '../../components/SimpleTabs/SimpleTabs';
import Section from '../../hoc/Section/Section';
import classes from './StaticModels.module.scss';

class StaticModels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };

    this.models = [{ name: 'districts', url: 'districts' }];
  }

  renderModels() {
    return (
      <ul className={classes.Models}>
        {this.models.map((model, i) => {
          return (
            <li key={i} className={classes.Model}>
              <Link to={`/settings/static-models/${model.url}`}>
                {model.name}
                <IoIosLink className={classes.LinkIcon} />
              </Link>
              <p className={classes.ModelDescription}>
                Add and modify {model.name}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <Section title={`${this.state.isActive} static models`}>
        <br />
        {this.renderModels()}
      </Section>
    );
  }
}

export default withRouter(StaticModels);
