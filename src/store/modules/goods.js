import { ElMessage } from 'element-plus';

export default {
  namespaced: true,
  state: {
    goodsList: [],
    categories: [],
    cartItems: [], // 购物车商品列表
  },
  getters: {
    getGoodsList: state => state.goodsList,
    getCategories: state => state.categories,
    getCartItems: state => state.cartItems, // 获取购物车商品
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
    },
    ADD_TO_CART(state, goods) {
      // 检查商品是否已在购物车中
      const existingItem = state.cartItems.find(item => item.goodsId === goods.goodsId);
      if (!existingItem) {
        state.cartItems.push({
          ...goods,
          selected: false, // 添加选中状态字段
        });
      }
    },
    REMOVE_FROM_CART(state, goodsIds) {
      state.cartItems = state.cartItems.filter(item => !goodsIds.includes(item.goodsId));
    },
    TOGGLE_CART_ITEM_SELECT(state, { goodsId, selected }) {
      const item = state.cartItems.find(item => item.goodsId === goodsId);
      if (item) {
        item.selected = selected;
      }
    },
    TOGGLE_ALL_CART_ITEMS(state, selected) {
      state.cartItems.forEach(item => {
        item.selected = selected;
      });
    },
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
    },
    addToCart({ commit }, goods) {
      commit('ADD_TO_CART', goods);
    },
    removeFromCart({ commit }, goodsIds) {
      commit('REMOVE_FROM_CART', goodsIds);
    },
    toggleCartItemSelect({ commit }, payload) {
      commit('TOGGLE_CART_ITEM_SELECT', payload);
    },
    toggleAllCartItems({ commit }, selected) {
      commit('TOGGLE_ALL_CART_ITEMS', selected);
    },
  },
};
