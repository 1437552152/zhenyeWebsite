<template>
  <div class="search">
      <headTop title='搜索'>      	
      </headTop>
			<div class="searchDiv">
				<el-input placeholder="请输入商家名" prefix-icon="el-icon-search" class="searchInput" v-model="inputText" @keyup.native="searchKeyup(shops)"></el-input>
				<el-button icon="el-icon-search" plain @click="searchFood(shops)"></el-button>
			</div>
			<div class="searchUl" v-bind:style="{display:ulList.length>0?'block':'none'}">
				<ul>
					<li v-for="(value,key) in ulList" @click="searchUl(shops,key)">{{value.businessName}}</li>
				</ul>
			</div>
			 <div class="foodFooter">
				<div class="footerShop">
					<div class="food" v-for="(value,key) in shopList" @click="navigate('/shop/order',key)">
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
  name: 'search',
	components:{
		headTop  
	},
  methods:{
		 navigate(path,key){
				this.$router.push({
					path:path,
					name:"order",
					params:{
						id:this.$store.state.shops[key].id
					}
				});
		},
		searchKeyup(shops){
			this.ulList = [];
			if(this.inputText.length>0){
				shops.filter(item => {
					if(item.businessName.search(this.inputText) !==-1){
						this.ulList.push(item);
					}
				})
			}
		},
		searchUl(shops,key){
			this.shopList = [];
			this.inputText = "";
			shops.filter(item => {
				if(item.businessName == this.ulList[key].businessName){
					this.shopList.push(item);
					this.ulList = [];
					
				}
				return this.shopList;
			})
			
		},
    searchFood(shops){
			this.shopList = [];
			this.ulList = [];
			if(!this.inputText){
				this.$alert('请输入内容', '错误提示', {
				  confirmButtonText: '确定',
				});
			}else{
				//过滤器过滤输入框中的值是否匹配，放在显示的数组中
				shops.filter(item => {
					if(item.businessName.search(this.inputText) !==-1){
						this.shopList.push(item);
					}

				})
				//如果没有匹配的值，则弹窗提醒
				if(this.shopList.length <= 0){
					this.$alert('没有搜到相关商家信息', '错误提示', {
					  confirmButtonText: '确定',
					});
					// 最后返回所有匹配的值
				}else{
					this.inputText = "";
					return this.shopList;
				}
			}
			
			
		}
  },
  data () {
    return {
      inputText:'',
			shopList:[],
			ulList:[]
    }
  },
	 computed:{
		...mapState(['shops'])
	},
}
</script>

<style scoped>
	.searchDiv{
		margin-left: 5%;
		margin-top: 10%;
		position: relative;
	}
	.searchInput{
		width: 80%;
		height: 0.2rem;
		line-height: 0.2rem;
	}
	.searchUl{
		position: absolute;
		z-index: 100;
		width: 76%;
		margin-top: 0rem;
		margin-left: 5%;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, .2);
	}
	ul{
		width: 100%;
		margin: 0;
		background: #fff;
		padding: 0;
	}
	.searchUl li{
		width: 100%;
		padding: 0.1rem 0.2rem;
		border-bottom: 1px dotted rgba(0, 0, 0, .2);
	}
	.foodFooter{
		background: #fff;
		/* border-top: 1px solid #DDD8CE; */
		margin-top: .7rem;
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
