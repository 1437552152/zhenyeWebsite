<template>
  <div class="cart">
		<headTop title='订单列表'>
		</headTop>
		<div class="bannerDownload">
			<img src="http://ms0.meituan.net/touch/img/download_banner.png" alt="">
			<span></span>
			<span></span>
			<div><img src="" alt=""></div>
		</div>
		
		<div v-bind:class="{ts:msite == false ?'':'ts'}" v-if="msite">当前没有订单</div>
		<div class="foodFooter">
			<div class="guess-like">订单</div>
			<div class="footerShop">
				<div class="food" v-for="(value,key) in arr">
		    		<p>
		    			<span class="bus">{{value.businessName}}</span>
						<span class="col">总价:￥{{value.totalMoney}}</span>
		    		</p>
		    		<p>
						<span class="col">送达时间:{{value.Data}}</span>
						<el-button type="primary" class="delBtn" @click="deleteOrder(key)">取消订单</el-button>
		    		</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import headTop from '../headTop/headTop.vue'
import axios from "axios"

export default {
	name: 'cart',
	data(){
		return {
			arr:[],
			msite:false
		}
	},
	inject:['reload'],

	mounted(){
		this.$axios.get('/api/getCart').then((res)=>{
			if(res.data.length>0){
				this.msite = false;
				this.arr = res.data;
			}else{
				this.msite = true;
			}
		})
	},
	components:{
		headTop  
	},
	methods:{
		deleteOrder(key){
			this.$axios.post('/api/deleteCart',{
				params:{
					Data:this.arr[key].Data
				},
			}).then((res)=>{
				this.$alert('取消订单成功', '删除提示', {
				  confirmButtonText: '确定',
				});
				this.reload();			
			})
		}
	},
	computed:{

	}
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
	.ts {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0.9rem;
		left: 0;
		z-index: 998;
		background-color: rgba(0,0,0,.3);
		text-align: center;
		padding-top: 70%;
		font-size: 0.4rem;
		color: #fff;
	}
	.foodFooter{
		margin-top: 0.2rem;
		background: #fff;
		padding-left: 0.2rem;
	}
	.guess-like{
		padding: 0.1rem 0;
		width: 100%;
		font-size: 0.3rem;
		font-weight: 550;
		border-bottom: 1px dotted #DDD8CE;
	}
	.footerShop{
		padding: 0.2rem 0;
		font-size: 0.3rem;
	}
	.bus{
		display: inline-block;
		font-size: 0.35rem;
		font-weight: 550;
		margin-right: 0.2rem;
		width: 3.4rem;
		height: 0.42rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.food p{
		font-size: 0.31rem;
		color: #000000;
		font-weight: 500;
		font-family: "microsoft yahei";
	}
	.col:nth-of-type(2){
		color: #ff0000;
	}
	p:last-of-type{
		position: relative;
		
	}
	.delBtn{
		position: absolute;
		top:-0.1rem;
		right: 0.4rem;
		width: 1.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		padding: 0;
	}
</style>
