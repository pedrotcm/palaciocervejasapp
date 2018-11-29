import API from './api';

const endpoint = 'authentication';

export const login = async (email, password) => {
    return await API.post(`${endpoint}/login?email=${email}&password=${password}`);
}