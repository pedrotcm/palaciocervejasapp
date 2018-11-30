import * as types from './constants';
import { actions } from '../';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { showMessage, showMessageCenter, handleError} from '../../../utils/global';
import * as authService from "../../../services/auth.service";
import * as clientService from "../../../services/client.service";

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
                handleError(err);
            }
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Registrar Usuário Autenticado
*/
export const setUserLogged = (client) => {
    return {
      type: types.LOGIN,
      payload: client
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
