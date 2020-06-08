import firebase from 'firebase/app'
export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    async logaut({commit}) {
      await firebase.auth().signOut()
      commit('cleare_info_state')
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 1000,
          name,
          locale: 'ru-Ru'
        })

      } catch (err) {
        commit('setError', err)
        throw err
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}