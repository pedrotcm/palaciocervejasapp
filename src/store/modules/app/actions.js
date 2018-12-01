import * as types from './constants'

/*
* Estado Dialogo Carregando
*/
export const loading = (yes: boolean = true) => {
  return {
    type: types.SET_LOADING,
    payload: yes
  }
}