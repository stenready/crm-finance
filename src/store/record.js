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
        return Object.keys(r).map( key => ({...r[key], id: key}) )
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async delete_records_by_id_category(){
      console.log('object');
    }
  },
  getters: {},
  mutations: {}
}