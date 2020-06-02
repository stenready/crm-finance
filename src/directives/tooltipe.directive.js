export default {
  bind(el, {value}) {
    M.Tooltip.init(el, {html: value})
  },
  unbind(el) {
    var instance = M.Tooltip.getInstance(el);
    if(instance && instance.destroy) {
      instance.destroy()
    }
  }
}