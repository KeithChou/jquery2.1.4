/*
* jQuery-2.1.4 reading by unclekeith
* each
*/

$.fn.extend({
	// 为每一个匹配到的jQuery对象调用each callback
	// 每一个jQ对象实例的each方法都是调用全部方法，即$.each
	// 可以跳转到 global-API中的loop.js查看$.each方法
	each: function (callback) {
		// 这里传给$.each的this，实际上是一个类数组对象，
		// 即DOM对象。即传递的是
		// @example 页面上有四个p元素，
		// let ArrayLike = document.getElementsByTagName('p');
		// 类数组对象ArrayLike.length = 4;
		// 所以在each方法内部要将DOM对象转换为jQuery对象，
		// 使用$(this)即可
		return jQuery.each(this, callback);
	}
})