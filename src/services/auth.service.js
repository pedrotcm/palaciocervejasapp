import API from './api';

const endpoint = 'authentication';

/*
* Autenticar
*/
export const login = async (email, password) => {
    return await API.post(`${endpoint}/login?email=${email}&password=${password}`);
}