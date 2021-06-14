

<template>
  <div class="index">
   <!-- <header class="foodHeader">
    	<div class="headLeft"><i class="mui-icon mui-icon-search"></i></div>
    	<div class="headTitle">上海市徐汇区华泾绿苑</div>
    	<div class="headRight">
    		<span><router-link to='/'>登录|注册</router-link></span>
    	</div>
    </header> -->
	<headTop title='上海市徐汇区华泾绿苑'>
		<div class="headLeft" slot='left'><i class="mui-icon mui-icon-search" @click="jumpTo('/search')"></i></div>
		<div class="headRight" slot='right'>
			<span><router-link to='/self'>登录|注册</router-link></span>
		</div>
	</headTop>
	<div class="bannerDownload">
		<img src="http://ms0.meituan.net/touch/img/download_banner.png" alt="">
		<span></span>
		<span></span>
	</div>
	<div class="foodContent">
		<div class="mui-slider">
			<div class="mui-slider-group mui-scroll-wrapper">
				<div class="mui-slider-item">
					<div class="swiper">
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
						<a href="" class="list"><img src=""><span>甜品饮品</span></a>
					</div>
				</div>
				<div class="mui-slider-item">
					<div class="swiper"><a href="" ><img src=""><span>甜品饮品</span></a></div>
				</div>
				<div class="mui-slider-item">
					<div class="swiper"><a href="" ><img src=""><span>甜品饮品</span></a></div>
				</div>
			</div>
		</div>
	</div>
    <div class="foodFooter">
    	<div class="guess-like">猜你喜欢</div>
    	<div class="footerShop">
    		<div class="food" v-for="(value,key) in shops" @click="navigate('/shop/order',key)">
				<span class="foodLeft"><img v-lazy="value.businessImg" alt=""></span>
	    		<div class="foodRight">
	    			<p>
	    				<span>{{value.businessName}}</span>
	    			</p>
	    			<p>
						<span class="col">￥{{value.averagePrice}}/人</span>
						<span class="col">{{value.distance}}</span>
	    			</p>
					<p>
						<span>{{value.place}}</span>
	    				<span>{{value.service}}</span>
	    			</p>
	    		</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>

import headTop from '../headTop/headTop.vue'
import axios from "axios"
import {mapState} from 'vuex'

export default {
  name: 'index',
  components:{
	headTop  
  },
  data () {
    return {
      businessData:''
    }
  },
  mounted(){
	this.mui(".mui-slider").slider({
            // interval: 5000
        });
  },
  computed:{
	...mapState(['shops'])
  },
  methods:{
	  jumpTo(path){
		this.$router.replace(path);  
	  },
	  navigate(path,key){
		let local = [];
		let storage = {};
		storage["id"] = this.$store.state.shops[key].id;
		storage["businessName"] = this.$store.state.shops[key].businessName;
		local.push(storage);

		localStorage.setItem("indexData",JSON.stringify(local));
		this.$router.push({
			path:path,
			name:"order",
			query:{
				id:this.$store.state.shops[key].id,
				businessName:this.$store.state.shops[key].businessName
			}
		});
	  },
	  
  },
  created(){
		
	  // console.log(this.businessData);
	  // var that = this;
	  // this.$axios.get('/static/business.json').then(function(response){
		 //  that.businessData = response.data.data;
		 //  console.log(response.data.data);
		 //  console.log(that.businessData[0].businessName);
	  // }).catch(function(error){
		 //  
	  // })
  },
  beforeRouteLeave(to, from, next) {
  	if(to.path == '/shop/order'){
		console.log();
  	}else{
		
	}		
	next();
  }
	
}
</script>

<style scoped>
	.index{
		background: #f8f8f8;
	}
	/* .headLeft,.headTitle,.headRight{
		display: flex;
		text-align: center;
	}
	.headLeft,.headTitle{
		justify-content:center;
		align-items: center;
	}
	.headLeft{
		font-size: 20px;	
		flex: 2;
	}
	.headTitle{
		flex:6;
	}
	.headRight{
		flex:2;
		padding-right: 10px;
	}
	.headRight span a{
		color: #fff;
	}
	.foodHeader{
		width: 100%;
		height:1.01rem;
		text-align: center;
		line-height: 1.01rem;
		color: #fff;
		background: #06c1ae;
		display: flex;
		flex-direction: row;
	} */
	.bannerDownload{
		width: 100%;
		height: 2.1rem;
		border-bottom: 1px solid #c6c0b3;
	}
	.bannerDownload img{
		width: 100%;
		height: 100%;
	}
	.swiper{
		background: #fff;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		text-align: center;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 3.2rem;
	}
	.list{
		display: flex;
		flex-direction: column;
		width: 20%;
		height: 50%;
		padding: 0.2rem;
		/* height: 3.1rem; */
	}
	.list img{
		flex: 8;
	}
	.list span{
		font-size: 0.24rem;
		color:#666;
		flex: 1;
		margin-bottom: 0.1rem;
		text-align: center;
	}
	.foodFooter{
		background: #fff;
		/* border-top: 1px solid #DDD8CE; */
		margin-top: .2rem;
		padding-left: 0.2rem;
	}
	.guess-like{
		font-size: .34rem;
		padding: 0.2rem 0;
		color: #333;
		border-bottom: 1px solid #c6c0b3;
	}
	.footerShop{
		background: #fff;
		display: flex;
		flex-direction: column;
	}
	.food{
		display: flex;
		flex-direction: row;
		height: 1.8rem;
		border-bottom: 1px solid #DDD8CE;
	}
	.foodLeft{
		flex: 2.5;
		/* border-right: 1px solid #ccc; */
		padding-top: 0.14rem;
		padding-bottom: 0.14rem;
	}
	.foodLeft img{
		width: 100%;
		height: 100%;
	}
	.foodRight{
		position: relative;
		padding-top: 10px;
		margin-left: 10px;
		flex: 7.5;
	}
	.foodRight p{
		margin-bottom: 0.16rem;
		padding-right: 0.1rem;
	}
	.foodRight span{
		font-family: "microsoft sans serif";
		margin-right: 0.1rem;
	}
	.foodRight p:first-of-type span{
		color: #000000;
		font-weight: bold;
		font-size: 17px;
	}
	.col:first-of-type{
		font-size: 0.3rem;
		color: #06c1ae;
	}
	.col:last-of-type{
		position: absolute;
		right: 0.1rem;
	}
</style>