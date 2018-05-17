# image-view

> 图片预览插件，支持图片切换、旋转、缩放、移动...

## 使用 use

浏览器Brower

```html
<div id="imgList">
  <img src="a.jpg">
  <img src="b.jpg">
  <img src="c.jpg">
  <img src="d.jpg">
</div>
<script src="dist/js/zx-image-view.min.js"></script>
<script>
  // 获取图片容器dom元素
  var $el = document.getElementById('imgList');

  // 使用方法1
  var zip = new ZxImageView();
  zip.init($el, 'img');

  // 使用方法2
  var zip2 = new ZxImageView($el, 'img');
</script>
```

ES6+
```javascript
import ZxImageView from 'dist/js/zx-image-view.min.js'
```

## # 效果图 preview

![image-view](resource/view-1.jpg)

![image-view](resource/view-2.jpg)

## 参数 options


## 方法 methods

## Copyright and license

Code and documentation copyright 2018. zx1984. Code released under the MIT License.
