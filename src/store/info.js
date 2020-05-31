import firebase from 'firebase/app'
export default {
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  },
  actions: {
    async update_info({ commit, dispatch, getters }, upd_obj) {
      try {
        const uid=await dispatch('getUid')
        const res_data = { ...getters.info, ...upd_obj }
        await firebase.database().ref(`/users/${uid}/info`).update(res_data)
        commit('set_info_state', res_data)
        return res_data
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInformation({ dispatch, commit }) {
      try {
        const uid=await dispatch('getUid')
        const info=(await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('set_info_state', info)
        return info
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  mutations: {
    set_info_state(state, info) {
      state.info=info
    },
    cleare_info_state(state) {
      state.info={}
    }
  }
}