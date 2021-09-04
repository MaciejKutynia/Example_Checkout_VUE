import { createStore } from 'vuex';

import checkout from './modules/checkout';

const store = createStore({
  modules: {
    checkout,
  },
});

export default store;
