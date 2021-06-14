import{
	RECEIVE_DETAIl,
	RECEIVE_SHOPS
}from './mutations-types'
//引入接口函数
import {mineBaseMsgApi} from '../api'

export default{
	async getShops({commit}){
		//发送请求
		const result = await mineBaseMsgApi('/static/business.json');
		//提交mutation
		if(result.code==200){
			const shops = result.data;
			commit(RECEIVE_SHOPS,{shops});
		}
	},
	async getDetails({commit}){
		//发送请求
		const result = await mineBaseMsgApi('/static/detail.json');
		//提交mutation
		if(result.code==200){
			const details = result.data;
			commit(RECEIVE_DETAIl,{details});
		}
	},
}