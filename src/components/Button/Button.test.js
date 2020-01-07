import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";
import { findByTestAttr } from "../../../utils";

const setup = (props = {}) => {
	const wrapper = shallow(<Button {...props} />);
	return wrapper;
};

describe("Button Component", () => {
	let wrapper;
	beforeEach(() => {
		const props = {
			label: ""
		};
		wrapper = setup(props);
	});

	it("Should render without errors", () => {
		const component = findByTestAttr(wrapper, "button");
		expect(component.length).toBe(1);
	});

	it("Should render label", () => {
		const label = findByTestAttr(wrapper, "label");
		expect(label.length).toBe(1);
	});
});
