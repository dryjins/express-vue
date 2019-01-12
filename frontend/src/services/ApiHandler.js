/* eslint-disable */

import axios from 'axios';

const api = {
  data: {
    lastParam: {},
    sequence: [],
  },
  init:function(EventBus){
    let self = this;
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // handle error
        if (error.response) {
          error.response.data.message ? alert(error.response.data.message) : alert(error.response.statusText);
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

    this.EventBus = EventBus;
    // add listeners for api calling
    EventBus.$on('callPostGenerator', function (param) {
      self.postGenerator(param);
    });
    EventBus.$on('callGetGeneratorNext', function () {
      self.getGeneratorNext();
    });
  },
  postGenerator(param) {
    const url = 'services/generator';
    return axios.post(url, param)
      .then((res) => {
        this.data.lastParam = param;
        // reset api data when res is okay
        if (res && res.status === 200) {
          this.data.sequence = [];
          this.EventBus.$emit('postGenerator', this.data.sequence);
        }
      });
  },
  getGeneratorNext() {
    return axios.get('services/generator/next')
      .then((res) => {
        // add data when res is okay
        if (res && res.status === 200) {
          this.data.sequence.push(res.data);
          this.EventBus.$emit('getGeneratorNext', this.data.sequence);
        }
      });
  }
};
export default api;
