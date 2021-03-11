<!--
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:53:23
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-12 00:22:44
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<style lang="less">
@import "./login.less";
</style>

<template>
	<div class="login" @keydown.enter="handle">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon> 欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="username">
							<Input v-model="form.username" :disabled="btnDisable" placeholder="请输入用户名">
								<span slot="prepend">
									<Icon :size="16" type="person"></Icon>
								</span>
							</Input>
						</FormItem>

						<FormItem prop="password">
							<Input type="password" v-model="form.password" :disabled="btnDisable" placeholder="请输入密码">
								<span slot="prepend">
									<Icon :size="14" type="locked"></Icon>
								</span>
							</Input>
						</FormItem>

						<FormItem style="margin-top:10px">
							<Button @click="handle" type="primary" long>登录</Button>
						</FormItem>
						<p style="color:red;text-align:center" v-if="messshow">{{errormessage}}</p>
                         <div>未注册？请在这里<span style="color:rgb(60, 106, 233);cursor:pointer;" @click="hreftwo">注册</span>。
            </div>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import store from '../store';

import { setStore, getStore, removeStore } from '@/config/storage';
import { BASICURL, Login } from '@/service/getData';

export default {
    data () {
        return {
            btnDisable: false,
            form: {
                username: null,
                password: null
            },
            messshow: false,
            errormessage: null,
            rules: {
                username: [{ required: true, message: '不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '不能为空', trigger: 'blur' }]
            },
            permissions: {}
        };
    },
    methods: {
        handle () {
            Login({ username: this.form.username, password: this.form.password })
                .then(res => {
                    this.$router.push({ name: 'home_index' });
                    if (res.code === 0) {
                        let permissions = res.data.permissions;
                        localStorage.setItem('token', res.data.token);
                        permissions.map((item, index) => {
                            permissions[index].id = item.menuId;
                            permissions[index].title = item.name;
                            permissions[index].description = item.name;
                            permissions[index].sort = item.orderNum;
                            item.submenus.map((childitem, childindex) => {
                                item.submenus[childindex].id = childitem.menuId;
                                item.submenus[childindex].description = childitem.name;
                                item.submenus[childindex].title = childitem.name;
                                item.submenus[childindex].sort = childitem.orderNum;
                            });
                        });
                        let admin = res.data.admin;
                        let userInfo = Object.assign({}, admin);
                        userInfo.id = admin.user_id;
                        userInfo.mobilePhone = admin.mobile;
                        userInfo.mobilePhone = admin.mobile;
                        Cookies.set('user', res.data.admin.username, { expires: 7 });
                        Cookies.set('userInfo', userInfo, { expires: 7 });
                        setStore('leftSidebarList', permissions);
                        setStore('roleId',admin.roleId)
                        this.$router.push({ name: 'home_index' });
                        window.location.reload();
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
                .catch(err => {
                    this.$router.push({ name: 'home_index' });
                });
        },
          hreftwo () {
            this.$router.push({ path: '/register' });
        }
    },
    created () {}
};
</script>