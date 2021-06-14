<template>
  <div class="loginFooter">
		<span @click="regeister">立即注册</span>
		<span>找回密码</span>
  </div>
</template>

<script>

export default {
  name: 'loginFooter',
	methods:{
		regeister(){
			this.$router.push({
				path:'/self/login',
				name:"login",
				query:{
					id:'注册'
				}
			});
			
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
</style>
