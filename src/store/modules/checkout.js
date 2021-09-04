const state = {
  cart: {
    credentials: {},
    paymentMethod: {},
    shippingMethod: {},
    coupon: '',
    products: [],
    total: 0,
    comment: '',
    statue: false,
    newsletter: false,
  },
  total: 0,
};

const getters = {
  cartProducts: (state) => state.cart.products,
  shipmentPrice: (state) =>
    state.cart.shippingMethod.price ? state.cart.shippingMethod.price : 0,
  coupon: (state) => (state.cart.coupon ? state.cart.coupon : 1),
  paymentId: (state) => state.cart.paymentMethod.id,
};

const actions = {
  getCredentials({ commit }, data) {
    commit('setCredentials', data);
  },
  getShippingMethod({ commit }, data) {
    commit('setShippingMethod', data);
  },
  getPaymentMethod({ commit }, data) {
    commit('setPaymentMethod', data);
  },
  getCartProducts({ commit }, data) {
    commit('setProducts', data);
  },
  getCoupon({ commit }, data) {
    commit('setCoupon', data);
  },
  getStatute({ commit }, data) {
    commit('setStatute', data);
  },
  getComment({ commit }, data) {
    commit('setComment', data);
  },
  getNewsletter({ commit }, data) {
    commit('setNewsletter', data);
  },
  getCartTotal({ commit }, data) {
    commit('setTotal', data);
  },
  async confirmOrder() {
    if (
      state.cart.products.length === 0 ||
      Object.keys(state.cart.paymentMethod).length === 0 ||
      Object.keys(state.cart.shippingMethod).length === 0 ||
      Object.keys(state.cart.credentials).length === 0 ||
      !state.cart.statue
    ) {
      return false;
    }
    await fetch('http://localhost:8000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state.cart),
    });
    return true;
  },
};

const mutations = {
  setCredentials: (state, data) => (state.cart.credentials = data),
  setShippingMethod: (state, data) => (state.cart.shippingMethod = data),
  setPaymentMethod: (state, data) => (state.cart.paymentMethod = data),
  setProducts: (state, data) => (state.cart.products = data),
  setCoupon: (state, data) => (state.cart.coupon = data),
  setStatute: (state, data) => (state.cart.statue = data),
  setComment: (state, data) => (state.cart.comment = data),
  setTotal: (state, data) => (state.cart.total = data),
  setNewsletter: (state, data) => (state.cart.newsletter = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
