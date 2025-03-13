export default {
  namespaced: true,
  state: {
    goodsList: [],
    categories: []
  },
  getters: {
    getGoodsList: state => state.goodsList,
    getCategories: state => state.categories
  },
  mutations: {
    SET_GOODS_LIST(state, list) {
      state.goodsList = list;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_GOODS(state, goods) {
      state.goodsList.push(goods);
    },
    DELETE_GOODS(state, goodsId) {
      state.goodsList = state.goodsList.filter(item => item.id !== goodsId);
    }
  },
  actions: {
    setGoodsList({ commit }, list) {
      commit('SET_GOODS_LIST', list);
    },
    setCategories({ commit }, categories) {
      commit('SET_CATEGORIES', categories);
    },
    addGoods({ commit }, goods) {
      commit('ADD_GOODS', goods);
    },
    deleteGoods({ commit }, goodsId) {
      commit('DELETE_GOODS', goodsId);
    }
  }
};