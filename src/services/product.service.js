import API from './api';

const endpoint = 'products';

export const getProducts = async () => {
    return await API.get(endpoint);
}

export const save = async (entity) => {
    //entity.category = API.defaults.baseURL + "categories/" + entity.category.id;
    return await API.post(endpoint, entity);
    // if (entity.id){
    //     return await API.patch(`${endpoint}/${entity.id}`, entity);
    // } else {
    // }
}

export const remove = async (entity) => {
    return await API.delete(`${endpoint}/${entity.id}`, entity);
}