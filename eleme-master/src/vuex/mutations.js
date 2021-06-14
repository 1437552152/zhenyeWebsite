import{
	RECEIVE_DETAIl,
	RECEIVE_SHOPS
}from './mutations-types'

export default{
	[RECEIVE_DETAIl] (state,{details}){
		state.details = details
	},
	
	[RECEIVE_SHOPS] (state,{shops}){
		state.shops = shops
	}
}