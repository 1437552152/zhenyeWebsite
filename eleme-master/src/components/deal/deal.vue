<template>
  <div class="deal">
		<headTop title='确认订单'>
			<div class="headLeft" slot='left'><i class="mui-icon mui-icon-back" @click="backBefor()"></i></div>
		</headTop>
		<div class="bannerDownload">
			<img src="http://ms0.meituan.net/touch/img/download_banner.png" alt="">
			<span></span>
			<span></span>
			<div><img src="" alt=""></div>
		</div>
		<div class="arriveTime">
			<div class="arrive">
				<ul>
					<li>送达时间<span>{{Data}}</span></li>
					<li>支付方式<span>在线支付</span></li>
				</ul>
			</div>
		</div>
		<div class="orderList">
			<div class="ord">
				<h1>{{businessName}}</h1>
				<ul>
					<li  v-for="(value,key) in shopList" class="list">
						<img :src="value.businessImg" alt="">
						<span>{{value.businessName}}</span>
						<span>X{{value.currentNum}}</span>
						<span>￥{{value.averagePrice}}</span>
					</li>
					<li class="list">
						<img src="" alt="">
						<span>餐盒</span>
						<span>1</span>
						<span>￥{{canhe}}</span>
					</li>
					<li class="list">
						<img src="" alt="">
						<span>配送费</span>
						<span>1</span>
						<span>￥{{peisong}}</span>
					</li>
					<li class="list">
						<img src="" alt="">
						<span>店铺满减优惠</span>
						<span></span>
					</li>
					<li class="list">
						<img src="" alt="">
						<span>红包</span>
						<span></span>
					</li>
				</ul>
			</div>
			
		</div>
		<div class="footFix">
				<div class="fixBot">
					<div class="fixLeft">
						<span class="spno"></span>
						<span class="spHigh" ></span>
						<span ></span>
					</div>
					<div class="fixMid">￥{{this.totalMoney}}</div>
					<div class="fixRight" ><button class="btn" @click="goCart">去支付</button></div>
				</div>
		</div>
  </div>
</template>

<script>
import headTop from '../headTop/headTop.vue'
import axios from "axios"

export default {
	name: 'deal',
	components:{
		headTop  
	},
	created(){
		
	},
	mounted(){
		this.arriveTime();
	},
	computed:{
		totalMoney(){
			if(this.$route.query.totalMoney === undefined){
				return 0;
			}else{
				let totalMoney = 0;
				totalMoney = this.$route.query.totalMoney +this.canhe+this.peisong;
				return totalMoney;
			}
			
		},
		shopList(){
			if(this.$route.query.shopList === undefined){
				return 0;
			}else{
				let shopList = [];
				for(var i=0;i<this.$route.query.shopList.length;i++){
					if(this.$route.query.shopList[i].currentNum>0){
						shopList.push(this.$route.query.shopList[i]);
					}
				}
				return shopList;
			}
			
		},
		businessName(){
			if(this.$route.query.businessName === undefined){
				return 0;
			}else{
				let businessName = '';
				return businessName = this.$route.query.businessName;
			}
		}
	},
  methods:{
		arriveTime(){
				var date = new Date();
				var minutes = date.getMinutes();
				minutes = minutes + 20;
				var hour = date.getHours();
				var seconds = date.getSeconds();
				if(minutes>60){
					minutes = minutes-60;
					if(minutes<10){
						minutes = "0"+minutes;
					}
					hour = hour+1;
				}
				if(seconds<10){
					seconds = "0"+seconds;
				}
				this.Data = hour+":"+minutes+":"+seconds;
		},
		
		
		goCart(){
			console.log(this.businessName);
			this.$axios.post('/api/insertCart', {
				params: {
					businessName:this.businessName,
					totalMoney:this.totalMoney,
					Data:this.Data
				},
			}).then((res) => {
				if(res){
					console.log(res);
					if(res.data.affectedRows>0){
						this.$router.replace('/cart');
					}else{
						this.$alert('支付错误,请重新支付', '错误提示', {
						  confirmButtonText: '确定'
						});
					}
				}
			})
		}
  },
  data () {
    return {
		canhe:5,
		peisong:5,
		// shopList:[],
		// totalMoney:'',
		// businessName:'',
		Data:'',
		timeId:''
    }
  }
}
</script>

<style scoped>
	.arriveTime{
		width: 95%;
		height: 2rem;
		background: #fff;
		margin-left: 2.5%;
		margin-top: 0.2rem;
		padding: 0.2rem 0.2rem 0.2rem 0.4rem;
	}
	.arrive ul{
		padding: 0;
	}
	.arrive ul li{
		position: relative;
		width: inherit;
		padding: 0.2rem 0;
	}
	.arrive ul li:first-of-type{
		border-bottom: 1px dotted #eee;
	}
	.arrive ul li span{
		position: absolute;
		right: 0.5rem;
		font-weight: 400;
	}
	.deal{
		background:#06c1ae;
	}
	.orderList{
		width: 95%;
		height: 10rem;
		background: #fff;
		margin-left: 2.5%;
		margin-top: 0.2rem;
		padding: 0.2rem 0.2rem 0.2rem 0.4rem;
	}
	.ord{
		width: inherit;
		height: inherit;
	}
	.ord h1{
		font-size: 0.35rem;
		font-weight: 700;
	}
	.ord ul{
		width: inherit;
		padding: 0;
		border-top: 1px dotted #eee;
		margin-top: 0.2rem;
	}
	.list{
		width: inherit;

		display: flex;
		flex-direction: row;
		padding: 0.15rem 0;
		border-bottom: 1px dotted #eee;
	}
	.list span{
		font-size: 0.25rem;
	}
	.list img{
		width: 0.8rem;
		height: 0.8rem;
	}
	.list span:first-of-type{
		margin-left: 0.15rem;
		flex: 7;
	}
	.list span:nth-of-type(2){
		flex:6;
		margin-left: 0.5rem;
	}
	.list span:last-of-type{
		flex:1;
		/* margin-right: -0.5rem; */
	}
	.bannerDownload{
		width: 100%;
		height: 2.1rem;
		border-bottom: 1px solid #c6c0b3;
	}
	.bannerDownload img{
		width: 100%;
		height: 100%;
	}
	.footFix{
		position: fixed;
		width: 100%;
		height: 0.9rem;
		z-index: 2;
		bottom: 0;
		background: black;
		/* background-color: rgba(61,61,63,.9); */
	}
	.fixBot{
		background-color: rgba(61,61,63,.9);
		position: relative;
		width: 100%;
		height: 1rem;
		z-index: 3;
		display: flex;
		flex-direction: row;
	}
	.fixLeft{
		position: relative;
		height: inherit;
		flex: 2.5;
	}
	.fixMid{
		flex: 4.5;
		height: inherit;
		color: #fff;
		font-size: .5rem;
		text-align: left;
		line-height: 0.9rem;
	}
	.fixRight{
		height: inherit;
		flex: 3;
		background: #38ca73;
		text-align: center;
		line-height: 0.9rem;
		
	}
	.bac{
		background: #ccc;
	}
	.btn{
		display: block;
		width: 100%;
		height: 100%;
		color: #fff;
		background: none;
		font-weight: 700;
		font-size: 0.3rem;
	}
</style>
