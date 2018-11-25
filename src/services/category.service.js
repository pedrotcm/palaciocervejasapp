import API from './api';

const endpoint = 'categories';

export const getCategories = async () => {
    return await API.get(endpoint);
}

export const save = async (category) => {
    if (category.id){
        return await API.patch(`${endpoint}/${category.id}`, category);
    } else {
        return await API.post(endpoint, category);
    }
}

export const remove = async (category) => {
    return await API.delete(`${endpoint}/${category.id}`, category);
}