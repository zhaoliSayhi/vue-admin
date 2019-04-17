import * as API from './index'

export default {
    //登陆
    gerMenu: params => {
        return API.POST('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter', params)
    },
}