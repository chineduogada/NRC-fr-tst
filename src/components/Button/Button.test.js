import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";
import { findByTestAttr } from "../../../utils";

const setup = (props = {}) => {
	const component = shallow(<Button {...props} />);
	return component;
};

let component;
beforeEach(() => {
	component = setup({ label: "" });
});

describe("Button Component", () => {
	it("Should render without errors", () => {
		const wrapper = findByTestAttr(component, "button");
		expect(wrapper.length).toBe(1);
	});

	it("Should render label", () => {
		const label = findByTestAttr(component, "label");
		expect(label.length).toBe(1);
	});
});
