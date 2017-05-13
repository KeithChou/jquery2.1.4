/*
* jQuery-2.1.4 reading by unclekeith
* offset, appendTo, prependTo, insertBefore, insertAfter, replaceALL
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
			// 这里添加了win.pageYOffset和docElem.clientTop
			// 估计是考虑getBoundingClientRect方法的浏览器兼容性问题
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	}
});

$.fn.extend({
	append: function() {
		// 以appendTo方法举例
		// 1. $('<p>keith</p>').appendTo('body');
		// 1. arguments指的就是P节点

		// 这里简单的说以下domManip函数的原理
		// 在正常使用domManip的情况下，arguments对象包含一些需要添加到this对象的节点
		// 并且在内部实现中，jQuery封装了buildFragment方法
		// 在buildFragment方法中，使用了document对象的DocumentFragment方法，也就是说通常所说的'文档碎片'
		// 将需要插入的元素先插入到文档碎片中，然后全部操作完毕，再将文档碎片插入到指定元素中，而文档碎片自身并不会被插入
		// 使用文档碎片的好处是可以离线操作DOM，最大程度减少页面的重排和重绘，提高web性能
		// 所以在appendTo、append，prependTo、prepend等插入节点的方法中都采用了离线操作DOM的方式
		return this.domManip(arguments, function(elem) {
			// nodeType=1表示this对象是一个元素节点
			// nodeType=11表示this对象是一个文档碎片
			// nodeType=9表示this对象是一个document对象
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = manipulationTarget(this, elem);
				target.appendChild(elem);
			}
		});
	}
})

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original) {
	// 以appendTo方法举例
	// 1. $('<p>keith</p>').appendTo('body');
	// $.fn.appendTo扩展了jQuery对象的appendt方法
	// appendTo方法接收一个参数，表示要插入到的selector
	jQuery.fn[name] = function(selector) {
		var elems,
			ret = [],
			insert = jQuery(selector),
			last = insert.length - 1,
			i = 0;

		for (; i <= last; i++) {
			elems = i === last ? this : this.clone(true);
			// appendTo, prependTo, insertBefore, insertAfter, replaceAll都调用了
			// 它们对应的方法apend, prepend, before, after, replaceWith
			// 1. insert[i] = 'body'; original = 'append'; elems = P节点
			jQuery(insert[i])[original](elems);

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply(ret, elems.get());
		}

		return this.pushStack(ret);
	};
});
