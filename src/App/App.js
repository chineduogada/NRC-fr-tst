import React from 'react';
import axios from 'axios';
import GlobalRouter from '../hoc/Routers/GlobalRoutes';

// Configure Axios Defaults:: baseURL and Token
axios.defaults.baseURL = 'https://floating-lowlands-92074.herokuapp.com/api/v1';

const App = () => {
  return <GlobalRouter />;
};

export default App;
