import { handleActions } from 'redux-actions'
import { } from './constants'


export type ClientState = {
    user: object,
    error: string
}

const initialState: ClientState = {
    user: {},
    error: ''
}

export default handleActions(
    {

    },
    initialState
)