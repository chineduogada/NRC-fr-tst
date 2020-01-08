import React from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

// Configure Axios Defaults:: baseURL and Token
axios.defaults.baseURL = "https://floating-lowlands-92074.herokuapp.com/api/v1";

const App = () => {
	return <Layout />;
};

export default App;
