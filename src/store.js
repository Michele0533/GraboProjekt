import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      currentUser: null,
      apiData: null,
      packData: {} // Objekt zum Speichern der Packs
    };
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setApiData(state, data) {
      state.apiData = data;
    },
    addPack(state, { packKey, pack }) {
      state.packData[packKey] = pack; // Hinzufügen des Packs zum Objekt
    }
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit('setCurrentUser', user);
    },
    setApiData({ commit }, data) {
      commit('setApiData', data);
    },
    addPack({ commit }, { packKey, pack }) {
      commit('addPack', { packKey, pack });
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getApiData(state) {
      return state.apiData;
    },
    getPackData(state) {
      return state.packData;
    }
  }
});

export default store;