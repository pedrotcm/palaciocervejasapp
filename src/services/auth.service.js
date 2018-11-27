import API from './api';

const endpoint = 'authentication';

export const save = async (client) => {
    return await API.post(`${endpoint}/register`, client);
}

export const login = async (email, password) => {
    return await API.post(`${endpoint}/login?email=${email}&password=${password}`);
}