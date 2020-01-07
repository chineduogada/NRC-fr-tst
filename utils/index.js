export const findByTestAttr = (wrapper, attr) => {
	const component = wrapper.find(`[data-test="${attr}"]`);
	return component;
};
