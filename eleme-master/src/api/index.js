import {shops} from './api'

export function mineBaseMsgApi(url){	
	console.log('通过api.js请求成功');
	return shops(url,'get');
}

