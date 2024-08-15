import axios from 'axios'
import { Toast } from "antd-mobile" ;
import { userActions } from '@/store';

let baseURL;

switch(process.env.NODE_ENV){
    case 'development':baseURL = '/api/';break;
    case 'development_local':baseURL = 'http://192.168.1.107:8982';break;
    case 'production':baseURL = 'https://toc.fightguy.online';break;
    case 'production_online':baseURL = 'https://toc.lavietaste.sg';break;
}
export const BASE_URL = baseURL;
const instance = axios.create({
    baseURL:BASE_URL
});

instance.interceptors.request.use(function (config,data) {
    const token = userActions.getToken()
    if(token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if(response.data.code == 0 && response.data.msg){
        Toast.show(response.data.msg)
    }
    return response.data
}, function (error) {
    switch(error.response.status){
        case 400:
            Toast.show(error.response)
            break;
        case 500:
            Toast.show({content:"The server is busy now. try again later.",duration:3000})
            break;
        default:
            Toast.show({content:"The server is busy now. try again later.",duration:3000})
    }

    return {code:0}
});

const tempGet = instance.get

instance.get = function(url,params){
    return tempGet(url,{
        params:params
    });
};

export default instance