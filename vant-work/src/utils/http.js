/*
 * @Description: 111
 * @version: 111
 * @Date: 2019-07-31 19:53:23
 * @LastEditors: yfye
 * @LastEditTime: 2021-06-15 12:23:05
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
import axios from 'axios';
import qs from 'qs';
const {
    environment
} = process.env;

export const Host = environment === 'production' ? 'http://localhost:9999/' : 'http://localhost:9999/';
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
            });
    });
};

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(data, {
                arrayFormat: 'repeat'
            }))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, qs.stringify(data, {
                arrayFormat: 'repeat'
            }))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const postConfig = (url, data = {}, config) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export function getExcelService(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(
                url,
                data, {
                    headers: { 'Content-Type': token?token:  `${token}` },
                    responseType: 'blob' // 表明返回服务器返回的数据类型
                }
            )
            .then(res => {
                resolve(res.data);
                const blob = new Blob([res.data]); // new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
                const fileName = '导出明细.xlsx'; // 下载文件名称
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}