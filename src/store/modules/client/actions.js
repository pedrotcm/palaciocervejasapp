import * as types from './constants';
import { actions } from '../';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { showMessage, showMessageCenter, handleError } from '../../../utils/global';
import * as clientService from "../../../services/client.service";

/**
* Criar Conta
*/
export const register = (client, fullName, confirmPassword) => {
    return dispatch => {
        if (client.password !== confirmPassword) {
            showMessageCenter('Confirmar senha não confere', 'danger');
            return;
        }
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Criar cliente
        client.name = fullName;
        clientService.register(client).then(res => {
            const msg = client.id ? "editada" : "criada";
            showMessage('Conta ' + msg + ' com sucesso!', 'success');
            dispatch(actions.auth.setUserLogged(res.data));
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                showMessageCenter(err.response.data, 'danger');
            } else {
                //TODO
                handleError(err);
            }
        }).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Atualizar Conta
*/
export const update = (client, confirmPassword) => {
    return dispatch => {
        if (client.password !== confirmPassword) {
            showMessageCenter('Confirmar senha não confere', 'danger');
            return;
        }
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Atualizar cliente
        clientService.update(client).then(res => {
            showMessage('Conta atualizada com sucesso!', 'success');
            dispatch(actions.auth.setUserLogged(client));
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }).catch(handleError).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}

/**
* Excluir Conta
*/
export const remove = (client) => {
    return dispatch => {
        // Mostrar pop-up carregando
        dispatch(actions.app.loading());
        // Excluir cliente
        clientService.remove(client).then(res => {
            showMessage('Conta removida com sucesso!', 'success');
            dispatch(actions.auth.logout());
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }).catch(handleError).finally(() => {
            // Esconder pop-up carregando
            dispatch(actions.app.loading(false));
        });
    }
}



