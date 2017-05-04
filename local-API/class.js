/*
* jQuery-2.1.4 reading by unclekeith
* hasClass
* removeClass
* addClass
* toggleClass
*/
$.fn.extend({
	hasClass: function (selector) {
		// @example if ($('p').hasClass('page'))
		// @explanation $('p') DOM中存在的所有p元素，返回一个类数组对象
		// @explanation 这里的$('p') 其实就是对元素JS的
		// document.getElementsByTagName('p') 做了一层封装
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		// this指向jQuery对象，
		for (; i < l; i++) {
			// 只要有一个其中一个对象符合if判断语句，
			// 就会返回true；如果全部都不符合，则返回false
			//nodeType判断是否是一个元素节点；
			//&&后的操作是对selectot做一些规范处理
			if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(/\t\r\n\f/g, " ").indexOf(className) >= 0) {
				return true;
			}
		}
		return false;
	}
})
