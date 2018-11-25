import { handleActions } from 'redux-actions'
import { LOGIN, LOGOUT } from './constants'


export type AuthState = {
    loggedIn: boolean,
    userId: string,
    fullName: string
  }

const initialState: AuthState = {
    loggedIn: false,
    userId: null,
    fullName: null
}

export default handleActions(
    {
        [LOGIN]: (state = initialState, action) => {
            const p = action.payload
            return {
                loggedIn: true,
                userId: p.userId,
                fullName: p.fullName
            }
        },

        [LOGOUT]: () => {
            return {
                loggedIn: false
            }
        }
    },
    initialState
)