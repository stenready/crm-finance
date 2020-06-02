import firebase from 'firebase/app'
export default {
  state: {},
  actions: {
    async fetch_all_categories({ commit, dispatch }) {
      try {
        const uid=await dispatch('getUid')
        const all_categories=(await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()||{}

        const cat=[]
        Object.keys(all_categories).forEach(key => {
          cat.push({
            title: all_categories[key].title,
            limit: all_categories[key].limit,
            id: key
          })
        })
        return cat
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async add_category({ commit, dispatch }, { title, limit }) {
      try {
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
    },
    async delete_category({ commit, dispatch, getters }, { id }) {
      try {
        const uid=await dispatch('getUid')

        const category=await firebase.database().ref(`/users/${uid}/categories`).child(id).remove()

        const records=await dispatch('fetch_all_records')
        let balance=getters.info.bill
        let sum=0
        const res=records.map(async (rec) => {
          if (rec.categoryId===id) {
            if (rec.type==="income") sum+=rec.amount
            if (rec.type==="outcome") sum-=rec.amount
            await firebase.database().ref(`/users/${uid}/records`).child(rec.id).remove()
          }
        })
        const bill=balance-sum
        await dispatch('update_info', { bill })

      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetch_category_by_id({ commit, dispatch }, id) {
      try {
        const uid=await dispatch('getUid')
        const category=(await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val()||{}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  mutations: {}
}