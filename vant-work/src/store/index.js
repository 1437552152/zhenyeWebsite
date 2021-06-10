
import { createStore } from 'vuex'

export default createStore({
    state: {
        count: 0
    },
    mutations: {
        add(state){
            state.count++;
        },
        addN(state,action){
            state.count+=action.n;
        }
    },
    actions: {
       add(context){
           setTimeout(()=>{
               context.commit('addN',{n:100});
           },3000)
        
       }
    },
    getters: { 
       
       
    }
})