import API from './api';

const endpoint = 'products';

/*
* Buscar Produtos
*/
export const getProducts = async () => {
    return await API.get(endpoint);
}

/*
* Criar Produto
*/
export const save = async (entity) => {
    return await API.post(endpoint, entity);
}

/*
* Remover Produto
*/
export const remove = async (entity) => {
    return await API.delete(`${endpoint}/${entity.id}`, entity);
}