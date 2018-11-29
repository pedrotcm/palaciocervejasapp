import * as types from './constants';
import { actions } from '../';
import { NavigationActions } from 'react-navigation';
import { showMessage } from '../../../utils/global';
import * as productService from "../../../services/product.service";
import Events from '../../../utils/events';

/**
* Buscar Todos Produtos
*/
export const findAll = () => {
    // Chamada assincrona
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        let products = [];
        // Carregar todos os produtos
        productService.getProducts().then(res => {
            products = res.data._embedded.products;
        }).catch(err => {
            console.log('finalAllProducts');
            console.log(err.response);
            //TODO
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
            dispatch({
                type: types.FIND_ALL,
                payload: products
            });
        });
    }
}

/**
* Criar/Editar Produto
*/
export const save = (entity) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Salvar produto
        productService.save(entity).then(res => {
            const msg = entity.id ? "editado" : "salvo";
            showMessage('Produto ' + msg + ' com sucesso!', 'success');
            dispatch(NavigationActions.navigate({ routeName: 'Products' }));
            Events.publish('RefreshList');
        }).catch(err => {
            console.log(err.response);
            //TODO
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Remover Produto
*/
export const remove = (entity) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Remover produto
        productService.remove(entity).then(res => {
            showMessage('Produto removido com sucesso!', 'success');
            dispatch(NavigationActions.navigate({ routeName: 'Products' }));
            Events.publish('RefreshList');
        }).catch(err => {
            console.log(err.response);
            //TODO
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}