import API from './api';

const endpoint = 'clients';

/*
* Criar Cliente
*/
export const register = async (client) => {
    return await API.post(`${endpoint}/register`, client);
}

/*
* Atualizar Cliente
*/
export const update = async (client) => {
    return await API.patch(`${endpoint}/${client.id}`, client);
}

/*
* Remover Cliente
*/
export const remove = async (client) => {
    return await API.delete(`${endpoint}/${client.id}`, client);
}