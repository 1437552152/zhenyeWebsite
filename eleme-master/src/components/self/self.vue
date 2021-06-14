<template>
  <div class="login">
    <headTop title='美团网'>
    </headTop>  
		<div class="loginType">
			<span @click="goTo('/self/login')" v-bind:class="{typeColor:'/self/login'===$route.path}">美团账号登录</span>
			<span @click="goTo('/self/type')" v-bind:class="{typeColor:'/self/type'===$route.path}">手机验证登录</span>
		</div>
		<div class="bot">
			<span v-bind:class="{openColor:'/self/login'===$route.path}"></span>
			<span v-bind:class="{rightBot:'/self/type'===$route.path}"></span>
		</div>
		<router-view></router-view>
		<loginFooter></loginFooter>
  </div>
</template>

<script>
import headTop from '../headTop/headTop.vue'
import loginFooter from '../person/loginFooter.vue'
import axios from "axios"

export default {
  name: 'index',
  components:{
	headTop,
	loginFooter
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
	}
	.bot{
		position: relative;
		width: 100%;
		height: 0.05rem;
		background: #ccc;
	}
	.openColor,.rightBot{
		position: absolute;
		width: 47%;
		height:  0.05rem;;
		background: #06c1ae;
	}
	.openColor{
		left: 3%;
	}

	.rightBot{
		right: 3%;
	}
</style>
