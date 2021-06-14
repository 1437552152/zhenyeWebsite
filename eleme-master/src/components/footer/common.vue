<template>
  <div class="common">
  	<div class="footer">
  		<span class="guide" @click="goTo('/')"><i class="el-icon-eleme" v-bind:class="{on:'/'===$route.path}">首页</i></span>
  		<span class="guide" @click="goTo('/cart')"><i class="el-icon-shopping-cart-2" v-bind:class="{on:'/cart'===$route.path}">订单列表</i></span>
  		<span class="guide" @click="goTo('/search')"><i class="el-icon-search" v-bind:class="{on:'/search'===$route.path}">搜索</i></span>
  		<span class="guide" @click="goTo('/self')"><i class="el-icon-user" v-bind:class="{on:'/self/login'===$route.path}">我的</i></span>
  	</div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'common',
  data () {
    return {
      
    }
  },
  methods:{
  	goTo(path){
  		this.$router.replace(path);
  	}
  }
}
</script>

<style scoped>
	.footer{
		position: fixed;
		width: 100%;
		height: 50px;
		z-index: 100;
		bottom: 0;
		left: 0;
		background: #fff;
		border-top: 1px solid #e4e4e4;
		display: flex;
	}
	.guide{
		display: flex;
		flex: 1;
		text-align: center;
		flex-direction: column;
		align-items: center;
		margin: 5px;
		color: #999999;
	}
	.guide i{
		display: flex;
		flex: 1;
		font-size: 16px;
		text-align: center;
		flex-direction: column;
		align-items: center;
		margin: 5px;
	}
	.on{
		color: #06C1AE;
		font-weight: bold;
	}
</style>
