import API from './api';

const endpoint = 'products';

export const getProducts = async () => {
    return await API.get(endpoint);
}

export const save = async (entity) => {
    return await API.post(endpoint, entity);
}

export const remove = async (entity) => {
    return await API.delete(`${endpoint}/${entity.id}`, entity);
}