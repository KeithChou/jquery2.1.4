/*
* jQuery-2.1.4 reading by unclekeith
* isWindow
*/

// 这里很奇怪的一个问题是
// 我们知道的是所有全局变量都是window对象的属性或者方法
// 但是jQuery却用obj.window来判断一个对象是否是window对象
$.extend({
	isWindow: function (obj) {
		return obj != null && obj === obj.window;
	}
});