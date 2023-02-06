import axios from 'axios'

let AXIOS = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
});

export default AXIOS;