import * as types from './constants';
import { actions } from '../';
import { handleError } from '../../../utils/global';
import * as productService from "../../../services/product.service";

/**
* Buscar Todos Produtos
*/
export const findAllProducts = () => {
    // Chamada assincrona
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        let products = [];
        // Carregar todos os produtos
        productService.getProducts().then(res => {
            products = res.data._embedded.products;
        }).catch(err => {
            console.log(err);
            handleError(err);
        })    .finally(() => {
                // Esconder pop-up carregando
                dispatch(actions.app.loading(false));
                // Setar produtos
                dispatch(setProducts(products, false));
            });
    }
}

/**
* Buscar por query
*/
export const findByQuery = (query) => {
    // Chamada assincrona
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        let products = [];
        // Carregar todos os produtos
        productService.findByQuery(query).then(res => {
            products = res.data._embedded.products;
        }).catch(handleError).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
            // Setar produtos
            dispatch(setProducts(products,true));
        });
    }
}

/**
* Setar Produtos
*/
export const setProducts = (products, isFiltered) => {
    return {
        type: types.SET_PRODUCTS,
        payload: { products: products, isFiltered : isFiltered }
    }
}

/**
* Setar Quantidade de Produtos
*/
export const setQuantity = (index, quantity) => {
    return {
        type: types.SET_QUANTITY,
        payload: { index: index, quantity: quantity }
    }
}

/**
* Incrementar Quantidade de Itens do Produto
*/
export const increment = (index) => {
    return {
        type: types.INCREMENT,
        payload: index
    }
}

/**
* Decrementar Quantidade de Itens do Produto
*/
export const decrement = (index) => {
    return {
        type: types.DECREMENT,
        payload: index
    }
}
