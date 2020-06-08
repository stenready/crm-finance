import localize from '../filters/localize.filter'
export default {

  install(Vue, options) {
    Vue.prototype.$title = function(key) {
      return localize(key)
    }
  }

}