import * as types from './mutation-types'

const mutations = {
    [types.SET_ROUTER] (state, routers) {
        state.roters = routers
    }
}

export default mutations;