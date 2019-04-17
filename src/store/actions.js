import * as types from './mutation-types'

export const setRouter = function ({commit,state}, routers) {
    commit(types.SET_ROUTER, routers)
};