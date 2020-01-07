import React from "react";
import { shallow } from "enzyme";
import Pagination from "./Pagination";

const setup = (props = {}) => {
	const component = shallow(<Pagination {...props} />);
	return component;
};

const findByTestAttr = (wrapper, attr) => {
	const component = wrapper.find(`[data-test='${attr}']`);
	return component;
};

describe("Pagination Component", () => {
	let wrapper;
	beforeEach(() => {
		const props = {};

		wrapper = setup(props);
	});

	it("Should render without errors", () => {
		const component = findByTestAttr(wrapper, "PaginationComponent");
		expect(component.length).toBe(1);
	});

	it("Should render Next Control Button", () => {
		const nextBtn = findByTestAttr(wrapper, "next-control-btn");
		expect(nextBtn.length).toBe(1);
	});

	it("Should render Prev Control Buttons", () => {
		const prevBtn = findByTestAttr(wrapper, "prev-control-btn");
		expect(prevBtn.length).toBe(1);
	});

	it("Should render Current-page", () => {
		const currentPage = findByTestAttr(wrapper, "current-page");
		expect(currentPage.length).toBe(1);
	});
});
