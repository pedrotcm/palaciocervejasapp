import axios from 'axios';

var instance = axios.create();
instance.defaults.baseURL = 'http://192.168.1.37:8080/api/';
instance.defaults.timeout = 20000;


export default instance;