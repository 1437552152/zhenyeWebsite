<template>
	<div class="regeister">
		<headTop title='注册账号'>
			<div class="headLeft" slot='left'><i class="mui-icon mui-icon-search"></i></div>
		</headTop>
		<div class="loginType">
			<span @click="goTo('/self/login')" v-bind:class="{typeColor:'/self/login'===$route.path}">美团账号登录</span>
		</div>
		<div class="login">
			<div>
				<input class="username" type="text" placeholder="账户名/手机号/Email" v-model="username">
				<input class="password" type="password" placeholder="请输入您的密码" v-model="password">
				<el-button type="text"  @click="getValue" class="btn">{{btnText}}</el-button>
			</div>
		</div>
		<div class="loginFooter">
			<span @click="regeister">立即注册</span>
			<span>找回密码</span>
		</div>
	</div>
	
</template>

<script>
import headTop from '../headTop/headTop.vue'

export default {
  name: 'regeister',
	methods:{
		regeister(){
			this.$router.push({
				path:'/self/login',
				name:"login",
				query:{
					id:'注册'
				}
			});
			
		},
		getValue(){
			if(this.username == ''){
				this.$alert('请输入账号', '错误提示', {
				  confirmButtonText: '确定',
				 //  callback: action => {
					// this.$message({
					//   type: 'info',
					//   message: `action: ${ action }`
					// });
				 //  }
				});
			}else{
				this.$axios.get('/api/getValue', {
					params: {username: this.username}
				}).then((res) => {
					if(res){
						if(res.data.length>0){
							this.$alert('已存在账号名称', '错误提示', {
							  confirmButtonText: '确定',
							 //  callback: action => {
								// this.$message({
								//   type: 'info',
								//   message: `action: ${ action }`
								// });
							 //  }
							});
						}else if(this.password ==''){
							this.$alert('请输入密码', '错误提示', {
							  confirmButtonText: '确定',
							 //  callback: action => {
								// this.$message({
								//   type: 'info',
								//   message: `action: ${ action }`
								// });
							 //  }
							});
						}else{
							this.$axios.post('/api/insertValue', {
								username: this.password, password: this.username
							}).then((res) => {
								console.log('res', res);
							})
						}
					}
				})
			}
	},
  data () {
    return {
    }
  }
}
</script>

<style scoped>
	.loginFooter{
		margin-top: 0.2rem;
		position: relative;
		width: 100%;
	}
	.loginFooter span{
		color: #06C1AE;
	}
	span:first-of-type{
		display: block;
		position: absolute;
		left: 5%;
	}
	span:last-of-type{
		position: absolute;
		right: 5%;
	}
	.loginType{
		width: 100%;
		height:0.8rem ;
		background: #fff;
		display: flex;
	}
	.loginType span{
		font-size: 0.28rem;
		flex: 1;
		line-height: 0.8rem;
		text-align: center;
	}
	.typeColor{
		color: #06C1AE;
	}.username,.password{
		height: 0.85rem;
		margin: 0;
		border: 0;
		outline: none;
		font-size: 0.28rem;
	}
	.username{
		border-bottom: 1px solid #ccc;
	}
	.btn{
		width: 90%;
		height: 1rem;
		color: white;
		background: #06C1AE;
		border-radius: 0.1rem;
		margin-top: 0.3rem;
		margin-left: 5%;
		cursor: pointer;
		font-size: 0.4rem;
	}
</style>
