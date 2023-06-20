import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      currentUser: null,
      apiData: null
    };
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setApiData(state, data) {
      state.apiData = data;
    }
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit('setCurrentUser', user);
    },
    setApiData({ commit }, data) {
      commit('setApiData', data);
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getApiData(state) {
      return state.apiData;
    }
  }
});

export default store;