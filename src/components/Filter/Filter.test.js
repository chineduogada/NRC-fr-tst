import React from "react";
import { shallow } from "enzyme";
import Filter from "./Filter";

const setup = (props = {}) => {
	const component = shallow(<Filter {...props} />);
	return component;
};

const findByTestAttr = (wrapper, attr) => {
	const component = wrapper.find(`[data-test='${attr}']`);
	return component;
};

describe("Filter Component", () => {
	let wrapper;
	beforeEach(() => {
		const props = {};
		wrapper = setup(props);
	});

	it("Should render without errors", () => {
		const component = findByTestAttr(wrapper, "FilterComponent");
		expect(component.length).toBe(1);
	});
});
