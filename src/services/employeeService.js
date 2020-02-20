import React, { Component } from 'react';
import httpService from './httpService';
import { Spinner } from '../components/Loader/Loader';
import imgTemp from '../assets/images/generic-avatar.jpg';

/**
 * Checks if an IPPIS number exists and returns the user's profile.
 * Otherwise, returns undefined
 * @param { Number } ippisNo
 */
export const verifyIPPIS = async ippisNo => {
  const res = await httpService.get(`/employee?ippisNo=${ippisNo}`);
  console.log(res.data.data);
  return res.data.data[0];
};

export const mapEmployeeStatus = status => {
  status = `${status}`.toLocaleLowerCase();
  let result;

  switch (status) {
    case 'a':
      result = 'active';
      break;
    case 's':
      result = 'suspended';
      break;
    case 'r':
      result = 'retired';
      break;
    default:
      result = undefined;
  }

  return result;
};

/**
 * Takes the employee's image source and wraps it in a component
 * @param { string } imageSource the employee's image source
 * @returns a JSX element
 */
export class GetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: undefined
    };
  }

  style = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  };

  componentDidMount() {
    this.setState({ imageSource: this.props.imageSource });
  }

  render() {
    const { imageSource } = this.state;
    console.log('checking out image source', imageSource);
    return (
      <>
        {imageSource === undefined ? (
          <Spinner />
        ) : (
          <img
            style={this.style}
            src={imageSource ? `${imageSource}` : imgTemp}
            alt="employee"
          />
        )}
      </>
    );
  }
}
