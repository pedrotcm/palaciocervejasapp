import { handleActions } from 'redux-actions'
import { FIND_ALL } from './constants'


export type CategoryState = {
    categories: object[]
}

const initialState: CategoryState = {
    categories: []
}

export default handleActions(
    {
        [FIND_ALL]: (state = initialState, action) => {
            return {
                ...state, categories: action.payload
            }
        }
    },
    initialState
)