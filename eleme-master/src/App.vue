<template>
  <div id="app">
	  
		<keep-alive >
			<router-view v-if="$route.meta.keepAlive"></router-view>	
		</keep-alive>
	<!-- 	<keep-alive include="shop">
			<router-view v-if="isRouterAlive"></router-view>
		</keep-alive> -->
			<router-view  v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>	
		
		<keep-alive include="common">
			<common v-show="$route.meta.showFooter"></common>
		</keep-alive>
		
    
  </div>
</template>

<script>
import common from "./components/footer/common.vue"

export default {
	name: 'app',
	data(){
		return {
			isRouterAlive:true
		}
	},
	mounted(){
		this.$store.dispatch('getShops');
		this.$store.dispatch('getDetails');
	},
	provide(){
		return {
			reload:this.reload
		}
	},
	components:{
		common
	},
	methods:{
		reload(){
			this.isRouterAlive = false;
			this.$nextTick(function(){
				this.isRouterAlive = true;
			})
		}
	},
	beforeRouteEnter(to, from, next) {
      next(vm => {
          // 通过 `vm` 访问组件实例
            if (from.fullPath == '/' && to.fullPath == '/order') {//一定是从A进到B页面才刷新
                // vm.updata();//updataB是本来写在mounted里面的各种
            }
      })
	}
	// beforeRouteLeave(to,from,next){
	// 	  if(to.name == 'deal'){
	// 		  console.log(2);
	// 		  if(!from.meta.keepAlive){
	// 				from.meta.keepAlive = true;
	// 			}
	// 			next();
	// 	  }else{
	// 		  from.meta.keepAlive = false;
	// 		  to.meta.keepAlive = false;
	// 		  this.$destroy();
	// 		  next();
	// 	  }
	// }
}

</script>

<style>
*{ 
	touch-action: pan-y;
	list-style: none;
}
[v-cloak] {
    display: none !important;
}
.el-message-box{
	width: 90%;
	margin-top: -100%;
}

</style>
