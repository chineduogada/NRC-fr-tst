import axios from 'axios';
import { toast } from 'react-toastify';

class HTTP {
  constructor() {
    this.all = axios.all;
    this.get = axios.get;
    this.post = axios.post;
    this.put = axios.put;
    this.patch = axios.patch;
    this.delete = axios.delete;

    this.sentNetworkErrorFeedBack = false;
    this.handleErrors();
  }

  handleErrors() {
    axios.interceptors.response.use(null, error => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        console.log('Logging the error', error);
        if (error.message === 'Network Error') {
          if (!this.sentNetworkErrorFeedBack) {
            toast.error("Looks like you're offline.");
            this.sentNetworkErrorFeedBack = true;

            setTimeout(() => {
              this.sentNetworkErrorFeedBack = false;
            }, 5000);
          }
        } else {
          toast.error('an unexpected error ocurred.');
        }
      } else {
        if (error.response.status === 401) {
          localStorage.removeItem('curUser');
          if (
            this.history &&
            this.history !== undefined &&
            this.history !== null
          ) {
            this.history.go();
          }
        }
        console.log('Logging the error', error);
        toast.error(error.response.data.message);
      }

      Promise.reject(error);
    });
  }
}

export default new HTTP();
