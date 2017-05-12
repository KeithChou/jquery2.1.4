/*
* jQuery-2.1.4 reading by unclekeith
* isArraylike, getWindow
*/

function isArraylike(obj) {
	// 这里的一些算法主要是判断obj是否是Array或者是
	// Arraylike
	// $.type 是用于取得object的javascript类
	// $.isWindow 用于确定object是否是浏览器窗口
	// $.type，$.isWindow比较少用到，暂时不做分析
	var length = "length" in obj && obj.length,
		type = jQuery.type(obj);

	if (type === "function" || jQuery.isWindow(obj)) {
		return false;
	}

	if (obj.nodeType === 1 && length) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && (length - 1) in obj;
}

// 判断一个对象是否是window对象
function getWindow(elem) {
	return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
