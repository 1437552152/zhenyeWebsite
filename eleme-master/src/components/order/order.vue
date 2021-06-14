<template>
  <div class="order">
	  <div class="footBot">
		  <div class="botLeft">
			  <ul class="leftNav">
				  <li class="list light"><a href="">热销</a></li>
				  <li class="list"><a href="">招牌美食</a></li>
				  <li class="list">折扣热季</li>
				  <li class="list">当季新品</li>
				  <li class="list">店长推荐</li>
				  <li class="list">活动专区</li>
			  </ul>
		  </div>
		  <div class="botRight">
			  <div class="detail" v-for="(value,key) in shopList">
			  	<span class="detailLeft"><img v-lazy="value.businessImg" alt=""></span>
			  	<div class="detailRight">
			  		<p>
			  			<span>{{value.businessName}}</span>
			  		</p>
			  		<p>
			  			<span>{{value.essay}}</span>
						
			  		</p>
					<p>
						<span>{{value.service}}</span>
					</p>
					<p>
						<span class="col">￥{{value.averagePrice}}</span>
					</p>
					<button class="mui-btn mui-btn-primary showStatus" @click="delShop(key)" v-if="value.showStatus">-</button>
					<span class="showSpan" v-if="value.showStatus">{{value.currentNum}}</span>
					<button class="mui-btn mui-btn-primary" @click="addShop(key)">+</button>
			  	</div>
			  </div>
		  </div>
	  </div>
	  <div class="footFix">
		<div class="fixBot">
			<div class="fixLeft">
				<span class="spno"><i class="el-icon-shopping-cart-2"></i></span>
				<span class="spHigh" v-bind:style="{display:tot>0?'block':'none'}"><i class="el-icon-shopping-cart-2"></i></span>
				<span v-show="tot">{{tot}}</span>
			</div>
			<div class="fixMid">￥{{totalMoney}}</div>
			<div class="fixRight" v-bind:class="{bac:tot>0? '':'bac'}"><button @click="getDetail()" class="btn" v-bind:disabled="dis">去结算</button></div>
		</div>
	  </div>
  </div>
</template>

<script>
import axios from "axios"
import {mapState} from 'vuex'

export default {
  name: 'order',
  data () {
    return {
		dis:true,
		tot:'',
		id:'',
		totalNums:0,
		businessName:'',
		// ind:{},
		shopList:[]
    }
  },
  activated(){
	  // console.log(this.tot);
	  // let that=this;
	  // if(this.tot++){
		 //  console.log("aaaa");
	  // }
  },
  created(){
	  window.addEventListener("beforeunload",()=>{
			if(sessionStorage.getItem("details")){
				console.log("第2+次刷新");
				sessionStorage.removeItem("details");
			}
			sessionStorage.setItem("details",JSON.stringify(this.$store.state.details))

	  })
	this.getParams();
  },
  mounted(){
	this.getShoplist();
  },
  updated(){
	if(this.tot>0){
		this.dis = false;
	}else{
		this.dis = true;
	}
  },
  computed:{
	...mapState(['details']),
	// ...mapState(['shops']) ,

	totalMoney(){
		let totalMoney = 0;
		for(var i=0;i<this.shopList.length;i++){
			if(this.shopList[i].currentNum>0){
				totalMoney = totalMoney + Number((this.shopList[i].currentNum)*(this.shopList[i].averagePrice));
			}
		}
		return totalMoney;
	},
	
  },
  methods:{
	addShop(key){
		this.tot++;
		this.shopList[key].currentNum++;
		if(this.shopList[key].currentNum > 0){
			this.shopList[key].showStatus = true;
		}
		// for(var i=0;i<this.shopList.length;i++){
		// 	if(this.shopList[i].currentNum>0){
		// 		this.totalNums = Number((this.shopList[i].currentNum)*(this.shopList[i].averagePrice));
		// 	}
		// 		
		// }
	},
	delShop(key){
		this.tot--;
		this.shopList[key].currentNum--;
		if(this.shopList[key].currentNum <= 0){
			this.shopList[key].showStatus = false;
		}
	},
	getParams(){
		if(this.$route.query.id === undefined){
			let result = localStorage.getItem("indexData");
			let jsonResult = JSON.parse(result);
			// console.log(jsonResult[0].id);
			this.id = jsonResult[0].id;
			this.businessName = jsonResult[0].businessName;
			// this.shopList =
		}else{
			this.id = this.$route.query.id;
			this.businessName = this.$route.query.businessName;
		}	
	},
	getShoplist(){
		if(sessionStorage.getItem("details")){
			let detailsJosn = sessionStorage.getItem("details");
			let details = JSON.parse(detailsJosn);
			for(var i=0;i< details.length;i++){
				if(this.id == details[i].id){
					this.shopList = details[i].detail;
				}
			}
		}else{
			for(var i=0;i< this.$store.state.details.length;i++){
				if(this.id === this.$store.state.details[i].id){
					this.shopList = this.$store.state.details[i].detail;
				}
			}
		}	
	},
	getDetail(){
		this.$router.push({
			path:"/deal",
			name:"deal",
			query:{
				businessName:this.businessName,
				shopList:this.shopList,
				totalMoney:this.totalMoney
				// id:this.$store.state.details[key].id
			}
		});
	}
  },
   beforeRouteLeave(to, from, next) {
  	if(to.path == '/deal'){
  		from.meta.keepAlive = true;
  	}else{
  		from.meta.keepAlive = false;
  	}		
  	next();
  }
   
}
</script>

