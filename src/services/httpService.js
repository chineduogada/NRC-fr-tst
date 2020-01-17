import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log("Logging the error", error);
		if (error.message === "Network Error") {
			toast.error("Looks like you're offline.");
		} else {
			toast.error("an unexpected error ocurred.");
		}
	} else {
		console.log("Logging the error", error);
		toast.error(error.response.data.message);
	}

	Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
};
