import firebase from 'firebase/app'
export default {
  state: {},
  actions: {
    async fetch_all_categories({ commit, dispatch }) {
      try {
        const uid=await dispatch('getUid')
        const all_categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        
        const cat = []
        Object.keys(all_categories).forEach( key => {
          cat.push({
            title: all_categories[key].title,
            limit: all_categories[key].limit,
            id: key
          })
        } )
        return cat
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async add_category({ commit, dispatch }, { title, limit }) {
      try {
        // console.log(title, limit)
        const uid=await dispatch('getUid')
        const category=await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async update_category({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid=await dispatch('getUid')
        const category=await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  mutations: {}
}