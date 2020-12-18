import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading:false
  },
  mutations: {
    changeLoading(state, data) {
      state.isLoading = data
    }
  },
  actions: {
    changeLoading({commit},data) {
      commit('changeLoading',data)
    }
  },
  modules: {
  }
})
