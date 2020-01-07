import React, {Component} from 'react';
// import classes from './Categories.module.css';
import Section from '../../hoc/Section/Section';
import Tags from '../../components/Tags/Tags';

class Categories extends Component {
  state = {
    categories: [
      'finance',
      'analytics',
      'web development',
      'marketing',
      'research',
      'communication'
    ]
  }

  render() {
    return (
      <Section id='Categories' title='Popular Categories'>
        <Tags tags={this.state.categories}/>
      </Section>
    );
  }
}

export default Categories;
