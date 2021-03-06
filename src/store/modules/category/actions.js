import * as types from './constants';
import { actions } from '../';
import { NavigationActions } from 'react-navigation';
import { showMessage, handleError } from '../../../utils/global';
import * as categoryService from "../../../services/category.service";
import Events from '../../../utils/events';

/**
* Buscar Todas Categorias
*/
export const findAll = () => {
    // Chamada assincrona
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        let categories = [];
        // Carregar todas as categorias
        categoryService.getCategories().then(res => {
            categories = res.data._embedded.categories;
        }).catch(handleError)
            .finally(() => {
                // Esconder pop-up carregando
                dispatch(actions.app.loading(false));
                dispatch({
                    type: types.FIND_ALL,
                    payload: categories
                });
            });
    }
}

/**
* Criar/Salvar Categoria
*/
export const save = (category) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Salvar categoria
        categoryService.save(category).then(res => {
            const msg = category.id ? "editada" : "salva";
            showMessage('Categoria ' + msg + ' com sucesso!', 'success');
            dispatch(NavigationActions.navigate({ routeName: 'Categories' }));
            Events.publish('RefreshList');
        }).catch(handleError).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Remover Categoria
*/
export const remove = (category) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Remover categoria
        categoryService.remove(category).then(res => {
            showMessage('Categoria removida com sucesso!', 'success');
            dispatch(NavigationActions.navigate({ routeName: 'Categories' }));
            Events.publish('RefreshList');
        }).catch(handleError).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}