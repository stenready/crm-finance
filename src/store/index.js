import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    showNavBar: true
  },
  getters: {
    error: s => s.error,
    navBar: s => s.showNavBar
  },
  mutations: {
    setNavBar(state, payload) {
      state.showNavBar = payload
    },
    setError(state, error) {
      state.error=error
    },
    cleareError(state) {
      state.error=null
    }
  },
  actions: {
    async fetch_currency() {
      try {
        const data = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
        const res = await data.json()
        return res
      } catch (err) {
        throw err
      }
    }
  },
  modules: {
    auth, info, category, record
  }
})
