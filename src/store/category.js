import firebase from 'firebase/app'
export default {
  state: {},
  actions: {
    async add_category({ commit, dispatch }, { title, limit }){
      try {
        // console.log(title, limit)
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  mutations: {}
}