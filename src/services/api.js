import axios from 'axios';

var instance = axios.create();
instance.defaults.baseURL = 'http://ec2-18-218-194-155.us-east-2.compute.amazonaws.com:8080/api/';
instance.defaults.timeout = 20000;

export default instance;