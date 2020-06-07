import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '../node_modules/materialize-css/dist/js/materialize'

import messagePlugin from './utils/message.plugin'

import localize  from './filters/localize.filter'

import Loader from './components/app/Loader.vue'

import tolltipe from  './directives/tooltipe.directive'




import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import 'firebase/analytics'

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

import dateFilter from './filters/date.filter'

Vue.filter('date', dateFilter)
Vue.filter('localize', localize)

Vue.directive('tooltipe', tolltipe)

Vue.use(messagePlugin)
Vue.use(Vuelidate)

const firebaseConfig={
  apiKey: "AIzaSyAFdarP1DxHrbgHY6loG0TQIbcl8GaRHaA",
  authDomain: "sten-ready-finance-app.firebaseapp.com",
  databaseURL: "https://sten-ready-finance-app.firebaseio.com",
  projectId: "sten-ready-finance-app",
  storageBucket: "sten-ready-finance-app.appspot.com",
  messagingSenderId: "193812298058",
  appId: "1:193812298058:web:f34bb3f3a0b82c97e8e9b3",
  measurementId: "G-X03EC5YX19"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

Vue.config.productionTip=false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

