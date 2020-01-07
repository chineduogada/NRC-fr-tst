import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Cards from '../../components/Cards/Cards';

class Posts extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios.get('/feed')
      .then(d => {
        const { data } = d.data

        console.log(data);

        // set the state of post data
        this.setState({ data });
      })
      .catch(e => console.log(`hello ${e}`));
  }

  render() {
    return (
      <Aux>
        <Cards data={this.state.data} />
      </Aux>
    );
  }
}

export default Posts;
