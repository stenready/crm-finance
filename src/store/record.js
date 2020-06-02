import firebase from 'firebase/app'

export default {
  state: {},
  actions: {
    async create_record({ commit, dispatch }, record) {
      try {
        const uid=await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetch_all_records({ commit, dispatch }) {
      try {
        const uid=await dispatch('getUid')
        const r=(await firebase.database().ref(`/users/${uid}/records`).once('value')).val()||{}
        return Object.keys(r).map(key => ({ ...r[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async delete_record_by_id({ commit, dispatch }, id) {
      console.log('object');
    },
    async fetch_record_by_id({ commit, dispatch }, id) {
      try {
        const uid=await dispatch('getUid')
        const one_record=(await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val()||{}
        return { ...one_record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

  },
  getters: {},
  mutations: {}
}