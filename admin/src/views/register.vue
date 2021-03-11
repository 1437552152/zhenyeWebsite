<!--
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:53:23
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-12 00:15:46
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
					<Icon type="log-in"></Icon> 欢迎注册
				</p>
				<div class="form-con">
					<Form ref="form" :model="form" :rules="rules">
						<FormItem prop="username">
							<Input v-model="form.username" :disabled="btnDisable" placeholder="请输入账号">
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
							<Button @click="handle('form')" type="primary" long>确定</Button>
						</FormItem>
						 <div>已注册？请在这里<span style="color:rgb(60, 106, 233);cursor:pointer;" @click="hreftwo">登录</span>。
            </div>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
import { Register } from '@/service/getData';

export default {
    name: 'register',
    data () {
       
        const validatePwsd = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'));
            } else {
                let len = value.length;
                if (len >= 6 && len <= 8) {
                    callback();
                } else {
                    callback(new Error('请输入6~8位密码'));
                }
            }
        };
        return {
            btnDisable: false,
            form: {
                username: null,
                password: null
            },
            messshow: false,
            errormessage: null,
            rules: {
                username: [{ required: true, trigger: 'blur' }],
                password: [{ validator: validatePwsd, required: true, trigger: 'blur' }]
            },
            permissions: {}
        };
    },
    methods: {
        handle (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    Register({ username: this.form.username, password: this.form.password})
                        .then(res => {
                            if (res.status == '200') {
                                this.$Message.success(res.msg);
                                setTimeout(() => {
                                    this.$router.push({path: '/login'}); 
                                }, 3000);
                               
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                        .catch(err => {
                        });
                }
            });
        },
        hreftwo () {
            this.$router.push({ path: '/login' });
        }
    },
    created () {}
};
</script>