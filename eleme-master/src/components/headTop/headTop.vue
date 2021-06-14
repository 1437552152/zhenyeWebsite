<template>
  <header class="foodHeader">
		<slot name='left'></slot>
  	<!-- <div class="headLeft"><i class="mui-icon mui-icon-search"></i></div> -->
		<div class="headTitle">{{title}}</div>
  	<!-- <div class="headRight">
  		<span><router-link to='/'>登录|注册</router-link></span>
  	</div> -->
		<slot name='right'></slot>
  </header>
</template>

<script>
import axios from "axios"

export default {
  name: 'index',
  props:{
  	title:String
  }
}
</script>

<style scoped>
	.headLeft,.headTitle,.headRight{
		display: flex;
	}
	.headLeft,.headTitle{
		justify-content:center;
		align-items: center;
	}
	.headLeft .mui-icon{
		display: flex;
		font-size: 24px;	
		flex: 2;
		text-align: left;
		text-indent: 0.2rem;
		line-height: 1.01rem;;
	}
	.headTitle{
		text-align: center;
		flex:6;
	}
	.headRight{
		text-align: center;
		flex:2;
		padding-right: 10px;
	}
	.headRight span a{
		color: #fff;
	}
	.foodHeader{
		width: 100%;
		height:1.01rem;
		line-height: 1.01rem;
		color: #fff;
		background: #06c1ae;
		display: flex;
		flex-direction: row;
	}
	
</style>
