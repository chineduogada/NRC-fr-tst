import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

export default class extends Component {
  render() {
    const { ComponentToPrint, trigger, data } = this.props;

    console.log(data);

    return (
      <div style={{ display: 'inline', marginRight: '0.5em' }}>
        <ReactToPrint
          trigger={() => trigger || <a href="hello">Print this out!</a>}
          content={() => this.componentRef}
        />
        <div style={{ display: 'none' }}>
          <ComponentToPrint data={data} ref={el => (this.componentRef = el)} />
        </div>
      </div>
    );
  }
}
