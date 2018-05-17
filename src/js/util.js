/**
 * Create by zx1984
 * 2018/5/16 0016.
 * https://github.com/zx1984
 */
export default {
  /**
   * 判断是否为HTML元素对象
   * @param $el
   * @returns {*|boolean}
   */
  isHTMLElement ($el) {
    return $el && $el instanceof HTMLElement
  },
  /**
   * 转为为整型
   * @param n
   * @returns {*}
   */
  int (n) {
    let m = parseInt(n)
    return isNaN(m) ? 0 : m
  },
  /**
   * 转为数字
   * @param n
   * @returns {*}
   */
  toNumber (n) {
    let m = parseFloat(n)
    return isNaN(m) ? 0 : m
  },
  /**
   * 获取el样式属性值
   * @param el 必须
   * @param attr 可选参数，指定的某一个样式属性名
   * @returns {*}
   */
  getStyleValue (el, attr) {
    if (!this.isHTMLElement(el)) return null
    let css = getComputedStyle(el, null)
    let result = null
    if (attr) {
      try {
        result = css[this.toHumpStr(attr)]
      } catch (e) {}
    } else {
      result = css
    }
    return result
  },
  getMaxZindex () {
    const els = document.getElementsByTagName('*')
    let el, css, zindex
    let arr = []
    for (let i = 0; i < els.length; i++) {
      el = els[i]
      if (el.nodeType !== 1) continue
      css = this.getStyleValue(el)
      if (css.position !== 'static') {
        zindex = this.toNumber(css.zIndex)
        if (zindex > 0) arr.push(zindex)
      }
    }
    return Math.max.apply(null, arr) >>> 0
  },
  /**
   * 将字符串转换为驼峰写法
   * 比如：z-index => zIndex
   * @param attr
   * @param spacer
   * @returns {*}
   */
  toHumpStr (attr, spacer = '-') {
    if (typeof attr !== 'string') {
      attr = attr.toString()
    }
    const arr = attr.split(spacer)
    const len = arr.length
    if (len <= 1) return attr
    // 不考虑有前缀的属性-webkit-flex
    let str = arr[0]
    for (let i = 1; i < len; i++) {
      str += arr[i].toUpperCase()[0] + arr[i].substr(1)
    }
    return str
  },
  slice (arr) {
    return Array.prototype.slice.call(arr)
  }
}
