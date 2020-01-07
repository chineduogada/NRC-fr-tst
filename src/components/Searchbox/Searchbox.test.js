import React from "react";
import { shallow } from "enzyme";
import Searchbox from "./Searchbox";

const setup = (props = {}) => {
	const component = shallow(<Searchbox {...props} />);
	return component;
};

const findByTestAttr = (wrapper, attr) => {
	const component = wrapper.find(`[data-test='${attr}']`);
	return component;
};

describe("Searchbox Component", () => {
	let wrapper;
	beforeEach(() => {
		const props = {};
		wrapper = setup(props);
	});

	it("Should render an Input-field", () => {
		const field = findByTestAttr(wrapper, "field");
		expect(field.length).toBe(1);
	});
});
