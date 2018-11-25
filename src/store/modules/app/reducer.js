import { handleActions } from 'redux-actions'
import { SET_LOADING, SHOW_MESSAGE } from './constants'

export type AppState = {
    loading: boolean
}

const initialState: AppState = {
    loading: false
}

// handle actions
export default handleActions(
    {
        [SET_LOADING]: (state = initialState, action) => {
            return {
                loading: action.payload
            }
        }
    },
    initialState
)