/* eslint-disable */

import axios from 'axios';
import EventBus from './EventBus';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // handle error
    if (error.response) {
      alert(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      alert(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      alert('Error : ' + error.message);
    }
    console.log(error.config);
  });

export default {
  data: {
    lastParam: {},
    sequence: [],
  },
  postGenerator(param) {
    const url = 'services/generator';
    return axios.post(url, param)
      .then((res) => {
        this.data.lastParam = param;
        // reset api data when res is okay
        if (res.status === 200) {
          this.data.sequence = [];
          EventBus.$emit('postGenerator');
        }
      });
  },
  getGeneratorNext() {
    return axios.get('services/generator/next')
      .then((res) => {
        // add data when res is okay
        if (res.status === 200) {
          this.data.sequence.push(res.data);
          EventBus.$emit('getGeneratorNext');
          console.log('test')
        }
      });
  },
};
