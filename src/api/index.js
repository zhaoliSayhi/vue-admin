import axios from 'axios';
import qs from 'qs';
import Env from './env';

axios.defaults.baseURL = '';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


let token = '';

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    let user = JSON.parse(window.sessionStorage.getItem('token'));
    if (user) {
        token = user.token;
    }
    config.headers.common['token'] = token;
    //console.dir(config);
    return config;
}, function (error) {

    return Promise.reject(error);
});


// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data && response.data.code) {
        if (parseInt(response.data.code) === 5004 && response.data.msg == '未登录' ) {
            //未登录
            // this.$Message.error("登录信息已失效，请重新登录");
            setTimeout(() => {
                this.$router.replace({
                    path: '/login'
                })
            }, 300);
        }

        if (parseInt(response.data.code) === 5018 && response.data.msg == '登录过期，请重新登录') {
            this.$Message.error("登录信息已失效，请重新登录");
            setTimeout(() => {
                this.$router.replace({
                    path: '/login'
                })
            }, 300);
        }

        if (parseInt(response.data.code) === -1) {
            // this.$Message.error('请求失败');
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
})


let base = Env.baseURL;

export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
    const getTimestamp = new Date().getTime();
    return axios.post(`${base}${url}`, qs.stringify(params)).then(res => res.data)
};

export const GET = (url, params) => {
    const getTimestamp = new Date().getTime();
    return axios.get(`${base}${url}?timer=${getTimestamp}`, {params: qs.stringify(params)}).then(res => res.data)
};

export const PUT = (url, params) => {
    return axios.put(`${base}${url}`, qs.stringify(params)).then(res => res.data)
};

export const DELETE = (url, params) => {
    return axios.delete(`${base}${url}`, {params: qs.stringify(params)}).then(res => res.data)
};

export const PATCH = (url, params) => {
    return axios.patch(`${base}${url}`, qs.stringify(params)).then(res => res.data)
};