import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Section from '../../hoc/Section/Section';
import Layout from '../../components/Layout/Layout';
import classes from './Home.module.css';

class Home extends Component {
  data = {};

  render() {
    return (
      <Layout>
        {/* Posts */}
        <Section id="posts" title="Dashboard">
          <Section>
            <div className={classes.BasicSummary}>
              <div className={classes.Summary}>No data to render</div>
              <div className={classes.Summary}>No data to render</div>
              <div className={classes.Summary}>No data to render</div>
              <div className={classes.Summary}>No data to render</div>
            </div>
          </Section>
          <Section>
            <div className={classes.MainSummary}>
              <div className={classes.Summary}>
                <header>
                  <h4>Data to review</h4>
                </header>
              </div>

              <div className={classes.Summary}>
                <header>
                  <h4>Recent activities</h4>
                </header>
              </div>
            </div>
          </Section>
        </Section>
      </Layout>
    );
  }
}

export default Home;
