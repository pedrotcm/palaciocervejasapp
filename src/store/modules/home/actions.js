import * as types from './constants'
import { actions } from '../'
import * as productService from "../../../services/product.service";

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
            //TODO
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
            dispatch({
                type: types.SET_PRODUCTS,
                payload: products
            });
        });
    }
}

export const setQuantity = (index, quantity) => {
    return {
        type: types.SET_QUANTITY,
        payload: { index: index, quantity: quantity }
    }
}

export const increment = (index) => {
    return {
        type: types.INCREMENT,
        payload: index
    }
}

export const decrement = (index) => {
    return {
        type: types.DECREMENT,
        payload: index
    }
}
