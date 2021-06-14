import Vue from 'vue'
import Router from 'vue-router'
const index = () => import ('@/components/index/index')
const self = () => import ('@/components/self/self')
const login = () => import ('@/components/person/login')
const type = () => import ('@/components/person/type')
const search = () => import ('@/components/search/search')
const shop = () => import ('@/components/shop/shop')
const deal = () => import ('@/components/deal/deal')
const order = () => import ('@/components/order/order')
const estimate = () => import ('@/components/order/estimate')
const business = () => import ('@/components/order/business')
const cart = () => import ('@/components/cart/cart')

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'index',
      component: index,
			meta:{
				keepAlive:false,
				showFooter:true
			}
    },
    {
      path: '/search',
      name: 'search',
      component: search,
			meta:{
				keepAlive:false,
				showFooter:true
			}
    },
	{
		path: '/cart',
		name: 'cart',
		component: cart,
		meta:{
				keepAlive:false,
				showFooter:true
			}
	},
    {
      path: '/shop',
      name: 'shop',
      component: shop,
			meta:{
				showFooter:true
			},
			children:[
				{
					path: '/shop/order',
					name: 'order',
					component: order,
					meta:{
						type:'login',
						keepAlive:true,
						showFooter:false
					}
				},
				{
					path: '/shop/estimate',
					name: 'estimate',
					component: estimate,
					meta:{
						keepAlive:false,
						showFooter:false
					}
				},
				{
					path: '/shop/business',
					name: 'business',
					component: business,
					meta:{
						keepAlive:false,
						showFooter:false
					}
				}
			]
    },
	{
	  path: '/self',
	  name: 'self',
	  component: self,
	  meta:{
		keepAlive:false,
	  	showFooter:true
	  },
	  redirect:'/self/login',
	  children:[
		{
		  path: '/self/type',
		  name: 'type',
		  component: type,
		  meta:{
			  keepAlive:false,
		  	showFooter:true
		  }
		},
		{
		  path: '/self/login',
		  name: 'login',
		  component: login,
		  meta:{
				keepAlive:false,
		  	showFooter:true
		  }
		},
	  ]
	},
	{
	  path: '/deal',
	  name: 'deal',
	  component: deal,
	  meta:{
			keepAlive:false,
	  	showFooter:false
	  }
	},
  ]
})
