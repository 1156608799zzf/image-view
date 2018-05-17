/**
 * Create by zx1984
 * 2018/5/16 0016.
 * https://github.com/zx1984
 */
import '../style/image-preview.styl'
import util from './util'
import dom from './dom'
import it from './img'

const log = console.log

const Z_INDEX = 9999

class ZxImageView {
  constructor (opts, itemSelector) {
    // preview是否显示
    this.isPreview = false
    // 预览容器
    this.$container = dom.create({
      tag: 'div',
      attrs: {
        class: 'zx-image-preview-wrapper',
        style: 'display:none'
      }
    })
    // 关闭按钮
    this.$close = dom.create({
      tag: 'div',
      attrs: {
        class: 'zip-close _cur'
      }
    })
    // 预览图片
    this.$img = dom.create({
      tag: 'img',
      attrs: {
        class: 'zip-picture'
      }
    })
    // 工具栏
    this.$tool = dom.create({
      tag: 'div',
      attrs: {
        class: 'zip-tool-wrapper'
      },
      child: [
        // {
        //   tag: 'span',
        //   attrs: {
        //     class: '_item _rotate-hook'
        //   },
        //   child: ['旋转']
        // }
      ]
    })
    // 数量栏
    this.$totalBar = dom.create({
      tag: 'div',
      attrs: {
        class: 'zip-totalbar-wrapper'
      }
    })
    this.$container.appendChild(this.$close)
    this.$container.appendChild(this.$img)
    this.$container.appendChild(this.$tool)
    this.$container.appendChild(this.$totalBar)
    // 是否添加到body
    this.isAppendToBody = dom.appendToBody(this.$container)
    // 图片元素数据
    this.$images = []
    // 缩略图容器
    this.$thumbContailner = null
    this.index = 0
    // 事件处理器
    this._eventHandler()
    this.thumbSelector = 'img'
    // 初始化参数处理
    if (opts) {
      // dom元素
      if (util.isHTMLElement(opts)) {
        this.init(opts, itemSelector)
      } else if (typeof opts === 'string') {
        // 缩略图标识
        this.thumbSelector = opts
      }
    }
  }

  // 初始化
  init ($itemContainer, selector) {
    if (!this.isAppendToBody) {
      this.isAppendToBody = dom.appendToBody(this.$container)
    }
    if (!util.isHTMLElement($itemContainer)) {
      throw new Error(`init参数${$itemContainer}非html元素`)
    }
    this._thumbBindEvent($itemContainer)
    if (typeof selector === 'string') {
      this.thumbSelector = selector
    }
    // 获取图片元素
    const $images = $itemContainer.querySelectorAll(this.thumbSelector)
    this._reset$Images($images)
  }

  // 重置图片thumb列表数据
  _reset$Images ($images) {
    if ($images) {
      let html = ''
      this.$images = util.slice($images)
      let len = this.$images.length
      this.$images.forEach((item, index) => {
        html += `<i style="width:${Math.floor(1 / len * 100)}%" data-index="${index}" class="_item${this.index === index ? ' _item-active' : ''}"></i>`
      })
      this.$totalBar.innerHTML = html
    }
  }

  // 更新数据
  update ($images, index = 0) {
    if ($images instanceof NodeList) {
      this._reset$Images($images)
    }
  }

  push ($images) {
    if ($images instanceof NodeList) {
      let $newArr = this.$images.concat(util.slice($images))
      this._reset$Images($newArr)
    }
  }

  // 销毁对象
  destroy () {
    const $body = document.querySelector('body')
    try {
      $body.removeChild(this.$container)
      this.$container = null
    } catch (e) {}
  }

  // 缩略图事件绑定
  _thumbBindEvent ($itemContainer) {
    // 缩略图容器
    if (this.$thumbContailner && $itemContainer !== this.$thumbContailner) {
      this.$thumbContailner.removeEventListener('click', e => {
        this._thumbClickHandler(e)
      })
    }
    this.$thumbContailner = $itemContainer
    this.$thumbContailner.addEventListener('click', e => {
      this._thumbClickHandler(e)
    })
  }

  // 缩略图容器事件处理
  _thumbClickHandler (e) {
    const $img = e.target
    const isItem = this.$images.some(item => item === $img)
    if (!isItem) return
    this.show()
    this._resetCurrent$img($img)
    this._getThumbIndex($img)
    this._changeTotalBarClass()
  }

  // 获取当前图片index
  _getThumbIndex ($img) {
    const index = this.$images.indexOf($img)
    this.index = index !== -1 ? index : 0
    // console.error('this.index: ' + this.index)
  }

  // 重置当前图片
  _resetCurrent$img ($img) {
    $img = $img || this.$images[this.index]
    this.$img.src = $img.src
    const angle = util.int($img.getAttribute('rotate-angle'))
    log('index.js _resetCurrent$img() angle: ' + angle)
    // 根据缩略图设置的旋转角度，重置预览图片的旋转角度
    this.$img.setAttribute('rotate-angle', angle)
    it.rotate(this.$img, angle)
  }

