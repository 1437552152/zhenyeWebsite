<template>
  <div class="shop">
      <headTop>
      	<div class="headLeft" slot='left'><i class="mui-icon mui-icon-back" @click="backBefor()"></i></div>
      </headTop>
			<div class="bannerDownload">
				<img src="http://ms0.meituan.net/touch/img/download_banner.png" alt="">
				<span></span>
				<span></span>
				<span><img src="" alt=""></span>
			</div>
			<div class="footTop">
				
			</div>
			<div class="footMid">
				<div class="Type">
					<span @click="goTo('/shop/order')" v-bind:class="{typeColor:'/shop/order'===$route.path}">点餐</span>
					<span @click="goTo('/shop/estimate')" v-bind:class="{typeColor:'/shop/estimate'===$route.path}">评价</span>
					<span @click="goTo('/shop/business')" v-bind:class="{typeColor:'/shop/business'===$route.path}">商家</span>
				</div>
				<div class="botLine">
					<span v-bind:class="{openColor:'/shop/order'===$route.path}"></span>
					<span v-bind:class="{midBot:'/shop/estimate'===$route.path}"></span>
					<span v-bind:class="{rightBot:'/shop/business'===$route.path}"></span>
				</div>
			</div>
			<router-view></router-view>
  </div>
	
</template>

<script>
import headTop from '../headTop/headTop.vue'
import axios from "axios"

export default {
  name: 'shop',
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
  },
 
}
</script>

<style scoped>
	.bannerDownload{
		width: 100%;
		height: 2.1rem;
		border-bottom: 1px solid #c6c0b3;
	}
	.bannerDownload img{
		width: 100%;
		height: 100%;
	}
	.Type{
		width: 100%;
		height:0.8rem ;
		background: #fff;
		display: flex;
		flex-direction: row;
	}
	.Type span{
		font-size: 0.3rem;
		flex: 1;
		line-height: 0.8rem;
		text-align: center;
	}
	.typeColor{
		color: #06C1AE;
	}
	.botLine{
		position: relative;
		width: 100%;
		height: 0.05rem;
		background: #ccc;
	}
	.openColor,.rightBot,.midBot{
		position: absolute;
		width: 30%;
		height:  0.05rem;;
		background: #06c1ae;
	}
	.openColor{
		left: 3%;
	}
	.rightBot{
		right: 3%;
	}
	.midBot{
		left: 36%;
	}

</style>
