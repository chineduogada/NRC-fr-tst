/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import classes from './SimpleTabs.module.scss';
import Section from '../../hoc/Section/Section';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabsAndControls: []
    };

    this.tabsAndControls = [
      { name: 'districts', component: <p>tab 1</p> },
      { name: 'departments', component: <p>tab 2</p> },
      { name: 'pension fund administrators', component: <p>tab 3</p> }
    ];

    this.handleTabControlClick = this.handleTabControlClick.bind(this);
  }

  componentDidMount() {
    this.setState({ tabsAndControls: this.props.tabsAndControls })
  }

  switchActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  handleTabControlClick({ currentTarget }) {
    console.log(currentTarget.id * 1);
    this.switchActiveTab(currentTarget.id * 1);
  }

  shouldAssignActive(index) {
    return this.state.activeTab === index ? classes.Active : null;
  }

  renderTabControls() {
    return (
      <ul className={classes.TabControls}>
        {this.tabsAndControls.map((control, i) => {
          return (
            <li
              id={i}
              key={i}
              className={`${classes.TabControl} ${this.shouldAssignActive(i)}`}
              onClick={this.handleTabControlClick}
            >
              {control.name}
            </li>
          );
        })}
      </ul>
    );
  }

  renderTabs() {
    return (
      <div className={classes.Tabs}>
        {this.tabsAndControls.map((tab, i) => {
          if (this.state.activeTab === i) {
            return (
              <div className={`${classes.Tab} ${this.shouldAssignActive(i)}`}>
                {tab.component}
              </div>
            );
          }
        })}
      </div>
    );
  }

  render() {
    return (
      <Section title='settings'>
        <div className={classes.TabSystem}>
          {this.renderTabControls()}
          {this.renderTabs()}
        </div>
      </Section>
    );
  }
}
