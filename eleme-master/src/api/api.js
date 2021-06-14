import axios from 'axios'

export function shops(url,type){
	return new Promise((resolve,reject) =>{
		if(type =='get'){
			axios.get(url).then(response=>{
				console.log('get请求');
				resolve(response.data);
			}).catch((error)=>{
				console.log(error);
				reject(error)
			})
		}else{
			axios.post(url).then(response=>{
				console.log('post请求');
				resolve(response.data);
			}).catch((error)=>{
				console.log(error);
				reject(error)
			})
		}
		
	})
}

