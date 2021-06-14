import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    tot:'',
    dis:''
  },
  mutations:{
    set(state,tot){
      state.tot=tot;
    },
    set(state,dis){
      state.dis=dis;
    }
  }
})
// export const store = new Vuex.Store({
//   // 设置属性
//   // state: {
//   //   isLogin: false,
//   // },

//   // // 获取属性的状态
//   // getters: {
//   //   //获取登录状态
//   //   isLogin: state => state.isLogin,
//   // },

//   // // 设置属性状态
//   // mutations: {
//   //   //保存登录状态
//   //   userStatus(state, flag) {
//   //     state.isLogin = flag
//   //   },
//   // },

//   // // 应用mutations
//   // actions: {
//   //   //获取登录状态
//   //   setUser({commit}, flag) {
//   //     commit("userStatus", flag)
//   //   },
//   // }

// })