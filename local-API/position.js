/*
* jQuery-2.1.4 reading by unclekeith
* offset
*/

$.fn.extend({
	// offset方法主要是通过document对象的getBoundingClientRect()方法
	// 获取元素的上右下左方位的位置的。

	// 如果有options对象，则表示设置left、top的值
	// 如果没有options对象，则会return 一个对象，包含left和top属性
	offset: function(options) {
		if (arguments.length) {
			return options === undefined ?
				this :
				this.each(function(i) {
					jQuery.offset.setOffset(this, options, i);
				});
		}

		// 只会获取第一个匹配到的DOM对象，
		// 一旦匹配，则会返回一个包含left|top属性的对象
		var docElem, win,
			elem = this[0],
			box = {
				top: 0,
				left: 0
			},
			doc = elem && elem.ownerDocument;

		if (!doc) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if (!jQuery.contains(docElem, elem)) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		// if判断确定浏览器是否支持gBCR方法
		if (typeof elem.getBoundingClientRect !== strundefined) {
			// 调用document对象的getBoundingClientRect()方法
			// 返回一个包含top|right|bottom|left|height|width属性的对象
			box = elem.getBoundingClientRect();
		}
		win = getWindow(doc);
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	}
})