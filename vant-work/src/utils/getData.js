/*
 * @Description:
 * @version:
 * @Date: 2019-07-31 19:53:23
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-22 19:35:28
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
import {
    Host,
    fetch,
    post,
} from './http.js';

export const BASICURL = Host;
export const Login = data => post('user/login', data); //登陆
export const register = data => post('user/register', data); //注册
export const blogList = data => fetch('user/blogList', data); //资讯列表
export const blogDetail = data => fetch('user/blogDetail', data); //资讯详情
export const userInfoDetail = data => fetch('user/userInfoDetail', data); //用户详情
export const resume = data => fetch('user/resume', data); //查看简历
export const updateResume = data => post('user/updateResume', data); //修改简历
export const deleteBlog = data => fetch('user/deleteBlog', data); //删除资讯
export const addBlog = data => post('user/addBlog', data); //新增资讯
export const platformIntroduction = data => fetch('user/platformIntroduction', data); //平台须知