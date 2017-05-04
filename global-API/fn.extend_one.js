/*
* jQuery-2.1.4 reading by unclekeith
* each
*/

$.extend({
	each: function (obj, callback) {
		//源码中，$.each有多一个args参数,
		//指的是以数组的形式给callback传递参数，比较少用
		//因此这里的each少加一个args参数
		var i = 0,
			len = obj.lenth,
			value,
			isArray = isArraylike(obj);
		//isArraylike方法判断obj是否是数组
		//比用Array.isArray方法更加精确，
		// 不仅数组可以使用each方法，类数组对象也可以使用
		// 可以在common/util.js中查看isArraylike方法
		if (isArray) {
			// 如果是一个数组，则循环这个数组
			// 这里for循环省略的第一个参数，因为在外部定义了
			for (; i < len; i++) {
				// 使用call方法，指定回调执行的作用域
				// 在数组的每个值下调用回调
				// 回调的第一个参数是索引值，
				// 第二个参数是数组索引对应的值
				value = callback.call(obj[i], i, obj[i]);
				// 如果某次循环中return false，
				// 则退出循环
				if (value === false) {
					break;
				}
			}
		} else {
			// 如果是类数组对象，使用for in循环
			for (i in obj) {
				// 理解同上
				value = callback.call(obj[i], i, obj[i]);
				if (value === false) {
					break;
				}
			}
		}
	}
})