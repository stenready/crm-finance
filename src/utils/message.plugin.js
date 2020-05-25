export default {

  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({html})
    }

    Vue.prototype.$error = function(msg) {
      M.toast({ html: `[Ошибка] ${msg}`})
    }
  }

}