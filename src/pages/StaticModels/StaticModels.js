import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdArrowRoundBack, IoIosLink } from 'react-icons/io';
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

    this.models = [
      { name: 'districts', url: 'districts' },
      // { name: 'sections', url: 'sections' },
      { name: 'pension fund administrators', url: 'pfa' },
      { name: 'job types', url: 'job-types' },
      { name: 'job titles', url: 'job-titles' },
      { name: 'training types', url: 'training-types' },
      { name: 'skills', url: 'skills' },
      { name: 'qualifications', url: 'qualifications' },
      { name: 'career reason codes', url: 'career-reason-codes' },
      { name: 'incidence reason codes', url: 'incidence-reason-codes' },
    ];
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

              {i < this.models.length - 1 ? <hr /> : null}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <Section
        title={
          <span>
            <Link
              style={{ marginRight: '0.5em' }}
              className='link secondary'
              to='/settings'
            >
              <IoMdArrowRoundBack className='icon' />
            </Link>
            <span>static models</span>
          </span>
        }
      >
        <br />
        {this.renderModels()}
      </Section>
    );
  }
}

export default withRouter(StaticModels);
