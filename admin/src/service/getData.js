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
    patch,
    put,
    postConfig,
    getExcelService
} from './http.js';

export const BASICURL = Host;
// post登陆接口
export const Login = data => post('admin/login', data);
// post "用户管理" => "用户详情"
export const employeeDetail = data => post('admin/system/employee/detail', data);
// post "个人中心" => "修改密码"
export const fixPersonalPW = data => post('admin/system/employee/update-password', data);



export const team = data => post('/admin/team', data);
export const teamdetail = data => post('/admin/team/detail', data);
export const teamdeupdate = data => post('/admin/team/update', data);
export const teamdelete = data => post('/admin/team/delete', data);


export const teamdeadd = data => post('/admin/team/add', data);
export const carouselConfiglist = data => post('/admin/carouselConfig', data);
export const carouselConfigadd = data => post('/admin/carouselConfig/add', data);
export const carouselConfigdelete = data => post('/admin/carouselConfig/delete', data);
export const carouselConfigUpdate = data => post('/admin/carouselConfig/update', data);
export const carouselConfigdetail = data => post('/admin/carouselConfig/detail', data);


export const CateConfiglist = data => post('/admin/CateConfig', data);
export const CateConfigadd = data => post('/admin/CateConfig/add', data);
export const CateConfigdelete = data => post('/admin/CateConfig/delete', data);
export const CateConfigUpdate = data => post('/admin/CateConfig/update', data);
export const CateConfigdetail = data => post('/admin/CateConfig/detail', data);



export const reportdelete = data => post('/admin/submit/messagedelete', data);
export const messagelist = data => post('/admin/submit/messagelist', data);
export const messagedetail = data => post('/admin/submit/messagedetail', data);
export const messagedelete = data => post('/admin/submit/messagedelete', data);
export const messageupdate = data => post('/admin/submit/messageupdate', data);




// 获取基础配置
export const baseConfig = data => post('/admin/getWebsiteConfig', data);
// 修改基础设置
export const baseConfigUpdate = data => post('/admin/WebsiteConfigUpdate', data);
// 删除基础配置
export const deleteWebsiteConfig = data => post('/admin/deleteWebsiteConfig', data);
// 查看基础配置详情
export const lookWebsiteConfig = data => post('/admin/lookWebsiteConfig', data);
// 新增基础配置详情
export const addWebsiteConfig = data => post('/admin/addWebsiteConfig', data);

// 获取访问地址以及ip
export const getLookRecord = data => post('/admin/getLookRecord');

// 用户列表
export const queryEmployee = data => post('/admin/getUserList', data);
// post "用户管理" => "删除用户"
export const delEmployee = data => post('admin/employee/deletes', data);
/* 新增用户 */
export const getUseradd = data => post('admin/getUseradd', data);
/* 用户修改 */
export const getUserUpdate = data => post('admin/getUserUpdate', data);

// POST "系统管理" => "角色管理"
export const roleManage = () => post('admin/useRolelist');
// POST "系统管理" => "角色管理"->"删除角色"
export const deleteRole = data => post('admin/role/delete', data);
// POST "系统管理" => "角色管理"->"角色新增"
export const useRoleadd = data => post('admin/useRoleadd', data);

// 获取所有权限
export const getAllPessions = data => post('admin/getAllPessions');

/* 修改权限 */
export const useRoleUpdate = data => post('admin/useRoleUpdate', data);
// post注册接口
export const Register = data => post('admin/registrtUser', data);


