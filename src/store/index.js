import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import goods from './modules/goods';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    goods
  },
  plugins: [
    createPersistedState({
      key: 'sale-course-goods', // 存储的key
      paths: ['goods.goodsList', 'goods.categories'], // 需要持久化的数据
      storage: window.localStorage // 存储方式
    })
  ]
});
