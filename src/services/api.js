import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.42:8080/api/'
});