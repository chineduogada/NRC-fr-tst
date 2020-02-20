import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utils';
import Loader from './Loader';

const setup = (props = {}) => {
  const wrapper = shallow(<Loader {...props} />);
  return wrapper;
};

describe('Loader Component', () => {
  describe('With Props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        brand: 'Test Brand'
      };
      wrapper = setup(props);
    });

    it('Should render without errors', () => {
      const component = findByTestAttr(wrapper, 'LoaderContainer');
      expect(component.length).toBe(1);
    });

    it('Should render a Brand', () => {
      const brand = findByTestAttr(wrapper, 'brand');
      expect(brand.length).toBe(1);
    });

    it('Should render a Spinner', () => {
      const spinner = findByTestAttr(wrapper, 'spinner');
      expect(spinner.length).toBe(1);
    });
  });

  describe('Without Props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    it('Should not render a Brand', () => {
      const brand = findByTestAttr(wrapper, 'brand');
      expect(brand.length).toBe(0);
    });
  });
});
