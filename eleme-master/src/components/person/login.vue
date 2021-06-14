<template>
  <div class="login">
		<div>
			<input class="username" type="text" placeholder="账户名/手机号/Email" v-model="username">
			<input class="password" type="password" placeholder="请输入您的密码" v-model="password">
			<el-button type="text"  @click="getValue" class="btn">登录</el-button>
		</div>
  </div>
</template>

<script>
import headTop from '../headTop/headTop.vue'
import axios from "axios"

export default {
	name: 'login',	
	data () {
	    return {
			
	  		resData:'',
	  		username:'',
	  		password:'',
	      inpContent:0
	    }
	},
	computed:{	
		
	},
	
	methods:{
		goTo(path){
			this.$router.replace(path);
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
				this.$axios.get('/api/getValue', {
					params: {
						username:this.username,
						password:this.password
					},
				}).then((res) => {
					if(res){
						if(res.data.length>0){
							sessionStorage.setItem("username",this.username);
							this.$cookieStore.setCookie("username",this.username,6000);
							this.$alert('登录成功', '成功提示', {
							  confirmButtonText: '确定',
							});
							this.$router.replace('/');
						}else{
							this.$alert('用户名或密码错误', '错误提示', {
							  confirmButtonText: '确定'
							});
						}
					}
				})
			}		
		},
		
	},
		components:{
			headTop  
		},
	
}

</script>

<style scoped>
	.username,.password{
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