  _eventHandler () {
    // 关闭
    this.$close.addEventListener('click', e => {
      e.stopPropagation()
      this.hide()
    })

    // 点击图片
    this.$img.addEventListener('click', e => {
      e.stopPropagation()
    })

    // 点击preview容器
    this.$container.addEventListener('click', e => {
      this.hide()
    })

    // 工具栏点击事件
    this.$tool.addEventListener('click', e => {
      e.stopPropagation()
      const $el = e.target
      let isToolItem = $el.classList.contains('_item')
      if (!isToolItem) return
      // 旋转
      if ($el.classList.contains('_rotate-hook')) {
        this.rotate()
      }
      log($el.className)
    })

    // 点击统计栏
    this.$totalBar.addEventListener('mouseover', e => {
      this._handleClickTotalBar(e)
    })

    // 点击统计栏
    this.$totalBar.addEventListener('click', e => {
      e.stopPropagation()
      // this._handleClickTotalBar(e)
    })

    // 键盘事件
    window.addEventListener('keyup', e => {
      if (!this.isPreview) return
      let keyCode = e.keyCode
      // console.log(keyCode)
      switch (keyCode) {
        // prev
        case 37:
          this.prev()
          break
        // next
        case 39:
          this.next()
          break
        // rotate up
        case 38:
          this.rotate()
          break
        // rotate down
        case 40:
          this.rotate(true)
          break
      }
      // e.preventDefault()
    })

    // 鼠标滚动事件
    window.addEventListener('mousewheel', e => {
      if (!this.isPreview) return
      const $el = e.target
      if ($el !== this.$img) return
      it.scale($el, e)
      log(e)
    })

    /* 拖动 *************************************** */
    // 鼠标在图片上按下
    let isMousedownOnImage = false
    // 鼠标按下位置
    let mouseDownPostion = {}
    // 图片位置
    let mouseDownImgPosition = {}
    // 开始
    this.$img.addEventListener('mousedown', e => {
      // log(e.type)
      // e.preventDefault()
      isMousedownOnImage = true
      // log(isMousedownOnImage)
      mouseDownPostion.x = e.clientX
      mouseDownPostion.y = e.clientY
    })

    let l, t, imgCss, pos
    // 拖动
    document.addEventListener('mousemove', e => {
      if (!isMousedownOnImage) return
      e.preventDefault()
      log(e.type)
      let $img = this.$img
      imgCss = util.getStyleValue($img)

      // img盒子位置
      pos = $img.getBoundingClientRect()
      // 上边界
      // 左边界
      if (pos.height + pos.top >= 200 && pos.width + pos.left >= 200) {

      }

      l = util.toNumber(imgCss.marginLeft) + (e.clientX - mouseDownPostion.x)
      t = util.toNumber(imgCss.marginTop) + (e.clientY - mouseDownPostion.y)

      // log(e.clientX, e.clientY, l, t)
      $img.style.marginLeft = l + 'px'
      $img.style.marginTop = t + 'px'
      log(pos)
    })

    // 释放鼠标
    document.addEventListener('mouseup', e => {
      // log(e.type)
      isMousedownOnImage = false
      // log(e.clientX - mouseDownPostion.x, e.clientY - mouseDownPostion.y)
      // log(isMousedownOnImage)
    })
  }

  // 点击或鼠标滑过统计栏处理
  _handleClickTotalBar (e) {
    if (this.$images.length <= 1) return
    // e.stopPropagation()
    const $el = e.target
    let isToolItem = $el.classList.contains('_item')
    if (!isToolItem) return
    let index = $el.getAttribute('data-index') >>> 0
    // 当前点击index和this.index相同
    if (this.index === index) return
    this.index = index
    this._changeTotalBarClass($el)
    this._resetCurrent$img()
  }

  // 修改统计栏item样式
  _changeTotalBarClass ($el) {
    $el = $el || this.$totalBar.querySelectorAll('._item')[this.index]
    this.$totalBar.querySelector('._item-active').classList.remove('_item-active')
    $el.classList.add('_item-active')
  }

  // 隐藏图片预览
  hide () {
    if (this.$container) {
      this.$container.style.display = 'none'
      this.isPreview = false
    }
  }

  // 显示图片预览
  show () {
    if (this.$container) {
      let zIndex = util.getMaxZindex()
      if (zIndex > Z_INDEX) {
        this.$container.style.zIndex = zIndex
      }
      this.$container.style.display = 'block'
      this.isPreview = true
    }
  }

  prev () {
    this._switchImage('prev')
  }

  next () {
    this._switchImage('next')
  }

  /**
   * 旋转
   * @param isAnticlockwise 是否逆时针
   */
  rotate (isAnticlockwise) {
    let deg = isAnticlockwise ? -90 : 90
    const angle = util.int(this.$img.getAttribute('rotate-angle')) + deg
    this.$img.setAttribute('rotate-angle', angle)
    it.rotate(this.$img, angle)
  }

  // 切换
  _switchImage (type) {
    let maxIndex = this.$images.length - 1
    if (maxIndex <= 0) return
    switch (type) {
      case 'prev':
        if (+this.index === 0) {
          this.index = maxIndex
        } else {
          this.index--
        }
        break
      case 'next':
        if (+this.index >= maxIndex) {
          this.index = 0
        } else {
          this.index++
        }
        break
    }
    const $img = this.$images[this.index]
    this.$img.src = $img.src
    const angle = util.int($img.getAttribute('rotate-angle'))
    // 根据缩略图设置的旋转角度，重置预览图片的旋转角度
    this.$img.setAttribute('rotate-angle', angle)
    it.rotate(this.$img, angle)
    this._changeTotalBarClass()
  }
}

export { ZxImageView }
