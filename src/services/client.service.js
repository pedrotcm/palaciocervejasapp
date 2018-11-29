import API from './api';

const endpoint = 'clients';

export const register = async (client) => {
    return await API.post(`${endpoint}/register`, client);
}

export const update = async (client) => {
    return await API.patch(`${endpoint}/${client.id}`, client);
}

export const remove = async (client) => {
    return await API.delete(`${endpoint}/${client.id}`, client);
}