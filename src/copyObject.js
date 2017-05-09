/*
* jQuery-2.1.4 reading by unclekeith
* 仿造jQuery.extend方法实现JavaScript对象的 深浅复制
*/

function copyObject () {
	let i = 1,
		target = arguments[0] || {},
		deep = false,
		length = arguments.length,
		name, options, src, copy,
		copyIsArray, clone;

	// 如果第一个参数的数据类型是Boolean类型
	// target往后取第二个参数
	if (typeof target === 'boolean') {
		deep = target;
		// 使用||运算符，排除隐式强制类型转换为false的数据类型
		// 如'', 0, undefined, null, false等
		// 如果target为以上的值，则设置target = {}
		target = arguments[1] || {};
		i++;
	}

	// 如果target不是一个对象或数组或函数
	if (typeof target !== 'object' && !(typeof target === 'function')) {
		target = {};
	}

	// 如果arguments.length === 1 或
	// typeof arguments[0] === 'boolean',
	// 且存在arguments[1]，则直接返回target对象
	if (i === length) {
		return target;
	}

	// 循环每个源对象
	for (; i < length; i++) {
		// 如果传入的源对象是null或undefined
		// 则循环下一个源对象
		if (typeof (options = arguments[i]) != null) {
			// 遍历所有[[emuerable]] === true的源对象
			// 包括Object, Array, String
			// 如果遇到源对象的数据类型为Boolean, Number
			// for in循环会被跳过，不执行for in循环
			for (name in options) {
				// src用于判断target对象是否存在name属性
				src = target[name];
				// copy用于复制
				copy = options[name];
				// 判断copy是否是数组
				copyIsArray = Array.isArray(copy);
				if (deep && copy && (typeof copy === 'object' || copyIsArray)) {
					if (copyIsArray) {
						copyIsArray = false;
						// 如果目标对象存在name属性且是一个数组
						// 则使用目标对象的name属性，否则重新创建一个数组，用于复制
						clone = src && Array.isArray(src) ? src : [];
					} else {
						// 如果目标对象存在name属性且是一个对象
						// 则使用目标对象的name属性，否则重新创建一个对象，用于复制
						clone = src && typeof src === 'object' ? src : {};
					}
					// 深复制，所以递归调用copyObject函数
					// 返回值为target对象，即clone对象
					// copy是一个源对象
					target[name] = copyObject(deep, clone, copy);
				} else if (copy !== undefined){
					// 浅复制，直接复制到target对象上
					target[name] = copy;
				}
			}
		}
	}
	// 返回目标对象
	return target;
}
