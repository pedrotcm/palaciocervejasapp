import * as types from './constants';
import { actions } from '../';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { showMessage, showMessageCenter } from '../../../utils/global';
import * as authService from "../../../services/auth.service";

/**
* Autenticar
*/
export const login = (email: string, password: string) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading())
        // Autenticar Cliente
        authService.login(email, password).then(res => {
            showMessage('Autenticado com sucesso!', 'success');
            dispatch({
                type: types.LOGIN,
                payload: res.data
            })
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                dispatch({
                    type: types.ERROR,
                    payload: err.response.data
                })
            } else {
                //TODO
                console.log(err.response);
            }
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Criar/Editar Conta
*/
export const save = (client, fullName, confirmPassword) => {
    return dispatch => {
        if (client.password !== confirmPassword) {
            showMessageCenter('Confirmar senha não confere', 'danger');
            return;
        }
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Salvar cliente
        client.name = fullName;
        authService.save(client).then(res => {
            const msg = client.id ? "editada" : "criada";
            showMessage('Conta ' + msg + ' com sucesso!', 'success');
            dispatch({
                type: types.LOGIN,
                payload: client
            })
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                showMessageCenter(err.response.data, 'danger');
            } else {
                //TODO
                console.log(err.response);
            }
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Desautenticar
*/
export const logout = () => {
    return dispatch => {
        dispatch({
            type: types.LOGOUT
        })
        dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        dispatch(DrawerActions.closeDrawer());
    }
}


/**
* Limpar Erros
*/
export const clearError = () => {
    return dispatch => {
        dispatch({
            type: types.CLEAR_ERROR
        })
    }
}
