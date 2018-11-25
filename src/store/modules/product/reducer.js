import { handleActions } from 'redux-actions'
import { FIND_ALL } from './constants'


export type ProductState = {
    products: object[]
}

const initialState: ProductState = {
    products: []
}

export default handleActions(
    {
        [FIND_ALL]: (state = initialState, action) => {
            return {
                ...state, products: action.payload
            }
        }
    },
    initialState
)