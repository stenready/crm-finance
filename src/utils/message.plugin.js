export default {

  install(Vue, options) {
    Vue.prototype.$message = function(html, time = 4000) {
      M.toast({html, displayLength: time})
    }

    Vue.prototype.$error = function(msg) {
      M.toast({ html: `[Ошибка] ${msg}`})
    }
  }

}