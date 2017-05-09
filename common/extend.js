/*
* jQuery-2.1.4 reading by unclekeith
* $.extend, $.prototype.extend
*/


jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		// 这里用了||运算符，当arguments[0]为false时，
		// target默认等于一个空对象
		i = 1,
		length = arguments.length,
		deep = false;

	// 当typeof target === 'boolean'时
	// 则将deep设置为target的值
	// 然后将target移动到第二个参数，如果为false
	// 则默认为一个空对象
	// 此时i++，源对象会被推到第三个参数
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[i] || {};
		i++;
	}

	// 如果传入的目标对象的类型不是一个oject
	// 并且target不是一个函数时，会将target默认设置为一个空对象
	// 这里与Object.assign的处理方法不同，
	// assign方法会将Boolean、String、Number方法转换为对应的基本包装类型
	// 然后再返回，
	// 而extend方法直接将类型不为object或function的数据类型
	// 全部转换为一个空对象
	if (typeof target !== "object" && !jQuery.isFunction(target)) {
		target = {};
	}

	// 这里在刚刚谈过了
	// 就是如果只有一个参数时，目标对象会是一个this对象
	// this的指向需要看是使用$.fn.extend还是$.extend
	if (i === length) {
		target = this;
		i--;
	}

	// 循环arguments类数组对象，从源对象开始
	for (; i < length; i++) {
		// 针对下面if判断
		// 有一点需要注意的是
		// 这里有一个隐式强制类型转换 undefined == null 为 true
		// 而undefined === null 为 false
		// 所以如果源对象中数据类型为Undefined或Null
		// 则忽略
		if ((options = arguments[i]) != null) {
			// 循环每一个源对象
			for (name in options) {
				// src: 判断目标对象是否存在该属性
				// src主要用于target对象也存在name属性
				src = target[name];

				// 需要复制的属性
				// 当前源对象的name属性
				copy = options[name];

				// Prevent never-ending loop
				// 这种情况暂时未遇到..
				// 因为即使copy是同target是一样的对象
				// 两个对象也不可能相等的..
				if (target === copy) {
					continue;
				}

				// if判断主要用途：
				// 如果是深复制且copy是一个对象或数组
				// 则需要递归jQuery.extend(),
				// 直到copy成为一个基本数据类型为止
				if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
					if (copyIsArray) {
						// 将copyIsArray重置为默认值
						copyIsArray = false;
						// 当目标对象中存在源对象的同一属性时
						// 则使用该目标对象的属性（一个数组）
						// 否则重新创建一个数组，用于复制
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						// 当目标对象中存在源对象的同一属性时
						// 则使用该目标对象的属性（一个对象）
						// 否则重新创建一个对象，用于复制
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// 递归调用jQuery.extend，
					// 直到copy值的数据类型为简单数据类型为止
					target[name] = jQuery.extend(deep, clone, copy);

				// 如果copy不是一个对象或数组，或者属于浅复制
				// 那么执行elseif分支
				// 在elseif判断中如果copy是一个对象或数组，
				// 但是都为空的话，排除这种情况
				// 因为获取空对象的属性会返回undefined
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	// 当源对象全部循环完毕之后，返回目标对象
	return target;
};