import firebase from 'firebase/app'
export default {
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  },
  actions: {
    async fetchInformation({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('set_info_state', info)
      } catch (e) {
        throw e
      }
    }
  },
  mutations: {
    set_info_state(state, info) {
      state.info = info
    },
    cleare_info_state(state) {
      state.info = {}
    }
  }
}