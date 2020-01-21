import React from 'react';
import axios from 'axios';
import Auth from '../pages/Auth/Auth';
import { ToastContainer } from 'react-toastify';

// Configure Axios Defaults:: baseURL and Token
axios.defaults.baseURL = 'https://aqueous-hollows-75168.herokuapp.com/api/v1';

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Auth />
    </React.Fragment>
  );
};

export default App;
