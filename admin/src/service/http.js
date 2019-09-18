/*
 * @Description: 111
 * @version: 111
 * @Date: 2019-07-31 19:53:23
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-19 01:29:34
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
import axios from 'axios';
import qs from 'qs';
const {
    environment
} = process.env;


export const Host =
  environment === 'production' ? 'http://47.107.180.202:8082/' : 'http://47.107.180.202:8082/';
/*   export  const Host = environment === 'production' ? 'http://localhost:8082/' : 'http://localhost:8082/';  */  
axios.defaults.baseURL = Host;
export const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(data, {
                arrayFormat: 'repeat'
            }))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, qs.stringify(data, {
                arrayFormat: 'repeat'
            }))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, qs.stringify(data))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const postConfig = (url, data = {}, config) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}