export default () => ({
  namespaced: true,
  state: {
    myInfo: null
  },
  mutations: {
    setUserInfo (state, info) {
      state.myInfo = info
    },
    clearUserInfo (state) {
      state.myInfo = null
    }
  },
  actions: {
    login ({ commit }, info) {
      commit('setUserInfo', info)
    },
    logout ({ commit }) {
      commit('clearUserInfo')
    }
  }
})
