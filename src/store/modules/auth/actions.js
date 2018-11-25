import * as types from './constants'
import { actions } from '../'

/**
* Sign in.
* @param {string} email 
* @param {string} password
*/
export const login = (email: string, password: string) => {
    // async call
    return dispatch => {
        // turn loading animation on
        // by dispacthing `loading` action from module `app`.
        // yes, each action can interact with another module actions.
        dispatch(actions.app.loading())

        // simulate ajax login
        // in real world you can use `fetch` to make ajax request.
        setTimeout(() => {
            if (email === 'admin' && password === 'secret') {
                dispatch({
                    type: types.LOGIN,
                    payload: {
                        userId: email,
                        fullName: 'Clark Kent'
                    }
                })
            }

            // turn loading animation off
            dispatch(actions.app.loading(false))
        }, 3000)
    }
}

/**
* Sign out.
*/
export const logout = () => {
    // direct/sync call
    return {
        type: types.LOGOUT
    }
}
