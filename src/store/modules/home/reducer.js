import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT, SET_PRODUCTS, SET_QUANTITY } from './constants'


export type HomeState = {
    products: Object
}

const initialState: HomeState = {
    products: []
}

export default handleActions(
    {
        [SET_PRODUCTS]: (state = initialState, action) => {
            return {
                products: action.payload
            }
        },

        [SET_QUANTITY]: (state = initialState, action) => {
            const p = action.payload;
            state.products[p.index].qnt = p.quantity ? parseInt(p.quantity) : '';
            return {
                products: [...state.products]
            }
        },

        [INCREMENT]: (state = initialState, action) => {
            const p = action.payload;
            if (state.products[p].qnt === undefined) {
                state.products[p].qnt = 1;
            }
            if (state.products[p].qnt < 99) {
                state.products[p].qnt += 1;
            }
            return {
                products: [...state.products]
            }
        },

        [DECREMENT]: (state = initialState, action) => {
            const p = action.payload;
            if (state.products[p].qnt === undefined) {
                state.products[p].qnt = 1;
            }
            if (state.products[p].qnt > 1) {
                state.products[p].qnt -= 1;
            }
            return {
                products: [...state.products]
            }
        }
    },
    initialState
)