<template>
  <div class="login">
		<div class="rel">
			<input class="username" type="text" placeholder="请输入手机号">
			<span>获取验证码</span>
			<input class="password" type="password" placeholder="请输入短信验证码">
			<input class="btn" type="button" value="登录">
		</div>
  </div>
</template>

<script>
import headTop from '../headTop/headTop.vue'
import axios from "axios"

export default {
  name: 'login',
  components:{
		headTop  
  },
	methods:{
		goTo(path){
			this.$router.replace(path);
		}
	},
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
	.rel{
		position: relative;
	}
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
	span{
		position: absolute;
		display: block;
		width: 1.85rem;
		height: 0.58rem;
		background: #dcdcdc;
		line-height: 0.58rem;
		border-radius: 0.08rem;
		text-align: center;
		right: 5%;
		top: 0.125rem;
		color: #999;
		font-size:0.28rem;
	}
</style>
