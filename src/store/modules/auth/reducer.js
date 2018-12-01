import { handleActions } from 'redux-actions'
import { LOGIN, LOGOUT, ERROR, CLEAR_ERROR } from './constants'


export type AuthState = {
    loggedIn: boolean,
    isAdmin: boolean,
    user: object,
    error: string
}

const initialState: AuthState = {
    loggedIn: false,
    isAdmin: false,
    user: {},
    error: ''
}

export default handleActions(
    {
        [LOGIN]: (state = initialState, action) => {
            let isAdmin = false;
            if (action.payload.email === 'admin@palacio.com'){
                action.payload.name = "Administrador";
                isAdmin = true;
            }
            return {
                loggedIn: true,
                isAdmin: isAdmin,
                user: action.payload,
                error: ''
            }
        },
        [LOGOUT]: () => {
            return {
                loggedIn: false,
                isAdmin: false,
                user: {},
                error: ''
            }
        },
        [ERROR]: (state = initialState, action) => {
            return {
               ...state, error: action.payload
            }
        },
        [CLEAR_ERROR]: (state = initialState, action) => {
            return {
               ...state, error: ''
            }
        },

    },
    initialState
)