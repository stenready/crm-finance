import firebase from 'firebase/app'

export default {
  state: {},
  actions: {
    async create_record({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUid')
        return  await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {},
  mutations: {}
}