<style scoped>
	.spno{
		position: absolute;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		/* height: inherit; */
		background: #363636;
		border-radius: 0.6rem;
		right: 0;
		top:-0.4rem;
		text-align: center;
		line-height: 1.6rem;
	}
	.spno i,.spHigh i{
		font-size:0.6rem;
	}
	.spHigh{
		position: absolute;
		display: block;
		width: 1.0rem;
		height: 1.0rem;
		/* height: inherit; */
		background: #3190e8;
		border-radius: 0.5rem;
		right: 0.1rem;
		top:-0.3rem;
		color: #fff;
		text-align: center;
		line-height: 1.3rem;
	}
	.fixLeft span:last-of-type{
		position: absolute;
		line-height: 0.3rem;
		/* display: block;
		width: 1.2rem;
		height: 1.2rem; */
		/* height: inherit; */
		width: 0.3rem;
		height: 0.3rem;
		background: #ff3c15;
		border-radius: 0.3rem;
		right: 0.1rem;
		top:-0.4rem;
		color: #fff;
		text-align: center;
		font-size: 0.32rem;	
	}
	
	.order{
		margin-top: 0.05rem;
		position: relative;
		z-index: 1;
	}
	.footBot{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	.botLeft{
		flex: 2.1;
		height: auto;
		background: #f8f8f8;
	}
	.botRight{
		flex: 7.9;
		height: auto;
		background: #fff;
		margin-left:0.01rem;
	}
	.leftNav{
		width: inherit;
		height: 100%;
		padding: 0;
		text-align: center;
	}
	.list{
		display: block;
		list-style: none;
		width: inherit;
		text-align: center;
		padding: 0.35rem 0.1rem;
		font-size: 0.28rem;
		color: #333;
	}
	.list a{
		color: #333;
		display: block;
		width: 100%;
		height: inherit;
	}
	.light{
		background: #fff;
	}
	.detail{
		display: flex;
		flex-direction: row;
		height: 2.2rem;
		border-bottom: 1px solid #DDD8CE;
	}
	.detailLeft{
		flex: 3.5;
		/* border-right: 1px solid #ccc; */
		padding-top: 0.14rem;
		padding-bottom: 0.14rem;
	}
	.detailLeft img{
		width: 100%;
		height: 100%;
	}
	.detailRight{
		position: relative;
		padding-top: 10px;
		margin-left: 10px;
		flex: 6.5;
	}
	.detailRight p{
		margin: 0;
		padding-right: 0.1rem;
	}
	.detailRight p:nth-of-type(2){
		margin-top: 0.01rem;
		font-size: 0.2rem;
	}
	.detailRight p:nth-of-type(3){
		margin-top: 0.01rem;
		font-size: 0.2rem;
	}
	.detailRight p:last-of-type{
		width: inherit;
		height: 0.4rem;
		position: absolute;
		bottom: 0.1rem;
	}
	.detailRight span{
		font-family: "microsoft sans serif";
		margin-right: 0.1rem;
	}
	
	.detailRight p:first-of-type span{
		color: #000000;
		font-weight: bold;
		font-size: 0.28rem;
	}
	.col{
		position: absolute;
		left: 0.1rem;
		font-size: 0.3rem;
		color: #FF0000;
		
	}
	.mui-btn{
		position: absolute;
		right: 0.1rem;
		bottom: 0.05rem;
		width: 0.5rem;
		height: 0.5rem;
		text-align: center;
		padding: 0;
		background: #2396ff;
		border-radius: 0.25rem;
	}
	.showStatus{
		position: absolute;
		right: 1rem;
		bottom: 0.05rem;
		width: 0.5rem;
		height: 0.5rem;
		text-align: center;
		padding: 0;
		background: #2396ff;
		border-radius: 0.25rem;
	}
	.showSpan{
		display: block;
		position: absolute;
		right: 0.5rem;
		bottom: 0.02rem;
		width: 0.5rem;
		height: 0.5rem;
		text-align: center;
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

