import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: [],
  },
  mutations: {
    goodsList_vuex(state, params) {
      this.state.goodsList = params
    },
    changeNum(state, { name, num }) {
      for (let item of state.goodsList) {
        for (let goods of item.foods) {
          if (goods.name == name) {
            goods.num += num;
          }
        }
      }
    },
    clearShopcarList_vuex(state){
      for(let i of state.goodsList){
        for(let j of i.foods){
          j.num=0
        }
      }
    }
  },
  getters:{
    //筛选购物车的不为0的数据
    shopcarList(state){
      let shopcarArr=[]
      for(let i of state.goodsList){
        for(let j of i.foods){
          if(j.num>0){
            shopcarArr.push(j)
          }
        }
      }
      // console.log(shopcarArr)
      return shopcarArr
    },
  },
  
  actions: {
  },
  modules: {
  }
})
