var T, baidu = T = baidu || {
	version: "1.5.2"
};
baidu.guid = "$BAIDU$",
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {
	global: {}
},
baidu.ajax = baidu.ajax || {},
baidu.fn = baidu.fn || {},
baidu.fn.blank = function() {},
baidu.ajax.request = function(a, b) {
	function o() {
		if (n.readyState == 4) {
			try {
				var a = n.status
			} catch(b) {
				q("failure");
				return
			}
			q(a),
			a >= 200 && a < 300 || a == 304 || a == 1223 ? q("success") : q("failure"),
			window.setTimeout(function() {
				n.onreadystatechange = baidu.fn.blank,
				e && (n = null)
			},
			0)
		}
	}
	function p() {
		if (window.ActiveXObject) try {
			return new ActiveXObject("Msxml2.XMLHTTP")
		} catch(a) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP")
			} catch(a) {}
		}
		if (window.XMLHttpRequest) return new XMLHttpRequest
	}
	function q(a) {
		a = "on" + a;
		var b = k[a],
		c = baidu.ajax[a];
		if (b) {
			l && clearTimeout(l);
			if (a != "onsuccess") b(n);
			else {
				try {
					n.responseText
				} catch(d) {
					return b(n)
				}
				b(n, n.responseText)
			}
		} else if (c) {
			if (a == "onsuccess") return;
			c(n)
		}
	}
	var c = b || {},
	d = c.data || "",
	e = c.async !== ! 1,
	f = c.username || "",
	g = c.password || "",
	h = (c.method || "GET").toUpperCase(),
	i = c.headers || {},
	j = c.timeout || 0,
	k = {},
	l,
	m,
	n;
	for (m in c) k[m] = c[m];
	i["X-Requested-With"] = "XMLHttpRequest";
	try {
		n = p(),
		h == "GET" && (d && (a += (a.indexOf("?") >= 0 ? "&": "?") + d, d = null), c.noCache && (a += (a.indexOf("?") >= 0 ? "&": "?") + "b" + + (new Date) + "=1")),
		f ? n.open(h, a, e, f, g) : n.open(h, a, e),
		e && (n.onreadystatechange = o),
		h == "POST" && n.setRequestHeader("Content-Type", i["Content-Type"] || "application/x-www-form-urlencoded");
		for (m in i) i.hasOwnProperty(m) && n.setRequestHeader(m, i[m]);
		q("beforerequest"),
		j && (l = setTimeout(function() {
			n.onreadystatechange = baidu.fn.blank,
			n.abort(),
			q("timeout")
		},
		j)),
		n.send(d),
		e || o()
	} catch(r) {
		q("failure")
	}
	return n
},
baidu.url = baidu.url || {},
baidu.url.escapeSymbol = function(a) {
	return String(a).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(a) {
		return "%" + (256 + a.charCodeAt()).toString(16).substring(1).toUpperCase()
	})
},
baidu.ajax.form = function(a, b) {
	function s(a, b) {
		i.push(a + "=" + b)
	}
	b = b || {};
	var c = a.elements,
	d = c.length,
	e = a.getAttribute("method"),
	f = a.getAttribute("action"),
	g = b.replacer || function(a, b) {
		return a
	},
	h = {},
	i = [],
	j,
	k,
	l,
	m,
	n,
	o,
	p,
	q,
	r;
	for (j in b) b.hasOwnProperty(j) && (h[j] = b[j]);
	for (j = 0; j < d; j++) {
		k = c[j],
		m = k.name;
		if (!k.disabled && m) {
			l = k.type,
			n = baidu.url.escapeSymbol(k.value);
			switch (l) {
			case "radio":
			case "checkbox":
				if (!k.checked) break;
			case "textarea":
			case "text":
			case "password":
			case "hidden":
			case "select-one":
				s(m, g(n, m));
				break;
			case "select-multiple":
				o = k.options,
				q = o.length;
				for (p = 0; p < q; p++) r = o[p],
				r.selected && s(m, g(r.value, m))
			}
		}
	}
	return h.data = i.join("&"),
	h.method = a.getAttribute("method") || "GET",
	baidu.ajax.request(f, h)
},
baidu.ajax.get = function(a, b) {
	return baidu.ajax.request(a, {
		onsuccess: b
	})
},
baidu.ajax.post = function(a, b, c) {
	return baidu.ajax.request(a, {
		onsuccess: c,
		method: "POST",
		data: b
	})
},
baidu.array = baidu.array || {},
baidu.array.indexOf = function(a, b, c) {
	var d = a.length,
	e = b;
	c |= 0,
	c < 0 && (c = Math.max(0, d + c));
	for (; c < d; c++) if (c in a && a[c] === b) return c;
	return - 1
},
baidu.array.contains = function(a, b) {
	return baidu.array.indexOf(a, b) >= 0
},
baidu.each = baidu.array.forEach = baidu.array.each = function(a, b, c) {
	var d, e, f, g = a.length;
	if ("function" == typeof b) for (f = 0; f < g; f++) {
		e = a[f],
		d = b.call(c || a, e, f);
		if (d === ! 1) break
	}
	return a
},
baidu.array.empty = function(a) {
	a.length = 0
},
baidu.array.every = function(a, b, c) {
	var d = 0,
	e = a.length;
	for (; d < e; d++) if (d in a && ! b.call(c || a, a[d], d)) return ! 1;
	return ! 0
},
baidu.array.filter = function(a, b, c) {
	var d = [],
	e = 0,
	f = a.length,
	g,
	h;
	if ("function" == typeof b) for (h = 0; h < f; h++) g = a[h],
	! 0 === b.call(c || a, g, h) && (d[e++] = g);
	return d
},
baidu.array.find = function(a, b) {
	var c, d, e = a.length;
	if ("function" == typeof b) for (d = 0; d < e; d++) {
		c = a[d];
		if (!0 === b.call(a, c, d)) return c
	}
	return null
},
baidu.array.hash = function(a, b) {
	var c = {},
	d = b && b.length,
	e = 0,
	f = a.length;
	for (; e < f; e++) c[a[e]] = d && d > e ? b[e] : ! 0;
	return c
},
baidu.array.lastIndexOf = function(a, b, c) {
	var d = a.length;
	c |= 0;
	if (!c || c >= d) c = d - 1;
	c < 0 && (c += d);
	for (; c >= 0; c--) if (c in a && a[c] === b) return c;
	return - 1
},
baidu.array.map = function(a, b, c) {
	var d = [],
	e = 0,
	f = a.length;
	for (; e < f; e++) d[e] = b.call(c || a, a[e], e);
	return d
},
baidu.array.reduce = function(a, b, c) {
	var d = 0,
	e = a.length,
	f = 0;
	if (arguments.length < 3) {
		for (; d < e; d++) {
			c = a[d++],
			f = 1;
			break
		}
		if (!f) return
	}
	for (; d < e; d++) d in a && (c = b(c, a[d], d, a));
	return c
},
baidu.array.remove = function(a, b) {
	var c = a.length;
	while (c--) c in a && a[c] === b && a.splice(c, 1);
	return a
},
baidu.array.removeAt = function(a, b) {
	return a.splice(b, 1)[0]
},
baidu.array.some = function(a, b, c) {
	var d = 0,
	e = a.length;
	for (; d < e; d++) if (d in a && b.call(c || a, a[d], d)) return ! 0;
	return ! 1
},
baidu.array.unique = function(a, b) {
	var c = a.length,
	d = a.slice(0),
	e,
	f;
	"function" != typeof b && (b = function(a, b) {
		return a === b
	});
	while (--c > 0) {
		f = d[c],
		e = c;
		while (e--) if (b(f, d[e])) {
			d.splice(c, 1);
			break
		}
	}
	return d
},
baidu.async = baidu.async || {},
baidu.object = baidu.object || {},
baidu.extend = baidu.object.extend = function(a, b) {
	for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
	return a
},
baidu.lang = baidu.lang || {},
baidu.lang.isFunction = function(a) {
	return "[object Function]" == Object.prototype.toString.call(a)
},
baidu.async._isDeferred = function(a) {
	var b = baidu.lang.isFunction;
	return a && b(a.success) && b(a.then) && b(a.fail) && b(a.cancel)
},
baidu.async.Deferred = function() {
	function b() {
		if (a._cancelled || a._firing) return;
		if (a._nextDeferred) {
			a._nextDeferred.then(a._resolveChain[0], a._rejectChain[0]);
			return
		}
		a._firing = 1;
		var b = a._isError ? a._rejectChain: a._resolveChain,
		c = a._result[a._isError ? 1: 0];
		while (b[0] && ! a._cancelled) try {
			var d = b.shift().call(a, c);
			baidu.async._isDeferred(d) && (a._nextDeferred = d, [].push.apply(d._resolveChain, a._resolveChain), [].push.apply(d._rejectChain, a._rejectChain), b = a._resolveChain = [], a._rejectChain = [])
		} catch(e) {
			throw e
		} finally {
			a._fired = 1,
			a._firing = 0
		}
	}
	var a = this;
	baidu.extend(a, {
		_fired: 0,
		_firing: 0,
		_cancelled: 0,
		_resolveChain: [],
		_rejectChain: [],
		_result: [],
		_isError: 0
	}),
	a.resolve = a.fireSuccess = function(c) {
		return a._result[0] = c,
		b(),
		a
	},
	a.reject = a.fireFail = function(c) {
		return a._result[1] = c,
		a._isError = 1,
		b(),
		a
	},
	a.then = function(c, d) {
		return a._resolveChain.push(c),
		a._rejectChain.push(d),
		a._fired && b(),
		a
	},
	a.success = function(b) {
		return a.then(b, baidu.fn.blank)
	},
	a.fail = function(b) {
		return a.then(baidu.fn.blank, b)
	},
	a.cancel = function() {
		a._cancelled = 1
	}
},
baidu.async.get = function(a) {
	var b = new baidu.async.Deferred;
	return baidu.ajax.request(a, {
		onsuccess: function(a, c) {
			b.resolve({
				xhr: a,
				responseText: c
			})
		},
		onfailure: function(a) {
			b.reject({
				xhr: a
			})
		}
	}),
	b
},
baidu.async.post = function(a, b) {
	var c = new baidu.async.Deferred;
	return baidu.ajax.request(a, {
		method: "POST",
		data: b,
		onsuccess: function(a, b) {
			c.resolve({
				xhr: a,
				responseText: b
			})
		},
		onfailure: function(a) {
			c.reject({
				xhr: a
			})
		}
	}),
	c
},
baidu.async.when = function(a, b, c) {
	if (baidu.async._isDeferred(a)) return a.then(b, c),
	a;
	var d = new baidu.async.Deferred;
	return d.then(b, c).resolve(a),
	d
},
baidu.browser = baidu.browser || {},
baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp.$1: undefined,
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp.$1: undefined,
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || + RegExp.$1: undefined,
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && ! /like gecko/i.test(navigator.userAgent),
baidu.browser.isStrict = document.compatMode == "CSS1Compat",
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
try {
	/(\d+\.\d+)/.test(external.max_version) && (baidu.browser.maxthon = + RegExp.$1)
} catch(e) {}
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? + (RegExp.$6 || RegExp.$2) : undefined,
function() {
	var a = navigator.userAgent;
	baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(a) && ! /chrome/i.test(a) ? + (RegExp.$1 || RegExp.$2) : undefined
} (),
baidu.cookie = baidu.cookie || {},
baidu.cookie._isValidKey = function(a) {
	return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(a)
},
baidu.cookie.getRaw = function(a) {
	if (baidu.cookie._isValidKey(a)) {
		var b = new RegExp("(^| )" + a + "=([^;]*)(;|$)"),
		c = b.exec(document.cookie);
		if (c) return c[2] || null
	}
	return null
},
baidu.cookie.get = function(a) {
	var b = baidu.cookie.getRaw(a);
	return "string" == typeof b ? (b = decodeURIComponent(b), b) : null
},
baidu.cookie.setRaw = function(a, b, c) {
	if (!baidu.cookie._isValidKey(a)) return;
	c = c || {};
	var d = c.expires;
	"number" == typeof c.expires && (d = new Date, d.setTime(d.getTime() + c.expires)),
	document.cookie = a + "=" + b + (c.path ? "; path=" + c.path: "") + (d ? "; expires=" + d.toGMTString() : "") + (c.domain ? "; domain=" + c.domain: "") + (c.secure ? "; secure": "")
},
baidu.cookie.remove = function(a, b) {
	b = b || {},
	b.expires = new Date(0),
	baidu.cookie.setRaw(a, "", b)
},
baidu.cookie.set = function(a, b, c) {
	baidu.cookie.setRaw(a, encodeURIComponent(b), c)
},
baidu.date = baidu.date || {},
baidu.number = baidu.number || {},
baidu.number.pad = function(a, b) {
	var c = "",
	d = a < 0,
	e = String(Math.abs(a));
	return e.length < b && (c = (new Array(b - e.length + 1)).join("0")),
	(d ? "-": "") + c + e
},
baidu.date.format = function(a, b) {
	function c(a, c) {
		b = b.replace(a, c)
	}
	if ("string" != typeof b) return a.toString();
	var d = baidu.number.pad,
	e = a.getFullYear(),
	f = a.getMonth() + 1,
	g = a.getDate(),
	h = a.getHours(),
	i = a.getMinutes(),
	j = a.getSeconds();
	return c(/yyyy/g, d(e, 4)),
	c(/yy/g, d(parseInt(e.toString().slice(2), 10), 2)),
	c(/MM/g, d(f, 2)),
	c(/M/g, f),
	c(/dd/g, d(g, 2)),
	c(/d/g, g),
	c(/HH/g, d(h, 2)),
	c(/H/g, h),
	c(/hh/g, d(h % 12, 2)),
	c(/h/g, h % 12),
	c(/mm/g, d(i, 2)),
	c(/m/g, i),
	c(/ss/g, d(j, 2)),
	c(/s/g, j),
	b
},
baidu.date.parse = function(a) {
	var b = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+$");
	if ("string" == typeof a) {
		if (b.test(a) || isNaN(Date.parse(a))) {
			var c = a.split(/ |T/),
			d = c.length > 1 ? c[1].split(/[^\d]/) : [0, 0, 0],
			e = c[0].split(/[^\d]/);
			return new Date(e[0] - 0, e[1] - 1, e[2] - 0, d[0] - 0, d[1] - 0, d[2] - 0)
		}
		return new Date(a)
	}
	return new Date
},
baidu.dom = baidu.dom || {},
baidu.dom.g = function(a) {
	return a ? "string" == typeof a || a instanceof String ? document.getElementById(a) : ! a.nodeName || a.nodeType != 1 && a.nodeType != 9 ? null: a: null
},
baidu.g = baidu.G = baidu.dom.g,
baidu.string = baidu.string || {},
function() {
	var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
	baidu.string.trim = function(b) {
		return String(b).replace(a, "")
	}
} (),
baidu.trim = baidu.string.trim,
baidu.dom.addClass = function(a, b) {
	a = baidu.dom.g(a);
	var c = b.split(/\s+/),
	d = a.className,
	e = " " + d + " ",
	f = 0,
	g = c.length;
	for (; f < g; f++) e.indexOf(" " + c[f] + " ") < 0 && (d += (d ? " ": "") + c[f]);
	return a.className = d,
	a
},
baidu.addClass = baidu.dom.addClass,
baidu.dom.children = function(a) {
	a = baidu.dom.g(a);
	for (var b = [], c = a.firstChild; c; c = c.nextSibling) c.nodeType == 1 && b.push(c);
	return b
},
baidu.lang.isString = function(a) {
	return "[object String]" == Object.prototype.toString.call(a)
},
baidu.isString = baidu.lang.isString,
baidu.dom._g = function(a) {
	return baidu.lang.isString(a) ? document.getElementById(a) : a
},
baidu._g = baidu.dom._g,
baidu.dom.contains = function(a, b) {
	var c = baidu.dom._g;
	return a = c(a),
	b = c(b),
	a.contains ? a != b && a.contains(b) : !! (a.compareDocumentPosition(b) & 16)
},
baidu.dom._NAME_ATTRS = function() {
	var a = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	return baidu.browser.ie < 8 ? (a["for"] = "htmlFor", a["class"] = "className") : (a.htmlFor = "for", a.className = "class"),
	a
} (),
baidu.dom.setAttr = function(a, b, c) {
	return a = baidu.dom.g(a),
	"style" == b ? a.style.cssText = c: (b = baidu.dom._NAME_ATTRS[b] || b, a.setAttribute(b, c)),
	a
},
baidu.setAttr = baidu.dom.setAttr,
baidu.dom.setAttrs = function(a, b) {
	a = baidu.dom.g(a);
	for (var c in b) baidu.dom.setAttr(a, c, b[c]);
	return a
},
baidu.setAttrs = baidu.dom.setAttrs,
baidu.dom.create = function(a, b) {
	var c = document.createElement(a),
	d = b || {};
	return baidu.dom.setAttrs(c, d)
},
baidu.lang.guid = function() {
	return "TANGRAM$" + baidu.$$._counter++
},
baidu.$$._counter = baidu.$$._counter || 1,
baidu.lang.Class = function() {
	this.guid = baidu.lang.guid(),
	! this.__decontrolled && (baidu.$$._instances[this.guid] = this)
},
baidu.$$._instances = baidu.$$._instances || {},
baidu.lang.Class.prototype.dispose = function() {
	delete baidu.$$._instances[this.guid];
	for (var a in this) typeof this[a] != "function" && delete this[a];
	this.disposed = ! 0
},
baidu.lang.Class.prototype.toString = function() {
	return "[object " + (this.__type || this._className || "Object") + "]"
},
window.baiduInstance = function(a) {
	return baidu.$$._instances[a]
},
baidu.lang.Class.prototype.un = baidu.lang.Class.prototype.removeEventListener = function(a, b) {
	var c, d = this.__listeners;
	if (!d) return;
	if (typeof a == "undefined") {
		for (c in d) delete d[c];
		return
	}
	a.indexOf("on") && (a = "on" + a);
	if (typeof b == "undefined") delete d[a];
	else if (d[a]) {
		typeof b == "string" && (b = d[a][b]) && delete d[a][b];
		for (c = d[a].length - 1; c >= 0; c--) d[a][c] === b && d[a].splice(c, 1)
	}
},
baidu.lang.Event = function(a, b) {
	this.type = a,
	this.returnValue = ! 0,
	this.target = b || null,
	this.currentTarget = null
},
baidu.lang.Class.prototype.fire = baidu.lang.Class.prototype.dispatchEvent = function(a, b) {
	baidu.lang.isString(a) && (a = new baidu.lang.Event(a)),
	! this.__listeners && (this.__listeners = {}),
	b = b || {};
	for (var c in b) a[c] = b[c];
	var c, d, e = this,
	f = e.__listeners,
	g = a.type;
	a.target = a.target || (a.currentTarget = e),
	g.indexOf("on") && (g = "on" + g),
	typeof e[g] == "function" && e[g].apply(e, arguments);
	if (typeof f[g] == "object") for (c = 0, d = f[g].length; c < d; c++) f[g][c] && f[g][c].apply(e, arguments);
	return a.returnValue
},
baidu.lang.Class.prototype.on = baidu.lang.Class.prototype.addEventListener = function(a, b, c) {
	if (typeof b != "function") return; ! this.__listeners && (this.__listeners = {});
	var d, e = this.__listeners;
	a.indexOf("on") && (a = "on" + a),
	typeof e[a] != "object" && (e[a] = []);
	for (d = e[a].length - 1; d >= 0; d--) if (e[a][d] === b) return b;
	return e[a].push(b),
	c && typeof c == "string" && (e[a][c] = b),
	b
},
baidu.lang.createSingle = function(a) {
	var b = new baidu.lang.Class;
	for (var c in a) b[c] = a[c];
	return b
},
baidu.dom.ddManager = baidu.lang.createSingle({
	_targetsDroppingOver: {}
}),
baidu.dom.getDocument = function(a) {
	return a = baidu.dom.g(a),
	a.nodeType == 9 ? a: a.ownerDocument || a.document
},
baidu.dom.getComputedStyle = function(a, b) {
	a = baidu.dom._g(a);
	var c = baidu.dom.getDocument(a),
	d;
	if (c.defaultView && c.defaultView.getComputedStyle) {
		d = c.defaultView.getComputedStyle(a, null);
		if (d) return d[b] || d.getPropertyValue(b)
	}
	return ""
},
baidu.dom._styleFixer = baidu.dom._styleFixer || {},
baidu.dom._styleFilter = baidu.dom._styleFilter || [],
baidu.dom._styleFilter.filter = function(a, b, c) {
	for (var d = 0, e = baidu.dom._styleFilter, f; f = e[d]; d++) if (f = f[c]) b = f(a, b);
	return b
},
baidu.string.toCamelCase = function(a) {
	return a.indexOf("-") < 0 && a.indexOf("_") < 0 ? a: a.replace(/[-_][^-_]/g, function(a) {
		return a.charAt(1).toUpperCase()
	})
},
baidu.dom.getStyle = function(a, b) {
	var c = baidu.dom;
	a = c.g(a),
	b = baidu.string.toCamelCase(b);
	var d = a.style[b] || (a.currentStyle ? a.currentStyle[b] : "") || c.getComputedStyle(a, b);
	if (!d) {
		var e = c._styleFixer[b];
		e && (d = e.get ? e.get(a) : baidu.dom.getStyle(a, e))
	}
	if (e = c._styleFilter) d = e.filter(b, d, "get");
	return d
},
baidu.getStyle = baidu.dom.getStyle,
baidu.event = baidu.event || {},
baidu.event._listeners = baidu.event._listeners || [],
baidu.event.on = function(a, b, c) {
	b = b.replace(/^on/i, ""),
	a = baidu.dom._g(a);
	var d = function(b) {
		c.call(a, b)
	},
	e = baidu.event._listeners,
	f = baidu.event._eventFilter,
	g,
	h = b;
	return b = b.toLowerCase(),
	f && f[b] && (g = f[b](a, b, d), h = g.type, d = g.listener),
	a.addEventListener ? a.addEventListener(h, d, ! 1) : a.attachEvent && a.attachEvent("on" + h, d),
	e[e.length] = [a, b, c, d, h],
	a
},
baidu.on = baidu.event.on,
baidu.event.un = function(a, b, c) {
	a = baidu.dom._g(a),
	b = b.replace(/^on/i, "").toLowerCase();
	var d = baidu.event._listeners,
	e = d.length,
	f = ! c,
	g, h, i;
	while (e--) g = d[e],
	g[1] === b && g[0] === a && (f || g[2] === c) && (h = g[4], i = g[3], a.removeEventListener ? a.removeEventListener(h, i, ! 1) : a.detachEvent && a.detachEvent("on" + h, i), d.splice(e, 1));
	return a
},
baidu.un = baidu.event.un,
baidu.event.preventDefault = function(a) {
	a.preventDefault ? a.preventDefault() : a.returnValue = ! 1
},
baidu.page = baidu.page || {},
baidu.page.getScrollTop = function() {
	var a = document;
	return window.pageYOffset || a.documentElement.scrollTop || a.body.scrollTop
},
baidu.page.getScrollLeft = function() {
	var a = document;
	return window.pageXOffset || a.documentElement.scrollLeft || a.body.scrollLeft
},
function() {
	baidu.page.getMousePosition = function() {
		return {
			x: baidu.page.getScrollLeft() + a.x,
			y: baidu.page.getScrollTop() + a.y
		}
	};
	var a = {
		x: 0,
		y: 0
	};
	baidu.event.on(document, "onmousemove", function(b) {
		b = window.event || b,
		a.x = b.clientX,
		a.y = b.clientY
	})
} (),
baidu.dom.getPosition = function(a) {
	a = baidu.dom.g(a);
	var b = baidu.dom.getDocument(a),
	c = baidu.browser,
	d = baidu.dom.getStyle,
	e = c.isGecko > 0 && b.getBoxObjectFor && d(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""),
	f = {
		left: 0,
		top: 0
	},
	g = c.ie && ! c.isStrict ? b.body: b.documentElement,
	h,
	i;
	if (a == g) return f;
	if (a.getBoundingClientRect) {
		i = a.getBoundingClientRect(),
		f.left = Math.floor(i.left) + Math.max(b.documentElement.scrollLeft, b.body.scrollLeft),
		f.top = Math.floor(i.top) + Math.max(b.documentElement.scrollTop, b.body.scrollTop),
		f.left -= b.documentElement.clientLeft,
		f.top -= b.documentElement.clientTop;
		var j = b.body,
		k = parseInt(d(j, "borderLeftWidth")),
		l = parseInt(d(j, "borderTopWidth"));
		c.ie && ! c.isStrict && (f.left -= isNaN(k) ? 2: k, f.top -= isNaN(l) ? 2: l)
	} else {
		h = a;
		do {
			f.left += h.offsetLeft, f.top += h.offsetTop;
			if (c.isWebkit > 0 && d(h, "position") == "fixed") {
				f.left += b.body.scrollLeft,
				f.top += b.body.scrollTop;
				break
			}
			h = h.offsetParent
		} while (h && h != a);
		if (c.opera > 0 || c.isWebkit > 0 && d(a, "position") == "absolute") f.top -= b.body.offsetTop;
		h = a.offsetParent;
		while (h && h != b.body) {
			f.left -= h.scrollLeft;
			if (!c.opera || h.tagName != "TR") f.top -= h.scrollTop;
			h = h.offsetParent
		}
	}
	return f
},
baidu.dom.setStyle = function(a, b, c) {
	var d = baidu.dom,
	e;
	a = d.g(a),
	b = baidu.string.toCamelCase(b);
	if (e = d._styleFilter) c = e.filter(b, c, "set");
	return e = d._styleFixer[b],
	e && e.set ? e.set(a, c) : a.style[e || b] = c,
	a
},
baidu.setStyle = baidu.dom.setStyle,
function() {
	function o(a) {
		baidu.extend(b, a)
	}
	function p() {
		clearInterval(l),
		j = ! 1,
		b.capture && b.handler.releaseCapture ? b.handler.releaseCapture() : b.capture && window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP),
		document.body.style.MozUserSelect = g,
		baidu.event.un(document, "selectstart", r),
		b.autoStop && baidu.event.un(b.handler, "mouseup", p),
		b.autoStop && baidu.event.un(window, "mouseup", p),
		k(b.ondragend) && b.ondragend(a, b)
	}
	function q(g) {
		var l = b.range,
		m = baidu.page.getMousePosition(),
		n = f + m.x - c,
		o = e + m.y - d;
		typeof l == "object" && l && l.length == 4 && (n = Math.max(l[3], n), n = Math.min(l[1] - a.offsetWidth, n), o = Math.max(l[0], o), o = Math.min(l[2] - a.offsetHeight, o)),
		j || (baidu.setStyle(a, "marginTop", 0), baidu.setStyle(a, "marginLeft", 0), j = ! 0),
		a.style.top = o + "px",
		a.style.left = n + "px",
		(h !== n || i !== o) && (h !== null || i !== null) && k(b.ondrag) && b.ondrag(a, b),
		h = n,
		i = o
	}
	function r(a) {
		return baidu.event.preventDefault(a, ! 1)
	}
	var a, b, c, d, e, f, g, h, i, j, k = baidu.lang.isFunction,
	l, m, n;
	baidu.dom.drag = function(j, t) {
		i = h = null;
		if (! (a = baidu.dom.g(j))) return ! 1;
		b = baidu.object.extend({
			autoStop: ! 0,
			capture: ! 0,
			interval: 16,
			handler: a
		},
		t),
		m = baidu.dom.getPosition(a.offsetParent),
		n = baidu.dom.getPosition(a),
		baidu.getStyle(a, "position") == "absolute" ? (e = n.top - (a.offsetParent == document.body ? 0: m.top), f = n.left - (a.offsetParent == document.body ? 0: m.left)) : (e = parseFloat(baidu.getStyle(a, "top")) || - parseFloat(baidu.getStyle(a, "bottom")) || 0, f = parseFloat(baidu.getStyle(a, "left")) || - parseFloat(baidu.getStyle(a, "right")) || 0);
		if (b.mouseEvent) c = baidu.page.getScrollLeft() + b.mouseEvent.clientX,
		d = baidu.page.getScrollTop() + b.mouseEvent.clientY;
		else {
			var u = baidu.page.getMousePosition();
			c = u.x,
			d = u.y
		}
		return b.autoStop && baidu.event.on(b.handler, "mouseup", p),
		b.autoStop && baidu.event.on(window, "mouseup", p),
		baidu.event.on(document, "selectstart", r),
		b.capture && b.handler.setCapture ? b.handler.setCapture() : b.capture && window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP),
		g = document.body.style.MozUserSelect,
		document.body.style.MozUserSelect = "none",
		k(b.ondragstart) && b.ondragstart(a, b),
		l = setInterval(q, b.interval),
		{
			stop: p,
			update: o
		}
	}
} (),
baidu.dom.draggable = function(a, b) {
	b = baidu.object.extend({
		toggle: function() {
			return ! 0
		}
	},
	b || {}),
	b.autoStop = ! 0,
	a = baidu.dom.g(a),
	b.handler = b.handler || a;
	var c, d = ["ondragstart", "ondrag", "ondragend"],
	e = d.length - 1,
	f,
	g,
	h = {
		dispose: function() {
			g && g.stop(),
			baidu.event.un(b.handler, "onmousedown", j),
			baidu.lang.Class.prototype.dispose.call(h)
		}
	},
	i = this;
	if (c = baidu.dom.ddManager) for (; e >= 0; e--) f = d[e],
	b[f] = function(d) {
		var e = b[d];
		return function() {
			baidu.lang.isFunction(e) && e.apply(i, arguments),
			c.dispatchEvent(d, {
				DOM: a
			})
		}
	} (f);
	if (a) {
		function j(c) {
			var d = b.mouseEvent = window.event || c;
			if (d.button > 1 || baidu.lang.isFunction(b.toggle) && ! b.toggle()) return;
			baidu.dom.getStyle(a, "position") == "static" && baidu.dom.setStyle(a, "position", "relative"),
			baidu.lang.isFunction(b.onbeforedragstart) && b.onbeforedragstart(a),
			g = baidu.dom.drag(a, b),
			h.stop = g.stop,
			h.update = g.update,
			baidu.event.preventDefault(d)
		}
		baidu.event.on(b.handler, "onmousedown", j)
	}
	return {
		cancel: function() {
			h.dispose()
		}
	}
},
baidu.dom.intersect = function(a, b) {
	var c = baidu.dom.g,
	d = baidu.dom.getPosition,
	e = Math.max,
	f = Math.min;
	a = c(a),
	b = c(b);
	var g = d(a),
	h = d(b);
	return e(g.left, h.left) <= f(g.left + a.offsetWidth, h.left + b.offsetWidth) && e(g.top, h.top) <= f(g.top + a.offsetHeight, h.top + b.offsetHeight)
},
baidu.dom.droppable = function(a, b) {
	b = b || {};
	var c = baidu.dom.ddManager,
	d = baidu.dom.g(a),
	e = baidu.lang.guid(),
	f = function(a) {
		var f = c._targetsDroppingOver,
		g = {
			trigger: a.DOM,
			reciever: d
		};
		baidu.dom.intersect(d, a.DOM) ? f[e] || (typeof b.ondropover == "function" && b.ondropover.call(d, g), c.dispatchEvent("ondropover", g), f[e] = ! 0) : (f[e] && (typeof b.ondropout == "function" && b.ondropout.call(d, g), c.dispatchEvent("ondropout", g)), delete f[e])
	},
	g = function(a) {
		var f = {
			trigger: a.DOM,
			reciever: d
		};
		baidu.dom.intersect(d, a.DOM) && (typeof b.ondrop == "function" && b.ondrop.call(d, f), c.dispatchEvent("ondrop", f)),
		delete c._targetsDroppingOver[e]
	};
	return c.addEventListener("ondrag", f),
	c.addEventListener("ondragend", g),
	{
		cancel: function() {
			c.removeEventListener("ondrag", f),
			c.removeEventListener("ondragend", g)
		}
	}
},
baidu.dom.empty = function(a) {
	a = baidu.dom.g(a);
	while (a.firstChild) a.removeChild(a.firstChild);
	return a
},
baidu.dom._matchNode = function(a, b, c) {
	a = baidu.dom.g(a);
	for (var d = a[c]; d; d = d[b]) if (d.nodeType == 1) return d;
	return null
},
baidu.dom.first = function(a) {
	return baidu.dom._matchNode(a, "nextSibling", "firstChild")
},
baidu.dom.getAttr = function(a, b) {
	return a = baidu.dom.g(a),
	"style" == b ? a.style.cssText: (b = baidu.dom._NAME_ATTRS[b] || b, a.getAttribute(b))
},
baidu.getAttr = baidu.dom.getAttr,
baidu.dom.setStyles = function(a, b) {
	a = baidu.dom.g(a);
	for (var c in b) baidu.dom.setStyle(a, c, b[c]);
	return a
},
baidu.setStyles = baidu.dom.setStyles,
baidu.page.getViewHeight = function() {
	var a = document,
	b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
	return b.clientHeight
},
baidu.page.getViewWidth = function() {
	var a = document,
	b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
	return b.clientWidth
},
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
	set: function(a, b) {
		return b.constructor == Number && ! /zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a) && (b += "px"),
		b
	}
},
baidu.dom.fixable = function(a, b) {
	function n() {
		return {
			top: e == "top" ? i.y: baidu.page.getViewHeight() - i.y - h.height,
			left: f == "left" ? i.x: baidu.page.getViewWidth() - i.x - h.width
		}
	}
	function o() {
		var a = n();
		c.style.setExpression("left", "eval((document.body.scrollLeft || document.documentElement.scrollLeft) + " + a.left + ") + 'px'"),
		c.style.setExpression("top", "eval((document.body.scrollTop || document.documentElement.scrollTop) + " + a.top + ") + 'px'")
	}
	function p() {
		var a = {
			position: baidu.getStyle(c, "position"),
			height: function() {
				var a = baidu.getStyle(c, "height");
				return a != "auto" ? /\d+/.exec(a)[0] : c.offsetHeight
			} (),
			width: function() {
				var a = baidu.getStyle(c, "width");
				return a != "auto" ? /\d+/.exec(a)[0] : c.offsetWidth
			} ()
		};
		return q("top", a),
		q("left", a),
		q("bottom", a),
		q("right", a),
		a
	}
	function q(a, b) {
		var d;
		b.position == "static" ? b[a] = "": (d = baidu.getStyle(c, a), d == "auto" || d == "0px" ? b[a] = "": b[a] = d)
	}
	function r() {
		if (j) return;
		baidu.setStyles(c, {
			top: "",
			left: "",
			bottom: "",
			right: ""
		});
		if (!d) {
			var a = {
				position: "fixed"
			};
			a[e == "top" ? "top": "bottom"] = i.y + "px",
			a[f == "left" ? "left": "right"] = i.x + "px",
			baidu.setStyles(c, a)
		} else baidu.setStyle(c, "position", "absolute"),
		o();
		k(),
		j = ! 0
	}
	function s() {
		if (!j) return;
		var a = {
			position: h.position,
			left: h.left == "" ? "auto": h.left,
			top: h.top == "" ? "auto": h.top,
			bottom: h.bottom == "" ? "auto": h.bottom,
			right: h.right == "" ? "auto": h.right
		};
		d && (c.style.removeExpression("left"), c.style.removeExpression("top")),
		baidu.setStyles(c, a),
		m(),
		j = ! 1
	}
	function t(a) {
		if (!a) return;
		k = a.onrender || k,
		l = a.onupdate || l,
		m = a.onrelease || m,
		e = a.vertival || "top",
		f = a.horizontal || "left",
		baidu.extend(i, a.offset || {}),
		l()
	}
	var c = baidu.g(a),
	d = baidu.browser.ie && baidu.browser.ie <= 7 ? ! 0: ! 1,
	e = b.vertival || "top",
	f = b.horizontal || "left",
	g = typeof b.autofix != "undefined" ? b.autofix: ! 0,
	h,
	i,
	j = ! 1,
	k = b.onrender || new Function,
	l = b.onupdate || new Function,
	m = b.onrelease || new Function;
	if (!c) return;
	return h = p(),
	i = {
		y: d ? h.position == "static" ? baidu.dom.getPosition(c).top: baidu.dom.getPosition(c).top - baidu.dom.getPosition(c.parentNode).top: c.offsetTop,
		x: d ? h.position == "static" ? baidu.dom.getPosition(c).left: baidu.dom.getPosition(c).left - baidu.dom.getPosition(c.parentNode).left: c.offsetLeft
	},
	baidu.extend(i, b.offset || {}),
	g && r(),
	{
		render: r,
		update: t,
		release: s
	}
},
baidu.dom.getAncestorBy = function(a, b) {
	a = baidu.dom.g(a);
	while ((a = a.parentNode) && a.nodeType == 1) if (b(a)) return a;
	return null
},
baidu.dom.getAncestorByClass = function(a, b) {
	a = baidu.dom.g(a),
	b = new RegExp("(^|\\s)" + baidu.string.trim(b) + "(\\s|$)");
	while ((a = a.parentNode) && a.nodeType == 1) if (b.test(a.className)) return a;
	return null
},
baidu.dom.getAncestorByTag = function(a, b) {
	a = baidu.dom.g(a),
	b = b.toUpperCase();
	while ((a = a.parentNode) && a.nodeType == 1) if (a.tagName == b) return a;
	return null
},
baidu.dom.getCurrentStyle = function(a, b) {
	return a = baidu.dom.g(a),
	a.style[b] || (a.currentStyle ? a.currentStyle[b] : "") || baidu.dom.getComputedStyle(a, b)
},
baidu.dom.getParent = function(a) {
	return a = baidu.dom._g(a),
	a.parentElement || a.parentNode || null
},
baidu.dom.getText = function(a) {
	var b = "",
	c, d = 0,
	e;
	a = baidu._g(a);
	if (a.nodeType === 3 || a.nodeType === 4) b += a.nodeValue;
	else if (a.nodeType !== 8) {
		c = a.childNodes;
		for (e = c.length; d < e; d++) b += baidu.dom.getText(c[d])
	}
	return b
},
baidu.dom.getWindow = function(a) {
	a = baidu.dom.g(a);
	var b = baidu.dom.getDocument(a);
	return b.parentWindow || b.defaultView || null
},
baidu.dom.hasAttr = function(a, b) {
	a = baidu.g(a);
	var c = a.attributes.getNamedItem(b);
	return !! c && !! c.specified
},
baidu.dom.hasClass = function(a, b) {
	a = baidu.dom.g(a);
	if (!a || ! a.className) return ! 1;
	var c = baidu.string.trim(b).split(/\s+/),
	d = c.length;
	b = a.className.split(/\s+/).join(" ");
	while (d--) if (! (new RegExp("(^| )" + c[d] + "( |$)")).test(b)) return ! 1;
	return ! 0
},
baidu.dom.hide = function(a) {
	return a = baidu.dom.g(a),
	a.style.display = "none",
	a
},
baidu.hide = baidu.dom.hide,
baidu.dom.insertAfter = function(a, b) {
	var c, d;
	return c = baidu.dom._g,
	a = c(a),
	b = c(b),
	d = b.parentNode,
	d && d.insertBefore(a, b.nextSibling),
	a
},
baidu.dom.insertBefore = function(a, b) {
	var c, d;
	return c = baidu.dom._g,
	a = c(a),
	b = c(b),
	d = b.parentNode,
	d && d.insertBefore(a, b),
	a
},
baidu.dom.insertHTML = function(a, b, c) {
	a = baidu.dom.g(a);
	var d, e;
	return a.insertAdjacentHTML && ! baidu.browser.opera ? a.insertAdjacentHTML(b, c) : (d = a.ownerDocument.createRange(), b = b.toUpperCase(), b == "AFTERBEGIN" || b == "BEFOREEND" ? (d.selectNodeContents(a), d.collapse(b == "AFTERBEGIN")) : (e = b == "BEFOREBEGIN", d[e ? "setStartBefore": "setEndAfter"](a), d.collapse(e)), d.insertNode(d.createContextualFragment(c))),
	a
},
baidu.insertHTML = baidu.dom.insertHTML,
baidu.dom.last = function(a) {
	return baidu.dom._matchNode(a, "previousSibling", "lastChild")
},
baidu.dom.next = function(a) {
	return baidu.dom._matchNode(a, "nextSibling", "nextSibling")
},
baidu.dom.opacity = function(a, b) {
	a = baidu.dom.g(a),
	baidu.browser.ie ? a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(b * 100) + ")": (a.style.opacity = b, a.style.KHTMLOpacity = b)
},
baidu.dom.prev = function(a) {
	return baidu.dom._matchNode(a, "previousSibling", "previousSibling")
},
baidu.string.escapeReg = function(a) {
	return String(a).replace(new RegExp("([.*+?^=!:${}()|[\\]/\\\\])", "g"), "\\$1")
},
baidu.dom.q = function(a, b, c) {
	var d = [],
	e = baidu.string.trim,
	f,
	g,
	h,
	i;
	if (! (a = e(a))) return d;
	if ("undefined" == typeof b) b = document;
	else {
		b = baidu.dom.g(b);
		if (!b) return d
	}
	c && (c = e(c).toUpperCase());
	if (b.getElementsByClassName) {
		h = b.getElementsByClassName(a),
		f = h.length;
		for (g = 0; g < f; g++) {
			i = h[g];
			if (c && i.tagName != c) continue;
			d[d.length] = i
		}
	} else {
		a = new RegExp("(^|\\s)" + baidu.string.escapeReg(a) + "(\\s|$)"),
		h = c ? b.getElementsByTagName(c) : b.all || b.getElementsByTagName("*"),
		f = h.length;
		for (g = 0; g < f; g++) i = h[g],
		a.test(i.className) && (d[d.length] = i)
	}
	return d
},
baidu.q = baidu.Q = baidu.dom.q,
function() {
	function t(a, c, d, e, f, g) {
		for (var h = 0, i = e.length; h < i; h++) {
			var j = e[h];
			if (j) {
				var k = ! 1;
				j = j[a];
				while (j) {
					if (j[b] === d) {
						k = e[j.sizset];
						break
					}
					j.nodeType === 1 && ! g && (j[b] = d, j.sizset = h);
					if (j.nodeName.toLowerCase() === c) {
						k = j;
						break
					}
					j = j[a]
				}
				e[h] = k
			}
		}
	}
	function u(a, c, d, e, f, g) {
		for (var h = 0, i = e.length; h < i; h++) {
			var k = e[h];
			if (k) {
				var l = ! 1;
				k = k[a];
				while (k) {
					if (k[b] === d) {
						l = e[k.sizset];
						break
					}
					if (k.nodeType === 1) {
						g || (k[b] = d, k.sizset = h);
						if (typeof c != "string") {
							if (k === c) {
								l = ! 0;
								break
							}
						} else if (j.filter(c, [k]).length > 0) {
							l = k;
							break
						}
					}
					k = k[a]
				}
				e[h] = l
			}
		}
	}
	var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	b = "sizcache" + (Math.random() + "").replace(".", ""),
	c = 0,
	d = Object.prototype.toString,
	e = ! 1,
	f = ! 0,
	g = /\\/g,
	h = /\r\n/g,
	i = /\W/;
	[0, 0].sort(function() {
		return f = ! 1,
		0
	});
	var j = function(b, c, e, f) {
		e = e || [],
		c = c || document;
		var g = c;
		if (c.nodeType !== 1 && c.nodeType !== 9) return [];
		if (!b || typeof b != "string") return e;
		var h, i, k, n, o, q, r, s, t = ! 0,
		u = j.isXML(c),
		w = [],
		x = b;
		do {
			a.exec(""), h = a.exec(x);
			if (h) {
				x = h[3],
				w.push(h[1]);
				if (h[2]) {
					n = h[3];
					break
				}
			}
		} while (h);
		if (w.length > 1 && m.exec(b)) if (w.length === 2 && l.relative[w[0]]) i = v(w[0] + w[1], c, f);
		else {
			i = l.relative[w[0]] ? [c] : j(w.shift(), c);
			while (w.length) b = w.shift(),
			l.relative[b] && (b += w.shift()),
			i = v(b, i, f)
		} else { ! f && w.length > 1 && c.nodeType === 9 && ! u && l.match.ID.test(w[0]) && ! l.match.ID.test(w[w.length - 1]) && (o = j.find(w.shift(), c, u), c = o.expr ? j.filter(o.expr, o.set)[0] : o.set[0]);
			if (c) {
				o = f ? {
					expr: w.pop(),
					set: p(f)
				}: j.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || ! c.parentNode ? c: c.parentNode, u),
				i = o.expr ? j.filter(o.expr, o.set) : o.set,
				w.length > 0 ? k = p(i) : t = ! 1;
				while (w.length) q = w.pop(),
				r = q,
				l.relative[q] ? r = w.pop() : q = "",
				r == null && (r = c),
				l.relative[q](k, r, u)
			} else k = w = []
		}
		k || (k = i),
		k || j.error(q || b);
		if (d.call(k) === "[object Array]") if (!t) e.push.apply(e, k);
		else if (c && c.nodeType === 1) for (s = 0; k[s] != null; s++) k[s] && (k[s] === ! 0 || k[s].nodeType === 1 && j.contains(c, k[s])) && e.push(i[s]);
		else for (s = 0; k[s] != null; s++) k[s] && k[s].nodeType === 1 && e.push(i[s]);
		else p(k, e);
		return n && (j(n, g, e, f), j.uniqueSort(e)),
		e
	};
	j.uniqueSort = function(a) {
		if (r) {
			e = f,
			a.sort(r);
			if (e) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
		}
		return a
	},
	j.matches = function(a, b) {
		return j(a, null, null, b)
	},
	j.matchesSelector = function(a, b) {
		return j(b, null, null, [a]).length > 0
	},
	j.find = function(a, b, c) {
		var d, e, f, h, i, j;
		if (!a) return [];
		for (e = 0, f = l.order.length; e < f; e++) {
			i = l.order[e];
			if (h = l.leftMatch[i].exec(a)) {
				j = h[1],
				h.splice(1, 1);
				if (j.substr(j.length - 1) !== "\\") {
					h[1] = (h[1] || "").replace(g, ""),
					d = l.find[i](h, b, c);
					if (d != null) {
						a = a.replace(l.match[i], "");
						break
					}
				}
			}
		}
		return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []),
		{
			set: d,
			expr: a
		}
	},
	j.filter = function(a, b, c, d) {
		var e, f, g, h, i, k, m, n, o, p = a,
		q = [],
		r = b,
		s = b && b[0] && j.isXML(b[0]);
		while (a && b.length) {
			for (g in l.filter) if ((e = l.leftMatch[g].exec(a)) != null && e[2]) {
				k = l.filter[g],
				m = e[1],
				f = ! 1,
				e.splice(1, 1);
				if (m.substr(m.length - 1) === "\\") continue;
				r === q && (q = []);
				if (l.preFilter[g]) {
					e = l.preFilter[g](e, r, c, q, d, s);
					if (!e) f = h = ! 0;
					else if (e === ! 0) continue
				}
				if (e) for (n = 0;
				(i = r[n]) != null; n++) i && (h = k(i, e, n, r), o = d ^ h, c && h != null ? o ? f = ! 0: r[n] = ! 1: o && (q.push(i), f = ! 0));
				if (h !== undefined) {
					c || (r = q),
					a = a.replace(l.match[g], "");
					if (!f) return [];
					break
				}
			}
			if (a === p) if (f == null) j.error(a);
			else break;
			p = a
		}
		return r
	},
	j.error = function(a) {
		throw "Syntax error, unrecognized expression: " + a
	};
	var k = j.getText = function(a) {
		var b, c, d = a.nodeType,
		e = "";
		if (d) {
			if (d === 1) {
				if (typeof a.textContent == "string") return a.textContent;
				if (typeof a.innerText == "string") return a.innerText.replace(h, "");
				for (a = a.firstChild; a; a = a.nextSibling) e += k(a)
			} else if (d === 3 || d === 4) return a.nodeValue
		} else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += k(c));
		return e
	},
	l = j.selectors = {
		order: ["ID", "NAME", "TAG"],
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
		leftMatch: {},
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
		attrHandle: {
			href: function(a) {
				return a.getAttribute("href")
			},
			type: function(a) {
				return a.getAttribute("type")
			}
		},
		relative: {
			"+": function(a, b) {
				var c = typeof b == "string",
				d = c && ! i.test(b),
				e = c && ! d;
				d && (b = b.toLowerCase());
				for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
					while ((h = h.previousSibling) && h.nodeType !== 1);
					a[f] = e || h && h.nodeName.toLowerCase() === b ? h || ! 1: h === b
				}
				e && j.filter(b, a, ! 0)
			},
			">": function(a, b) {
				var c, d = typeof b == "string",
				e = 0,
				f = a.length;
				if (d && ! i.test(b)) {
					b = b.toLowerCase();
					for (; e < f; e++) {
						c = a[e];
						if (c) {
							var g = c.parentNode;
							a[e] = g.nodeName.toLowerCase() === b ? g: ! 1
						}
					}
				} else {
					for (; e < f; e++) c = a[e],
					c && (a[e] = d ? c.parentNode: c.parentNode === b);
					d && j.filter(b, a, ! 0)
				}
			},
			"": function(a, b, d) {
				var e, f = c++,
				g = u;
				typeof b == "string" && ! i.test(b) && (b = b.toLowerCase(), e = b, g = t),
				g("parentNode", b, f, a, e, d)
			},
			"~": function(a, b, d) {
				var e, f = c++,
				g = u;
				typeof b == "string" && ! i.test(b) && (b = b.toLowerCase(), e = b, g = t),
				g("previousSibling", b, f, a, e, d)
			}
		},
		find: {
			ID: function(a, b, c) {
				if (typeof b.getElementById != "undefined" && ! c) {
					var d = b.getElementById(a[1]);
					return d && d.parentNode ? [d] : []
				}
			},
			NAME: function(a, b) {
				if (typeof b.getElementsByName != "undefined") {
					var c = [],
					d = b.getElementsByName(a[1]);
					for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
					return c.length === 0 ? null: c
				}
			},
			TAG: function(a, b) {
				if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
			}
		},
		preFilter: {
			CLASS: function(a, b, c, d, e, f) {
				a = " " + a[1].replace(g, "") + " ";
				if (f) return a;
				for (var h = 0, i;
				(i = b[h]) != null; h++) i && (e ^ (i.className && (" " + i.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(i) : c && (b[h] = ! 1));
				return ! 1
			},
			ID: function(a) {
				return a[1].replace(g, "")
			},
			TAG: function(a, b) {
				return a[1].replace(g, "").toLowerCase()
			},
			CHILD: function(a) {
				if (a[1] === "nth") {
					a[2] || j.error(a[0]),
					a[2] = a[2].replace(/^\+|\s*/g, "");
					var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || ! /\D/.test(a[2]) && "0n+" + a[2] || a[2]);
					a[2] = b[1] + (b[2] || 1) - 0,
					a[3] = b[3] - 0
				} else a[2] && j.error(a[0]);
				return a[0] = c++,
				a
			},
			ATTR: function(a, b, c, d, e, f) {
				var h = a[1] = a[1].replace(g, "");
				return ! f && l.attrMap[h] && (a[1] = l.attrMap[h]),
				a[4] = (a[4] || a[5] || "").replace(g, ""),
				a[2] === "~=" && (a[4] = " " + a[4] + " "),
				a
			},
			PSEUDO: function(b, c, d, e, f) {
				if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = j(b[3], null, null, c);
				else {
					var g = j.filter(b[3], c, d, ! 0 ^ f);
					return d || e.push.apply(e, g),
					! 1
				} else if (l.match.POS.test(b[0]) || l.match.CHILD.test(b[0])) return ! 0;
				return b
			},
			POS: function(a) {
				return a.unshift(!0),
				a
			}
		},
		filters: {
			enabled: function(a) {
				return a.disabled === ! 1 && a.type !== "hidden"
			},
			disabled: function(a) {
				return a.disabled === ! 0
			},
			checked: function(a) {
				return a.checked === ! 0
			},
			selected: function(a) {
				return a.parentNode && a.parentNode.selectedIndex,
				a.selected === ! 0
			},
			parent: function(a) {
				return !! a.firstChild
			},
			empty: function(a) {
				return ! a.firstChild
			},
			has: function(a, b, c) {
				return !! j(c[3], a).length
			},
			header: function(a) {
				return /h\d/i.test(a.nodeName)
			},
			text: function(a) {
				var b = a.getAttribute("type"),
				c = a.type;
				return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
			},
			radio: function(a) {
				return a.nodeName.toLowerCase() === "input" && "radio" === a.type
			},
			checkbox: function(a) {
				return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
			},
			file: function(a) {
				return a.nodeName.toLowerCase() === "input" && "file" === a.type
			},
			password: function(a) {
				return a.nodeName.toLowerCase() === "input" && "password" === a.type
			},
			submit: function(a) {
				var b = a.nodeName.toLowerCase();
				return (b === "input" || b === "button") && "submit" === a.type
			},
			image: function(a) {
				return a.nodeName.toLowerCase() === "input" && "image" === a.type
			},
			reset: function(a) {
				var b = a.nodeName.toLowerCase();
				return (b === "input" || b === "button") && "reset" === a.type
			},
			button: function(a) {
				var b = a.nodeName.toLowerCase();
				return b === "input" && "button" === a.type || b === "button"
			},
			input: function(a) {
				return /input|select|textarea|button/i.test(a.nodeName)
			},
			focus: function(a) {
				return a === a.ownerDocument.activeElement
			}
		},
		setFilters: {
			first: function(a, b) {
				return b === 0
			},
			last: function(a, b, c, d) {
				return b === d.length - 1
			},
			even: function(a, b) {
				return b % 2 === 0
			},
			odd: function(a, b) {
				return b % 2 === 1
			},
			lt: function(a, b, c) {
				return b < c[3] - 0
			},
			gt: function(a, b, c) {
				return b > c[3] - 0
			},
			nth: function(a, b, c) {
				return c[3] - 0 === b
			},
			eq: function(a, b, c) {
				return c[3] - 0 === b
			}
		},
		filter: {
			PSEUDO: function(a, b, c, d) {
				var e = b[1],
				f = l.filters[e];
				if (f) return f(a, c, b, d);
				if (e === "contains") return (a.textContent || a.innerText || k([a]) || "").indexOf(b[3]) >= 0;
				if (e === "not") {
					var g = b[3];
					for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return ! 1;
					return ! 0
				}
				j.error(e)
			},
			CHILD: function(a, c) {
				var d, e, f, g, h, i, j, k = c[1],
				l = a;
				switch (k) {
				case "only":
				case "first":
					while (l = l.previousSibling) if (l.nodeType === 1) return ! 1;
					if (k === "first") return ! 0;
					l = a;
				case "last":
					while (l = l.nextSibling) if (l.nodeType === 1) return ! 1;
					return ! 0;
				case "nth":
					d = c[2],
					e = c[3];
					if (d === 1 && e === 0) return ! 0;
					f = c[0],
					g = a.parentNode;
					if (g && (g[b] !== f || ! a.nodeIndex)) {
						i = 0;
						for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
						g[b] = f
					}
					return j = a.nodeIndex - e,
					d === 0 ? j === 0: j % d === 0 && j / d >= 0
				}
			},
			ID: function(a, b) {
				return a.nodeType === 1 && a.getAttribute("id") === b
			},
			TAG: function(a, b) {
				return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
			},
			CLASS: function(a, b) {
				return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > - 1
			},
			ATTR: function(a, b) {
				var c = b[1],
				d = j.attr ? j.attr(a, c) : l.attrHandle[c] ? l.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
				e = d + "",
				f = b[2],
				g = b[4];
				return d == null ? f === "!=": ! f && j.attr ? d != null: f === "=" ? e === g: f === "*=" ? e.indexOf(g) >= 0: f === "~=" ? (" " + e + " ").indexOf(g) >= 0: g ? f === "!=" ? e !== g: f === "^=" ? e.indexOf(g) === 0: f === "$=" ? e.substr(e.length - g.length) === g: f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-": ! 1: e && d !== ! 1
			},
			POS: function(a, b, c, d) {
				var e = b[2],
				f = l.setFilters[e];
				if (f) return f(a, c, b, d)
			}
		}
	},
	m = l.match.POS,
	n = function(a, b) {
		return "\\" + (b - 0 + 1)
	};
	for (var o in l.match) l.match[o] = new RegExp(l.match[o].source + /(?![^\[]*\])(?![^\(]*\))/.source),
	l.leftMatch[o] = new RegExp(/(^(?:.|\r|\n)*?)/.source + l.match[o].source.replace(/\\(\d+)/g, n));
	var p = function(a, b) {
		return a = Array.prototype.slice.call(a, 0),
		b ? (b.push.apply(b, a), b) : a
	};
	try {
		Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType
	} catch(q) {
		p = function(a, b) {
			var c = 0,
			e = b || [];
			if (d.call(a) === "[object Array]") Array.prototype.push.apply(e, a);
			else if (typeof a.length == "number") for (var f = a.length; c < f; c++) e.push(a[c]);
			else for (; a[c]; c++) e.push(a[c]);
			return e
		}
	}
	var r, s;
	document.documentElement.compareDocumentPosition ? r = function(a, b) {
		return a === b ? (e = ! 0, 0) : ! a.compareDocumentPosition || ! b.compareDocumentPosition ? a.compareDocumentPosition ? - 1: 1: a.compareDocumentPosition(b) & 4 ? - 1: 1
	}: (r = function(a, b) {
		if (a === b) return e = ! 0,
		0;
		if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
		var c, d, f = [],
		g = [],
		h = a.parentNode,
		i = b.parentNode,
		j = h;
		if (h === i) return s(a, b);
		if (!h) return - 1;
		if (!i) return 1;
		while (j) f.unshift(j),
		j = j.parentNode;
		j = i;
		while (j) g.unshift(j),
		j = j.parentNode;
		c = f.length,
		d = g.length;
		for (var k = 0; k < c && k < d; k++) if (f[k] !== g[k]) return s(f[k], g[k]);
		return k === c ? s(a, g[k], - 1) : s(f[k], b, 1)
	},
	s = function(a, b, c) {
		if (a === b) return c;
		var d = a.nextSibling;
		while (d) {
			if (d === b) return - 1;
			d = d.nextSibling
		}
		return 1
	}),
	function() {
		var a = document.createElement("div"),
		b = "script" + (new Date).getTime(),
		c = document.documentElement;
		a.innerHTML = "<a name='" + b + "'/>",
		c.insertBefore(a, c.firstChild),
		document.getElementById(b) && (l.find.ID = function(a, b, c) {
			if (typeof b.getElementById != "undefined" && ! c) {
				var d = b.getElementById(a[1]);
				return d ? d.id === a[1] || typeof d.getAttributeNode != "undefined" && d.getAttributeNode("id").nodeValue === a[1] ? [d] : undefined: []
			}
		},
		l.filter.ID = function(a, b) {
			var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
			return a.nodeType === 1 && c && c.nodeValue === b
		}),
		c.removeChild(a),
		c = a = null
	} (),
	function() {
		var a = document.createElement("div");
		a.appendChild(document.createComment("")),
		a.getElementsByTagName("*").length > 0 && (l.find.TAG = function(a, b) {
			var c = b.getElementsByTagName(a[1]);
			if (a[1] === "*") {
				var d = [];
				for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
				c = d
			}
			return c
		}),
		a.innerHTML = "<a href='#'></a>",
		a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (l.attrHandle.href = function(a) {
			return a.getAttribute("href", 2)
		}),
		a = null
	} (),
	document.querySelectorAll && function() {
		var a = j,
		b = document.createElement("div"),
		c = "__sizzle__";
		b.innerHTML = "<p class='TEST'></p>";
		if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
		j = function(b, d, e, f) {
			d = d || document;
			if (!f && ! j.isXML(d)) {
				var g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
				if (g && (d.nodeType === 1 || d.nodeType === 9)) {
					if (g[1]) return p(d.getElementsByTagName(b), e);
					if (g[2] && l.find.CLASS && d.getElementsByClassName) return p(d.getElementsByClassName(g[2]), e)
				}
				if (d.nodeType === 9) {
					if (b === "body" && d.body) return p([d.body], e);
					if (g && g[3]) {
						var h = d.getElementById(g[3]);
						if (!h || ! h.parentNode) return p([], e);
						if (h.id === g[3]) return p([h], e)
					}
					try {
						return p(d.querySelectorAll(b), e)
					} catch(i) {}
				} else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
					var k = d,
					m = d.getAttribute("id"),
					n = m || c,
					o = d.parentNode,
					q = /^\s*[+~]/.test(b);
					m ? n = n.replace(/'/g, "\\$&") : d.setAttribute("id", n),
					q && o && (d = d.parentNode);
					try {
						if (!q || o) return p(d.querySelectorAll("[id='" + n + "'] " + b), e)
					} catch(r) {} finally {
						m || k.removeAttribute("id")
					}
				}
			}
			return a(b, d, e, f)
		};
		for (var d in a) j[d] = a[d];
		b = null
	} (),
	function() {
		var a = document.documentElement,
		b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
		if (b) {
			var c = ! b.call(document.createElement("div"), "div"),
			d = ! 1;
			try {
				b.call(document.documentElement, "[test!='']:sizzle")
			} catch(e) {
				d = ! 0
			}
			j.matchesSelector = function(a, e) {
				e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
				if (!j.isXML(a)) try {
					if (d || ! l.match.PSEUDO.test(e) && ! /!=/.test(e)) {
						var f = b.call(a, e);
						if (f || ! c || a.document && a.document.nodeType !== 11) return f
					}
				} catch(g) {}
				return j(e, null, null, [a]).length > 0
			}
		}
	} (),
	function() {
		var a = document.createElement("div");
		a.innerHTML = "<div class='test e'></div><div class='test'></div>";
		if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
		a.lastChild.className = "e";
		if (a.getElementsByClassName("e").length === 1) return;
		l.order.splice(1, 0, "CLASS"),
		l.find.CLASS = function(a, b, c) {
			if (typeof b.getElementsByClassName != "undefined" && ! c) return b.getElementsByClassName(a[1])
		},
		a = null
	} (),
	document.documentElement.contains ? j.contains = function(a, b) {
		return a !== b && (a.contains ? a.contains(b) : ! 0)
	}: document.documentElement.compareDocumentPosition ? j.contains = function(a, b) {
		return !! (a.compareDocumentPosition(b) & 16)
	}: j.contains = function() {
		return ! 1
	},
	j.isXML = function(a) {
		var b = (a ? a.ownerDocument || a: 0).documentElement;
		return b ? b.nodeName !== "HTML": ! 1
	};
	var v = function(a, b, c) {
		var d, e = [],
		f = "",
		g = b.nodeType ? [b] : b;
		while (d = l.match.PSEUDO.exec(a)) f += d[0],
		a = a.replace(l.match.PSEUDO, "");
		a = l.relative[a] ? a + "*": a;
		for (var h = 0, i = g.length; h < i; h++) j(a, g[h], e, c);
		return j.filter(f, e)
	};
	baidu.dom.query = j
} (),
function() {
	var a = baidu.dom.ready = function() {
		function d() {
			if (!d.isReady) {
				d.isReady = ! 0;
				for (var a = 0, c = b.length; a < c; a++) b[a]()
			}
		}
		function e() {
			try {
				document.documentElement.doScroll("left")
			} catch(a) {
				setTimeout(e, 1);
				return
			}
			d()
		}
		function f() {
			if (a) return;
			a = ! 0;
			if (document.readyState === "complete") d.isReady = ! 0;
			else if (document.addEventListener) document.addEventListener("DOMContentLoaded", c, ! 1),
			window.addEventListener("load", d, ! 1);
			else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", c),
				window.attachEvent("onload", d);
				var b = ! 1;
				try {
					b = window.frameElement == null
				} catch(f) {}
				document.documentElement.doScroll && b && e()
			}
		}
		var a = ! 1,
		b = [],
		c;
		return document.addEventListener ? c = function() {
			document.removeEventListener("DOMContentLoaded", c, ! 1),
			d()
		}: document.attachEvent && (c = function() {
			document.readyState === "complete" && (document.detachEvent("onreadystatechange", c), d())
		}),
		f(),
		function(a) {
			d.isReady ? a() : b.push(a)
		}
	} ();
	a.isReady = ! 1
} (),
baidu.dom.remove = function(a) {
	a = baidu.dom._g(a);
	var b = a.parentNode;
	b && b.removeChild(a)
},
baidu.dom.removeClass = function(a, b) {
	a = baidu.dom.g(a);
	var c = a.className.split(/\s+/),
	d = b.split(/\s+/),
	e,
	f = d.length,
	g,
	h = 0;
	for (; h < f; ++h) for (g = 0, e = c.length; g < e; ++g) if (c[g] == d[h]) {
		c.splice(g, 1);
		break
	}
	return a.className = c.join(" "),
	a
},
baidu.removeClass = baidu.dom.removeClass,
baidu.dom.removeStyle = function() {
	var a = document.createElement("DIV"),
	b,
	c = baidu.dom._g;
	return a.style.removeProperty ? b = function(a, b) {
		return a = c(a),
		a.style.removeProperty(b),
		a
	}: a.style.removeAttribute && (b = function(a, b) {
		return a = c(a),
		a.style.removeAttribute(baidu.string.toCamelCase(b)),
		a
	}),
	a = null,
	b
} (),
baidu.object.each = function(a, b) {
	var c, d, e;
	if ("function" == typeof b) for (d in a) if (a.hasOwnProperty(d)) {
		e = a[d],
		c = b.call(a, e, d);
		if (c === ! 1) break
	}
	return a
},
baidu.lang.isNumber = function(a) {
	return "[object Number]" == Object.prototype.toString.call(a) && isFinite(a)
},
baidu.event.getTarget = function(a) {
	return a.target || a.srcElement
},
baidu.dom.setBorderBoxSize = function(a, b) {
	function d(a, b) {
		return parseFloat(baidu.getStyle(a, b)) || 0
	}
	var c = {};
	return b.width && (c.width = parseFloat(b.width)),
	b.height && (c.height = parseFloat(b.height)),
	baidu.browser.isStrict && (b.width && (c.width = parseFloat(b.width) - d(a, "paddingLeft") - d(a, "paddingRight") - d(a, "borderLeftWidth") - d(a, "borderRightWidth"), c.width < 0 && (c.width = 0)), b.height && (c.height = parseFloat(b.height) - d(a, "paddingTop") - d(a, "paddingBottom") - d(a, "borderTopWidth") - d(a, "borderBottomWidth"), c.height < 0 && (c.height = 0))),
	baidu.dom.setStyles(a, c)
},
baidu.dom.setOuterHeight = baidu.dom.setBorderBoxHeight = function(a, b) {
	return baidu.dom.setBorderBoxSize(a, {
		height: b
	})
},
baidu.dom.setOuterWidth = baidu.dom.setBorderBoxWidth = function(a, b) {
	return baidu.dom.setBorderBoxSize(a, {
		width: b
	})
},
baidu.dom.resizable = function(a, b) {
	function s() {
		m = baidu.extend({
			e: {
				right: "-5px",
				top: "0px",
				width: "7px",
				height: c.offsetHeight
			},
			s: {
				left: "0px",
				bottom: "-5px",
				height: "7px",
				width: c.offsetWidth
			},
			n: {
				left: "0px",
				top: "-5px",
				height: "7px",
				width: c.offsetWidth
			},
			w: {
				left: "-5px",
				top: "0px",
				height: c.offsetHeight,
				width: "7px"
			},
			se: {
				right: "1px",
				bottom: "1px",
				height: "16px",
				width: "16px"
			},
			sw: {
				left: "1px",
				bottom: "1px",
				height: "16px",
				width: "16px"
			},
			ne: {
				right: "1px",
				top: "1px",
				height: "16px",
				width: "16px"
			},
			nw: {
				left: "1px",
				top: "1px",
				height: "16px",
				width: "16px"
			}
		},
		d.directionHandlePosition),
		baidu.each(d.direction, function(a) {
			var b = d.classPrefix.split(" ");
			b[0] = b[0] + "-resizable-" + a;
			var f = baidu.dom.create("div", {
				className: b.join(" ")
			}),
			g = m[a];
			g.cursor = a + "-resize",
			g.position = "absolute",
			baidu.setStyles(f, g),
			f.key = a,
			f.style.MozUserSelect = "none",
			c.appendChild(f),
			e[a] = f,
			baidu.on(f, "mousedown", v)
		}),
		o = ! 1
	}
	function t() {
		l && w(),
		baidu.object.each(e, function(a) {
			baidu.un(a, "mousedown", v),
			baidu.dom.remove(a)
		}),
		o = ! 0
	}
	function u(a) {
		o || (d = baidu.extend(d, a || {}), t(), s())
	}
	function v(a) {
		p && w();
		var b = baidu.event.getTarget(a),
		c = b.key;
		l = b,
		p = ! 0,
		b.setCapture ? b.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP),
		j = baidu.getStyle(document.body, "cursor"),
		baidu.setStyle(document.body, "cursor", c + "-resize"),
		baidu.on(document.body, "mouseup", w),
		baidu.on(document.body, "selectstart", y),
		i = document.body.style.MozUserSelect,
		document.body.style.MozUserSelect = "none";
		var e = baidu.page.getMousePosition();
		g = z(),
		n = setInterval(function() {
			x(c, e)
		},
		20),
		baidu.lang.isFunction(d.onresizestart) && d.onresizestart(),
		baidu.event.preventDefault(a)
	}
	function w() {
		l && l.releaseCapture ? l.releaseCapture() : window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP),
		baidu.un(document.body, "mouseup", w),
		baidu.un(document, "selectstart", y),
		document.body.style.MozUserSelect = i,
		baidu.un(document.body, "selectstart", y),
		clearInterval(n),
		baidu.setStyle(document.body, "cursor", j),
		l = null,
		p = ! 1,
		baidu.lang.isFunction(d.onresizeend) && d.onresizeend()
	}
	function x(a, b) {
		var f = baidu.page.getMousePosition(),
		i = g.width,
		j = g.height,
		k = g.top,
		l = g.left,
		m;
		a.indexOf("e") >= 0 ? (i = Math.max(f.x - b.x + g.width, h[0]), i = Math.min(i, h[1])) : a.indexOf("w") >= 0 && (i = Math.max(b.x - f.x + g.width, h[0]), i = Math.min(i, h[1]), l -= i - g.width),
		a.indexOf("s") >= 0 ? (j = Math.max(f.y - b.y + g.height, h[2]), j = Math.min(j, h[3])) : a.indexOf("n") >= 0 && (j = Math.max(b.y - f.y + g.height, h[2]), j = Math.min(j, h[3]), k -= j - g.height),
		m = {
			width: i,
			height: j,
			top: k,
			left: l
		},
		baidu.dom.setOuterHeight(c, j),
		baidu.dom.setOuterWidth(c, i),
		baidu.setStyles(c, {
			top: k,
			left: l
		}),
		e.n && baidu.setStyle(e.n, "width", i),
		e.s && baidu.setStyle(e.s, "width", i),
		e.e && baidu.setStyle(e.e, "height", j),
		e.w && baidu.setStyle(e.w, "height", j),
		baidu.lang.isFunction(d.onresize) && d.onresize({
			current: m,
			original: g
		})
	}
	function y(a) {
		return baidu.event.preventDefault(a, ! 1)
	}
	function z() {
		var a = baidu.dom.getPosition(c.offsetParent),
		b = baidu.dom.getPosition(c),
		d,
		e;
		return r == "absolute" ? (d = b.top - (c.offsetParent == document.body ? 0: a.top), e = b.left - (c.offsetParent == document.body ? 0: a.left)) : (d = parseFloat(baidu.getStyle(c, "top")) || - parseFloat(baidu.getStyle(c, "bottom")) || 0, e = parseFloat(baidu.getStyle(c, "left")) || - parseFloat(baidu.getStyle(c, "right")) || 0),
		baidu.setStyles(c, {
			top: d,
			left: e
		}),
		{
			width: c.offsetWidth,
			height: c.offsetHeight,
			top: d,
			left: e
		}
	}
	var c, d, e = {},
	f, g = {},
	h, i, j, k, l, m, n, o = ! 1,
	p = ! 1,
	q = {
		direction: ["e", "s", "se"],
		minWidth: 16,
		minHeight: 16,
		classPrefix: "tangram",
		directionHandlePosition: {}
	};
	if (! (c = baidu.dom.g(a)) && baidu.getStyle(c, "position") == "static") return ! 1;
	k = c.offsetParent;
	var r = baidu.getStyle(c, "position");
	return d = baidu.extend(q, b),
	baidu.each(["minHeight", "minWidth", "maxHeight", "maxWidth"], function(a) {
		d[a] && (d[a] = parseFloat(d[a]))
	}),
	h = [d.minWidth || 0, d.maxWidth || Number.MAX_VALUE, d.minHeight || 0, d.maxHeight || Number.MAX_VALUE],
	s(),
	{
		cancel: t,
		update: u,
		enable: s
	}
},
baidu.dom.setPixel = function(a, b, c) {
	typeof c != "undefined" && (baidu.dom.g(a).style[b] = c + (isNaN(c) ? "": "px"))
},
baidu.dom.setPosition = function(a, b) {
	return baidu.dom.setStyles(a, {
		left: b.left - (parseFloat(baidu.dom.getStyle(a, "margin-left")) || 0),
		top: b.top - (parseFloat(baidu.dom.getStyle(a, "margin-top")) || 0)
	})
},
baidu.dom.show = function(a) {
	return a = baidu.dom.g(a),
	a.style.display = "",
	a
},
baidu.show = baidu.dom.show,
baidu.dom.toggle = function(a) {
	return a = baidu.dom.g(a),
	a.style.display = a.style.display == "none" ? "": "none",
	a
},
baidu.dom.toggleClass = function(a, b) {
	baidu.dom.hasClass(a, b) ? baidu.dom.removeClass(a, b) : baidu.dom.addClass(a, b)
},
baidu.dom._styleFilter[baidu.dom._styleFilter.length] = {
	get: function(a, b) {
		if (/color/i.test(a) && b.indexOf("rgb(") != - 1) {
			var c = b.split(",");
			b = "#";
			for (var d = 0, e; e = c[d]; d++) e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16),
			b += e.length == 1 ? "0" + e: e;
			b = b.toUpperCase()
		}
		return b
	}
},
baidu.dom._styleFixer.display = baidu.browser.ie && baidu.browser.ie < 8 ? {
	set: function(a, b) {
		a = a.style,
		b == "inline-block" ? (a.display = "inline", a.zoom = 1) : a.display = b
	}
}: baidu.browser.firefox && baidu.browser.firefox < 3 ? {
	set: function(a, b) {
		a.style.display = b == "inline-block" ? "-moz-inline-box": b
	}
}: null,
baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat": "cssFloat",
baidu.dom._styleFixer.opacity = baidu.browser.ie ? {
	get: function(a) {
		var b = a.style.filter;
		return b && b.indexOf("opacity=") >= 0 ? parseFloat(b.match(/opacity=([^)]*)/)[1]) / 100 + "": "1"
	},
	set: function(a, b) {
		var c = a.style;
		c.filter = (c.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (b == 1 ? "": "alpha(opacity=" + b * 100 + ")"),
		c.zoom = 1
	}
}: null,
baidu.dom._styleFixer.textOverflow = function() {
	function b(a) {
		var b = a.length;
		return b > 0 ? (b = a[b - 1], a.length--) : b = null,
		b
	}
	function c(a, b) {
		a[baidu.browser.firefox ? "textContent": "innerText"] = b
	}
	function d(e, f, g) {
		var h = baidu.browser.ie ? e.currentStyle || e.style: getComputedStyle(e, null),
		i = h.fontWeight,
		j = "font-family:" + h.fontFamily + ";font-size:" + h.fontSize + ";word-spacing:" + h.wordSpacing + ";font-weight:" + ((parseInt(i) || 0) == 401 ? 700: i) + ";font-style:" + h.fontStyle + ";font-variant:" + h.fontVariant,
		k = a[j];
		if (!k) {
			h = e.appendChild(document.createElement("div")),
			h.style.cssText = "float:left;" + j,
			k = a[j] = [];
			for (var l = 0; l < 256; l++) l == 32 ? h.innerHTML = "&nbsp;": c(h, String.fromCharCode(l)),
			k[l] = h.offsetWidth;
			c(h, "\u4e00"),
			k[256] = h.offsetWidth,
			c(h, "\u4e00\u4e00"),
			k[257] = h.offsetWidth - k[256] * 2,
			k[258] = k[".".charCodeAt(0)] * 3 + k[257] * 3,
			e.removeChild(h)
		}
		for (var m = e.firstChild, n = k[256], o = k[257], p = k[258], q = [], g = g ? p: 0; m; m = m.nextSibling) if (f < g) e.removeChild(m);
		else if (m.nodeType == 3) for (var l = 0, r = m.nodeValue, s = r.length; l < s; l++) {
			h = r.charCodeAt(l),
			q[q.length] = [f, m, l],
			f -= (l ? o: 0) + (h < 256 ? k[h] : n);
			if (f < g) break
		} else h = m.tagName,
		h == "IMG" || h == "TABLE" ? (h = m, m = m.previousSibling, e.removeChild(h)) : (q[q.length] = [f, m], f -= m.offsetWidth);
		if (f < g) {
			while (h = b(q)) {
				f = h[0],
				m = h[1],
				h = h[2];
				if (m.nodeType == 3) {
					if (f >= p) return m.nodeValue = m.nodeValue.substring(0, h) + "...",
					! 0;
					h || e.removeChild(m)
				} else {
					if (d(m, f, ! 0)) return ! 0;
					e.removeChild(m)
				}
			}
			e.innerHTML = ""
		}
	}
	var a = {};
	return {
		get: function(a) {
			var b = baidu.browser,
			c = dom.getStyle;
			return (b.opera ? c("OTextOverflow") : b.firefox ? a._baiduOverflow: c("textOverflow")) || "clip"
		},
		set: function(a, b) {
			var c = baidu.browser;
			if (a.tagName == "TD" || a.tagName == "TH" || c.firefox) {
				a._baiduHTML && (a.innerHTML = a._baiduHTML);
				if (b == "ellipsis") {
					a._baiduHTML = a.innerHTML;
					var e = document.createElement("div"),
					f = a.appendChild(e).offsetWidth;
					a.removeChild(e),
					d(a, f)
				} else a._baiduHTML = ""
			}
			e = a.style,
			c.opera ? e.OTextOverflow = b: c.firefox ? a._baiduOverflow = b: e.textOverflow = b
		}
	}
} (),
baidu.lang.isArray = function(a) {
	return "[object Array]" == Object.prototype.toString.call(a)
},
baidu.lang.toArray = function(a) {
	if (a === null || a === undefined) return [];
	if (baidu.lang.isArray(a)) return a;
	if (typeof a.length != "number" || typeof a == "string" || baidu.lang.isFunction(a)) return [a];
	if (a.item) {
		var b = a.length,
		c = new Array(b);
		while (b--) c[b] = a[b];
		return c
	}
	return [].slice.call(a)
},
baidu.fn.methodize = function(a, b) {
	return function() {
		return a.apply(this, [b ? this[b] : this].concat([].slice.call(arguments)))
	}
},
baidu.fn.wrapReturnValue = function(a, b, c) {
	return c |= 0,
	function() {
		var d = a.apply(this, arguments);
		return c > 0 ? new b(arguments[c - 1]) : c ? d: new b(d)
	}
},
baidu.fn.multize = function(a, b, c) {
	var d = function() {
		var e = arguments[0],
		f = b ? d: a,
		g = [],
		h = [].slice.call(arguments, 0),
		i = 0,
		j,
		k;
		if (e instanceof Array) {
			for (j = e.length; i < j; i++) h[0] = e[i],
			k = f.apply(this, h),
			c ? k && (g = g.concat(k)) : g.push(k);
			return g
		}
		return a.apply(this, arguments)
	};
	return d
},
baidu.element = function(a) {
	var b = baidu._g(a);
	return ! b && baidu.dom.query && (b = baidu.dom.query(a)),
	new baidu.element.Element(b)
},
baidu.e = baidu.element,
baidu.element.Element = function(a) {
	baidu.element._init || (baidu.element._makeChain(), baidu.element._init = ! 0),
	this._dom = (a.tagName || "").toLowerCase() == "select" ? [a] : baidu.lang.toArray(a)
},
baidu.element.Element.prototype.each = function(a) {
	baidu.array.each(this._dom, function(b, c) {
		a.call(b, b, c)
	})
},
baidu.element._toChainFunction = function(a, b, c) {
	return baidu.fn.methodize(baidu.fn.wrapReturnValue(baidu.fn.multize(a, 0, 1), baidu.element.Element, b), "_dom")
},
baidu.element._makeChain = function() {
	function c(a) {
		return a.charAt(3).toLowerCase()
	}
	var a = baidu.element.Element.prototype,
	b = baidu.element._toChainFunction;
	baidu.each("draggable droppable resizable fixable".split(" "), function(c) {
		a[c] = b(baidu.dom[c], 1)
	}),
	baidu.each("remove getText contains getAttr getPosition getStyle hasClass intersect hasAttr getComputedStyle".split(" "), function(d) {
		a[d] = a[d.replace(/^get[A-Z]/g, c)] = b(baidu.dom[d], - 1)
	}),
	baidu.each("addClass empty hide show insertAfter insertBefore insertHTML removeClass setAttr setAttrs setStyle setStyles show toggleClass toggle next first getAncestorByClass getAncestorBy getAncestorByTag getDocument getParent getWindow last next prev g removeStyle setBorderBoxSize setOuterWidth setOuterHeight setBorderBoxWidth setBorderBoxHeight setPosition children query".split(" "), function(d) {
		a[d] = a[d.replace(/^get[A-Z]/g, c)] = b(baidu.dom[d], 0)
	}),
	a.q = a.Q = b(function(a, b) {
		return baidu.dom.q.apply(this, [b, a].concat([].slice.call(arguments, 2)))
	},
	0),
	baidu.each("on un".split(" "), function(c) {
		a[c] = b(baidu.event[c], 0)
	}),
	baidu.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(b) {
		a[b] = function(a) {
			return this.on(b, a)
		}
	})
},
baidu.element.extend = function(a) {
	var b = baidu.element;
	baidu.object.each(a, function(a, c) {
		b.Element.prototype[c] = baidu.element._toChainFunction(a, - 1)
	})
},
baidu.event.EventArg = function(a, b) {
	b = b || window,
	a = a || b.event;
	var c = b.document;
	this.target = a.target || a.srcElement,
	this.keyCode = a.which || a.keyCode;
	for (var d in a) {
		var e = a[d];
		"function" != typeof e && (this[d] = e)
	} ! this.pageX && this.pageX !== 0 && (this.pageX = (a.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft), this.pageY = (a.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)),
	this._event = a
},
baidu.event.EventArg.prototype.preventDefault = function() {
	return this._event.preventDefault ? this._event.preventDefault() : this._event.returnValue = ! 1,
	this
},
baidu.event.EventArg.prototype.stopPropagation = function() {
	return this._event.stopPropagation ? this._event.stopPropagation() : this._event.cancelBubble = ! 0,
	this
},
baidu.event.EventArg.prototype.stop = function() {
	return this.stopPropagation().preventDefault()
},
baidu.object.values = function(a) {
	var b = [],
	c = 0,
	d;
	for (d in a) a.hasOwnProperty(d) && (b[c++] = a[d]);
	return b
},
function() {
	function g(a, b) {
		var c = 0,
		d = a.length,
		e = {};
		for (; c < d; c++) e[a[c]] = b[a[c]],
		delete b[a[c]];
		return e
	}
	function h(a, b, c) {
		c = baidu.object.extend({},
		c);
		var d = baidu.object.values(g(f[b], c)),
		e = document.createEvent(b);
		return d.unshift(a),
		"KeyEvents" == b ? e.initKeyEvent.apply(e, d) : "MouseEvents" == b ? e.initMouseEvent.apply(e, d) : "UIEvents" == b ? e.initUIEvent.apply(e, d) : e.initEvent.apply(e, d),
		baidu.object.extend(e, c),
		e
	}
	function i(a) {
		var b;
		return document.createEventObject && (b = document.createEventObject(), baidu.object.extend(b, a)),
		b
	}
	function j(a, b) {
		b = g(f.KeyEvents, b);
		var c;
		if (document.createEvent) try {
			c = h(a, "KeyEvents", b)
		} catch(d) {
			try {
				c = h(a, "Events", b)
			} catch(e) {
				c = h(a, "UIEvents", b)
			}
		} else b.keyCode = b.charCode > 0 ? b.charCode: b.keyCode,
		c = i(b);
		return c
	}
	function k(a, b) {
		b = g(f.MouseEvents, b);
		var c;
		return document.createEvent ? (c = h(a, "MouseEvents", b), b.relatedTarget && ! c.relatedTarget && ("mouseout" == a.toLowerCase() ? c.toElement = b.relatedTarget: "mouseover" == a.toLowerCase() && (c.fromElement = b.relatedTarget))) : (b.button = b.button == 0 ? 1: b.button == 1 ? 4: baidu.lang.isNumber(b.button) ? b.button: 0, c = i(b)),
		c
	}
	function l(a, b) {
		b.bubbles = e.hasOwnProperty(a),
		b = g(f.HTMLEvents, b);
		var c;
		if (document.createEvent) try {
			c = h(a, "HTMLEvents", b)
		} catch(d) {
			try {
				c = h(a, "UIEvents", b)
			} catch(j) {
				c = h(a, "Events", b)
			}
		} else c = i(b);
		return c
	}
	var a = baidu.browser,
	b = {
		keydown: 1,
		keyup: 1,
		keypress: 1
	},
	c = {
		click: 1,
		dblclick: 1,
		mousedown: 1,
		mousemove: 1,
		mouseup: 1,
		mouseover: 1,
		mouseout: 1
	},
	d = {
		abort: 1,
		blur: 1,
		change: 1,
		error: 1,
		focus: 1,
		load: a.ie ? 0: 1,
		reset: 1,
		resize: 1,
		scroll: 1,
		select: 1,
		submit: 1,
		unload: a.ie ? 0: 1
	},
	e = {
		scroll: 1,
		resize: 1,
		reset: 1,
		submit: 1,
		change: 1,
		select: 1,
		error: 1,
		abort: 1
	},
	f = {
		KeyEvents: ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
		MouseEvents: ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
		HTMLEvents: ["bubbles", "cancelable"],
		UIEvents: ["bubbles", "cancelable", "view", "detail"],
		Events: ["bubbles", "cancelable"]
	};
	baidu.object.extend(e, b),
	baidu.object.extend(e, c),
	baidu.event.fire = function(a, e, f) {
		var g;
		e = e.replace(/^on/i, ""),
		a = baidu.dom._g(a),
		f = baidu.object.extend({
			bubbles: ! 0,
			cancelable: ! 0,
			view: window,
			detail: 1,
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			ctrlKey: ! 1,
			altKey: ! 1,
			shiftKey: ! 1,
			metaKey: ! 1,
			keyCode: 0,
			charCode: 0,
			button: 0,
			relatedTarget: null
		},
		f);
		if (b[e]) g = j(e, f);
		else if (c[e]) g = k(e, f);
		else if (d[e]) g = l(e, f);
		else throw new Error(e + " is not support!");
		g && (a.dispatchEvent ? a.dispatchEvent(g) : a.fireEvent && a.fireEvent("on" + e, g))
	}
} (),
baidu.event.get = function(a, b) {
	return new baidu.event.EventArg(a, b)
},
baidu.event.getEvent = function(a) {
	if (window.event) return window.event;
	var b = arguments.callee;
	do
	if (/Event/.test(b.arguments[0])) return b.arguments[0];
	while (b = b.caller);
	return null
},
baidu.event.getKeyCode = function(a) {
	return a.which || a.keyCode
},
baidu.event.getPageX = function(a) {
	var b = a.pageX,
	c = document;
	return ! b && b !== 0 && (b = (a.clientX || 0) + (c.documentElement.scrollLeft || c.body.scrollLeft)),
	b
},
baidu.event.getPageY = function(a) {
	var b = a.pageY,
	c = document;
	return ! b && b !== 0 && (b = (a.clientY || 0) + (c.documentElement.scrollTop || c.body.scrollTop)),
	b
},
baidu.event.once = function(a, b, c) {
	function d(e) {
		c.call(a, e),
		baidu.event.un(a, b, d)
	}
	return a = baidu.dom._g(a),
	baidu.event.on(a, b, d),
	a
},
baidu.event.stopPropagation = function(a) {
	a.stopPropagation ? a.stopPropagation() : a.cancelBubble = ! 0
},
baidu.event.stop = function(a) {
	var b = baidu.event;
	b.stopPropagation(a),
	b.preventDefault(a)
},
baidu.event._eventFilter = baidu.event._eventFilter || {},
baidu.event._eventFilter._crossElementBoundary = function(a, b) {
	var c = b.relatedTarget,
	d = b.currentTarget;
	if (c === ! 1 || d == c || c && (c.prefix == "xul" || baidu.dom.contains(d, c))) return;
	return a.call(d, b)
},
baidu.fn.bind = function(a, b) {
	var c = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
	return function() {
		var d = baidu.lang.isString(a) ? b[a] : a,
		e = c ? c.concat([].slice.call(arguments, 0)) : arguments;
		return d.apply(b || d, e)
	}
},
baidu.event._eventFilter.mouseenter = window.attachEvent ? null: function(a, b, c) {
	return {
		type: "mouseover",
		listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
	}
},
baidu.event._eventFilter.mouseleave = window.attachEvent ? null: function(a, b, c) {
	return {
		type: "mouseout",
		listener: baidu.fn.bind(baidu.event._eventFilter._crossElementBoundary, this, c)
	}
},
baidu.event._unload = function() {
	var a = baidu.event._listeners,
	b = a.length,
	c = !! window.removeEventListener,
	d, e;
	while (b--) {
		d = a[b];
		if (d[1] == "unload") continue;
		if (! (e = d[0])) continue;
		e.removeEventListener ? e.removeEventListener(d[1], d[3], ! 1) : e.detachEvent && e.detachEvent("on" + d[1], d[3])
	}
	c ? window.removeEventListener("unload", baidu.event._unload, ! 1) : window.detachEvent("onunload", baidu.event._unload)
},
window.attachEvent ? window.attachEvent("onunload", baidu.event._unload) : window.addEventListener("unload", baidu.event._unload, ! 1),
baidu.fn.abstractMethod = function() {
	throw Error("unimplemented abstract method")
},
baidu.form = baidu.form || {},
baidu.form.json = function(a, b) {
	function m(a, b) {
		var c = d[a];
		c ? (c.push || (d[a] = [c]), d[a].push(b)) : d[a] = b
	}
	var c = a.elements,
	b = b || function(a, b) {
		return a
	},
	d = {},
	e,
	f,
	g,
	h,
	i,
	j,
	k,
	l;
	for (var n = 0, o = c.length; n < o; n++) {
		e = c[n],
		g = e.name;
		if (!e.disabled && g) {
			f = e.type,
			h = baidu.url.escapeSymbol(e.value);
			switch (f) {
			case "radio":
			case "checkbox":
				if (!e.checked) break;
			case "textarea":
			case "text":
			case "password":
			case "hidden":
			case "file":
			case "select-one":
				m(g, b(h, g));
				break;
			case "select-multiple":
				i = e.options,
				k = i.length;
				for (j = 0; j < k; j++) l = i[j],
				l.selected && m(g, b(l.value, g))
			}
		}
	}
	return d
},
baidu.form.serialize = function(a, b) {
	function m(a, b) {
		d.push(a + "=" + b)
	}
	var c = a.elements,
	b = b || function(a, b) {
		return a
	},
	d = [],
	e,
	f,
	g,
	h,
	i,
	j,
	k,
	l;
	for (var n = 0, o = c.length; n < o; n++) {
		e = c[n],
		g = e.name;
		if (!e.disabled && g) {
			f = e.type,
			h = baidu.url.escapeSymbol(e.value);
			switch (f) {
			case "radio":
			case "checkbox":
				if (!e.checked) break;
			case "textarea":
			case "text":
			case "password":
			case "hidden":
			case "file":
			case "select-one":
				m(g, b(h, g));
				break;
			case "select-multiple":
				i = e.options,
				k = i.length;
				for (j = 0; j < k; j++) l = i[j],
				l.selected && m(g, b(l.value, g))
			}
		}
	}
	return d
},
baidu.global = baidu.global || {},
window[baidu.guid].global = window[baidu.guid].global || {},
function() {
	var a = window[baidu.guid].global;
	baidu.global.get = function(b) {
		return a[b]
	}
} (),
function() {
	var a = window[baidu.guid].global;
	baidu.global.set = function(b, c, d) {
		var e = ! d || d && typeof a[b] == "undefined";
		return e && (a[b] = c),
		a[b]
	}
} (),
baidu.global.getZIndex = function(a, b) {
	var c = baidu.global.get("zIndex");
	return a && (c[a] = c[a] + (b || 1)),
	c[a]
},
baidu.global.set("zIndex", {
	popup: 5e4,
	dialog: 1e3
},
! 0),
baidu.json = baidu.json || {},
baidu.json.parse = function(a) {
	return (new Function("return (" + a + ")"))()
},
baidu.json.decode = baidu.json.parse,
baidu.json.stringify = function() {
	function b(b) {
		return /["\\\x00-\x1f]/.test(b) && (b = b.replace(/["\\\x00-\x1f]/g, function(b) {
			var c = a[b];
			return c ? c: (c = b.charCodeAt(), "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16))
		})),
		'"' + b + '"'
	}
	function c(a) {
		var b = ["["],
		c = a.length,
		d,
		e,
		f;
		for (e = 0; e < c; e++) {
			f = a[e];
			switch (typeof f) {
			case "undefined":
			case "function":
			case "unknown":
				break;
			default:
				d && b.push(","),
				b.push(baidu.json.stringify(f)),
				d = 1
			}
		}
		return b.push("]"),
		b.join("")
	}
	function d(a) {
		return a < 10 ? "0" + a: a
	}
	function e(a) {
		return '"' + a.getFullYear() + "-" + d(a.getMonth() + 1) + "-" + d(a.getDate()) + "T" + d(a.getHours()) + ":" + d(a.getMinutes()) + ":" + d(a.getSeconds()) + '"'
	}
	var a = {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		'"': '\\"',
		"\\": "\\\\"
	};
	return function(a) {
		switch (typeof a) {
		case "undefined":
			return "undefined";
		case "number":
			return isFinite(a) ? String(a) : "null";
		case "string":
			return b(a);
		case "boolean":
			return String(a);
		default:
			if (a === null) return "null";
			if (a instanceof Array) return c(a);
			if (a instanceof Date) return e(a);
			var d = ["{"],
			g = baidu.json.stringify,
			h,
			i;
			for (var j in a) if (Object.prototype.hasOwnProperty.call(a, j)) {
				i = a[j];
				switch (typeof i) {
				case "undefined":
				case "unknown":
				case "function":
					break;
				default:
					h && d.push(","),
					h = 1,
					d.push(g(j) + ":" + g(i))
				}
			}
			return d.push("}"),
			d.join("")
		}
	}
} (),
baidu.json.encode = baidu.json.stringify,
baidu.lang.Class.prototype.addEventListeners = function(a, b) {
	if (typeof b == "undefined") for (var c in a) this.addEventListener(c, a[c]);
	else {
		a = a.split(",");
		var c = 0,
		d = a.length,
		e;
		for (; c < d; c++) this.addEventListener(baidu.trim(a[c]), b)
	}
},
baidu.lang.createClass = function(a, b) {
	b = b || {};
	var c = b.superClass || baidu.lang.Class,
	d = function() {
		var e = this;
		b.decontrolled && (e.__decontrolled = ! 0),
		c.apply(e, arguments);
		for (f in d.options) e[f] = d.options[f];
		a.apply(e, arguments);
		for (var f = 0, g = d["r"]; g && f < g.length; f++) g[f].apply(e, arguments)
	};
	d.options = b.options || {};
	var e = function() {},
	f = a.prototype;
	e.prototype = c.prototype;
	var g = d.prototype = new e;
	for (var h in f) g[h] = f[h];
	var i = b.className || b.type;
	return typeof i == "string" && (g.__type = i),
	g.constructor = f.constructor,
	d.extend = function(a) {
		for (var b in a) d.prototype[b] = a[b];
		return d
	},
	d
},
window[baidu.guid]._instances = window[baidu.guid]._instances || {},
baidu.lang.decontrol = function(a) {
	var b = window[baidu.guid];
	b._instances && delete b._instances[a]
},
baidu.lang.eventCenter = baidu.lang.eventCenter || baidu.lang.createSingle(),
baidu.lang.getModule = function(a, b) {
	var c = a.
	split("."),
	d = b || window,
	e;
	for (; e = c.shift();) if (d[e] != null) d = d[e];
	else return null;
	return d
},
baidu.lang.inherits = function(a, b, c) {
	var d, e, f = a.prototype,
	g = new Function;
	g.prototype = b.prototype,
	e = a.prototype = new g;
	for (d in f) e[d] = f[d];
	return a.prototype.constructor = a,
	a.superClass = b.prototype,
	typeof c == "string" && (e.__type = c),
	a.extend = function(b) {
		for (var c in b) e[c] = b[c];
		return a
	},
	a
},
baidu.inherits = baidu.lang.inherits,
baidu.lang.instance = function(a) {
	return window[baidu.guid]._instances[a] || null
},
baidu.lang.isBoolean = function(a) {
	return typeof a == "boolean"
},
baidu.lang.isDate = function(a) {
	return {}.toString.call(a) === "[object Date]" && a.toString() !== "Invalid Date" && ! isNaN(a)
},
baidu.lang.isElement = function(a) {
	return !! a && !! a.nodeName && a.nodeType == 1
},
baidu.lang.isObject = function(a) {
	return "function" == typeof a || !! a && "object" == typeof a
},
baidu.isObject = baidu.lang.isObject,
baidu.lang.module = function(name, module, owner) {
	var packages = name.split("."),
	len = packages.length - 1,
	packageName,
	i = 0;
	if (!owner) try {
		if (! (new RegExp("^[a-zA-Z_$][a-zA-Z0-9_$]*$")).test(packages[0])) throw "";
		owner = eval(packages[0]),
		i = 1
	} catch(e) {
		owner = window
	}
	for (; i < len; i++) packageName = packages[i],
	owner[packageName] || (owner[packageName] = {}),
	owner = owner[packageName];
	owner[packages[len]] || (owner[packages[len]] = module)
},
baidu.lang.register = function(a, b, c) {
	var d = a["r"] || (a["r"] = []);
	d[d.length] = b;
	for (var e in c) a.prototype[e] = c[e]
},
baidu.number.comma = function(a, b) {
	if (!b || b < 1) b = 3;
	return a = String(a).split("."),
	a[0] = a[0].replace(new RegExp("(\\d)(?=(\\d{" + b + "})+$)", "ig"), "$1,"),
	a.join(".")
},
baidu.number.randomInt = function(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a)
},
baidu.object.isPlain = function(a) {
	var b = Object.prototype.hasOwnProperty,
	c;
	if ( !! a && Object.prototype.toString.call(a) === "[object Object]" && "isPrototypeOf" in a) {
		if (a.constructor && ! b.call(a, "constructor") && ! b.call(a.constructor.prototype, "isPrototypeOf")) return ! 1;
		for (c in a);
		return c === undefined || b.call(a, c)
	}
	return ! 1
},
baidu.object.clone = function(a) {
	var b = a,
	c, d;
	if (!a || a instanceof Number || a instanceof String || a instanceof Boolean) return b;
	if (baidu.lang.isArray(a)) {
		b = [];
		var e = 0;
		for (c = 0, d = a.length; c < d; c++) b[e++] = baidu.object.clone(a[c])
	} else if (baidu.object.isPlain(a)) {
		b = {};
		for (c in a) a.hasOwnProperty(c) && (b[c] = baidu.object.clone(a[c]))
	}
	return b
},
baidu.object.isEmpty = function(a) {
	for (var b in a) return ! 1;
	return ! 0
},
baidu.object.keys = function(a) {
	var b = [],
	c = 0,
	d;
	for (d in a) a.hasOwnProperty(d) && (b[c++] = d);
	return b
},
baidu.object.map = function(a, b) {
	var c = {};
	for (var d in a) a.hasOwnProperty(d) && (c[d] = b(a[d], d));
	return c
},
function() {
	function b(b, c, d, e, f) {
		if (c.hasOwnProperty(d)) if (f && a(b[d])) baidu.object.merge(b[d], c[d], {
			overwrite: e,
			recursive: f
		});
		else if (e || ! (d in b)) b[d] = c[d]
	}
	var a = function(a) {
		return baidu.lang.isObject(a) && ! baidu.lang.isFunction(a)
	};
	baidu.object.merge = function(a, c, d) {
		var e = 0,
		f = d || {},
		g = f.overwrite,
		h = f.whiteList,
		i = f.recursive,
		j;
		if (h && h.length) {
			j = h.length;
			for (; e < j; ++e) b(a, c, h[e], g, i)
		} else for (e in c) b(a, c, e, g, i);
		return a
	}
} (),
baidu.page.createStyleSheet = function(a) {
	var b = a || {},
	c = b.document || document,
	d;
	if (baidu.browser.ie) return b.url || (b.url = ""),
	c.createStyleSheet(b.url, b.index);
	d = "<style type='text/css'></style>",
	b.url && (d = "<link type='text/css' rel='stylesheet' href='" + b.url + "'/>"),
	baidu.dom.insertHTML(c.getElementsByTagName("HEAD")[0], "beforeEnd", d);
	if (b.url) return null;
	var e = c.styleSheets[c.styleSheets.length - 1],
	f = e.rules || e.cssRules;
	return {
		self: e,
		rules: e.rules || e.cssRules,
		addRule: function(a, b, c) {
			if (e.addRule) return e.addRule(a, b, c);
			if (e.insertRule) return isNaN(c) && (c = f.length),
			e.insertRule(a + "{" + b + "}", c)
		},
		removeRule: function(a) {
			e.removeRule ? e.removeRule(a) : e.deleteRule && (isNaN(a) && (a = 0), e.deleteRule(a))
		}
	}
},
baidu.page.getHeight = function() {
	var a = document,
	b = a.body,
	c = a.documentElement,
	d = a.compatMode == "BackCompat" ? b: a.documentElement;
	return Math.max(c.scrollHeight, b.scrollHeight, d.clientHeight)
},
baidu.page.getWidth = function() {
	var a = document,
	b = a.body,
	c = a.documentElement,
	d = a.compatMode == "BackCompat" ? b: a.documentElement;
	return Math.max(c.scrollWidth, b.scrollWidth, d.clientWidth)
},
baidu.page.lazyLoadImage = function(a) {
	a = a || {},
	a.preloadHeight = a.preloadHeight || 0,
	baidu.dom.ready(function() {
		function i() {
			return baidu.page.getScrollTop() + baidu.page.getViewHeight() + a.preloadHeight
		}
		var b = document.getElementsByTagName("IMG"),
		c = b,
		d = b.length,
		e = 0,
		f = i(),
		g = "data-tangram-ori-src",
		h;
		if (a.className) {
			c = [];
			for (; e < d; ++e) baidu.dom.hasClass(b[e], a.className) && c.push(b[e])
		}
		for (e = 0, d = c.length; e < d; ++e) h = c[e],
		baidu.dom.getPosition(h).top > f && (h.setAttribute(g, h.src), a.placeHolder ? h.src = a.placeHolder: h.removeAttribute("src"));
		var j = function() {
			var b = i(),
			d,
			e = ! 0,
			f = 0,
			l = c.length;
			for (; f < l; ++f) h = c[f],
			d = h.getAttribute(g),
			d && (e = ! 1),
			baidu.dom.getPosition(h).top < b && d && (h.src = d, h.removeAttribute(g), baidu.lang.isFunction(a.onlazyload) && a.onlazyload(h));
			e && baidu.un(window, "scroll", j)
		};
		baidu.on(window, "scroll", j)
	})
},
baidu.page.load = function(a, b, c) {
	function h() {
		for (var c = 0, d = a.length; c < d; ++c) if (!e[a[c].url]) {
			setTimeout(arguments.callee, 10);
			return
		}
		b.onload()
	}
	function i(a, b) {
		var c, e, f;
		switch (a.type.toLowerCase()) {
		case "css":
			c = document.createElement("link"),
			c.setAttribute("rel", "stylesheet"),
			c.setAttribute("type", "text/css");
			break;
		case "js":
			c = document.createElement("script"),
			c.setAttribute("type", "text/javascript"),
			c.setAttribute("charset", a.charset || d.charset);
			break;
		case "html":
			c = document.createElement("iframe"),
			c.frameBorder = "none";
			break;
		default:
			return
		}
		f = function() { ! e && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (e = ! 0, baidu.un(c, "load", f), baidu.un(c, "readystatechange", f), b.call(window, c))
		},
		baidu.on(c, "load", f),
		baidu.on(c, "readystatechange", f),
		a.type == "css" && function() {
			if (e) return;
			try {
				c.sheet.cssRule
			} catch(a) {
				setTimeout(arguments.callee, 20);
				return
			}
			e = ! 0,
			b.call(window, c)
		} (),
		c.href = c.src = a.url,
		document.getElementsByTagName("head")[0].appendChild(c)
	}
	function j(l) {
		var m = l.url,
		n = !! g,
		o, p = function(i) {
			e[l.url] = i,
			delete f[l.url];
			if (baidu.lang.isFunction(l.onload) && ! 1 === l.onload.call(window, i)) return; ! g && d(a.slice(1), b, ! 0),
			! c && baidu.lang.isFunction(b.onload) && h()
		};
		return l.type = l.type || m.replace(/^[^\?#]+\.(css|js|html)(\?|#| |$)[^\?#]*/i, "$1"),
		l.requestType = l.requestType || (l.type == "html" ? "ajax": "dom"),
		(o = e[l.url]) ? (p(o), n) : ! b.refresh && f[l.url] ? (setTimeout(function() {
			j(l)
		},
		10), n) : (f[l.url] = ! 0, l.requestType.toLowerCase() == "dom" ? i(l, p) : baidu.ajax.get(l.url, function(a, b) {
			p(b)
		}), n)
	}
	b = b || {};
	var d = baidu.page.load,
	e = d._cache = d._cache || {},
	f = d._loadingCache = d._loadingCache || {},
	g = b.parallel;
	baidu.lang.isString(a) && (a = [{
		url: a
	}]);
	if (!a || ! a.length) return;
	baidu.each(a, j)
},
baidu.page.load.charset = "UTF8",
baidu.page.loadCssFile = function(a) {
	var b = document.createElement("link");
	b.setAttribute("rel", "stylesheet"),
	b.setAttribute("type", "text/css"),
	b.setAttribute("href", a),
	document.getElementsByTagName("head")[0].appendChild(b)
},
baidu.page.loadJsFile = function(a) {
	var b = document.createElement("script");
	b.setAttribute("type", "text/javascript"),
	b.setAttribute("src", a),
	b.setAttribute("defer", "defer"),
	document.getElementsByTagName("head")[0].appendChild(b)
},
baidu.platform = baidu.platform || {},
baidu.platform.isAndroid = /android/i.test(navigator.userAgent),
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent),
baidu.platform.isIphone = /iphone/i.test(navigator.userAgent),
baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent),
baidu.platform.isWindows = /windows/i.test(navigator.userAgent),
baidu.platform.isX11 = /x11/i.test(navigator.userAgent),
baidu.sio = baidu.sio || {},
baidu.sio._createScriptTag = function(a, b, c) {
	a.setAttribute("type", "text/javascript"),
	c && a.setAttribute("charset", c),
	a.setAttribute("src", b),
	document.getElementsByTagName("head")[0].appendChild(a)
},
baidu.sio._removeScriptTag = function(a) {
	if (a.clearAttributes) a.clearAttributes();
	else for (var b in a) a.hasOwnProperty(b) && delete a[b];
	a && a.parentNode && a.parentNode.removeChild(a),
	a = null
},
baidu.sio.callByBrowser = function(a, b, c) {
	var d = document.createElement("SCRIPT"),
	e = 0,
	f = c || {},
	g = f.charset,
	h = b || function() {},
	i = f.timeOut || 0,
	j;
	d.onload = d.onreadystatechange = function() {
		if (e) return;
		var a = d.readyState;
		if ("undefined" == typeof a || a == "loaded" || a == "complete") {
			e = 1;
			try {
				h(),
				clearTimeout(j)
			} finally {
				d.onload = d.onreadystatechange = null,
				baidu.sio._removeScriptTag(d)
			}
		}
	},
	i && (j = setTimeout(function() {
		d.onload = d.onreadystatechange = null,
		baidu.sio._removeScriptTag(d),
		f.onfailure && f.onfailure()
	},
	i)),
	baidu.sio._createScriptTag(d, a, g)
},
baidu.sio.callByServer = function(a, b, c) {
	function o(a) {
		return function() {
			try {
				a ? h.onfailure && h.onfailure() : (b.apply(window, arguments), clearTimeout(l)),
				window[f] = null,
				delete window[f]
			} catch(c) {} finally {
				baidu.sio._removeScriptTag(d)
			}
		}
	}
	var d = document.createElement("SCRIPT"),
	e = "bd__cbs__",
	f,
	g,
	h = c || {},
	i = h.charset,
	j = h.queryField || "callback",
	k = h.timeOut || 0,
	l,
	m = new RegExp("(\\?|&)" + j + "=([^&]*)"),
	n;
	if (baidu.lang.isFunction(b)) f = e + Math.floor(Math.random() * 2147483648).toString(36),
	window[f] = o(0);
	else if (baidu.lang.isString(b)) f = b;
	else if (n = m.exec(a)) f = n[2];
	k && (l = setTimeout(o(1), k)),
	a = a.replace(m, "$1" + j + "=" + f),
	a.search(m) < 0 && (a += (a.indexOf("?") < 0 ? "?": "&") + j + "=" + f),
	baidu.sio._createScriptTag(d, a, i)
},
baidu.sio.log = function(a) {
	var b = new Image,
	c = "tangram_sio_log_" + Math.floor(Math.random() * 2147483648).toString(36);
	window[c] = b,
	b.onload = b.onerror = b.onabort = function() {
		b.onload = b.onerror = b.onabort = null,
		window[c] = null,
		b = null
	},
	b.src = a
},
baidu.string.decodeHTML = function(a) {
	var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
	return b.replace(/&#([\d]+);/g, function(a, b) {
		return String.fromCharCode(parseInt(b, 10))
	})
},
baidu.decodeHTML = baidu.string.decodeHTML,
baidu.string.encodeHTML = function(a) {
	return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
},
baidu.encodeHTML = baidu.string.encodeHTML,
baidu.string.filterFormat = function(a, b) {
	var c = Array.prototype.slice.call(arguments, 1),
	d = Object.prototype.toString;
	return c.length ? (c = c.length == 1 ? b !== null && /\[object Array\]|\[object Object\]/.test(d.call(b)) ? b: c: c, a.replace(/#\{(.+?)\}/g, function(a, b) {
		var e, f, g, h, i;
		if (!c) return "";
		e = b.split("|"),
		f = c[e[0]],
		"[object Function]" == d.call(f) && (f = f(e[0]));
		for (g = 1, h = e.length; g < h; ++g) i = baidu.string.filterFormat[e[g]],
		"[object Function]" == d.call(i) && (f = i(f));
		return "undefined" == typeof f || f === null ? "": f
	})) : a
},
baidu.string.filterFormat.escapeJs = function(a) {
	if (!a || "string" != typeof a) return a;
	var b, c, d, e = [];
	for (b = 0, c = a.length; b < c; ++b) d = a.charCodeAt(b),
	d > 255 ? e.push(a.charAt(b)) : e.push("\\x" + d.toString(16));
	return e.join("")
},
baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs,
baidu.string.filterFormat.escapeString = function(a) {
	return ! a || "string" != typeof a ? a: a.replace(/["'<>\\\/`]/g, function(a) {
		return "&#" + a.charCodeAt(0) + ";"
	})
},
baidu.string.filterFormat.e = baidu.string.filterFormat.escapeString,
baidu.string.filterFormat.toInt = function(a) {
	return parseInt(a, 10) || 0
},
baidu.string.filterFormat.i = baidu.string.filterFormat.toInt,
baidu.string.format = function(a, b) {
	a = String(a);
	var c = Array.prototype.slice.call(arguments, 1),
	d = Object.prototype.toString;
	return c.length ? (c = c.length == 1 ? b !== null && /\[object Array\]|\[object Object\]/.test(d.call(b)) ? b: c: c, a.replace(/#\{(.+?)\}/g, function(a, b) {
		var e = c[b];
		return "[object Function]" == d.call(e) && (e = e(b)),
		"undefined" == typeof e ? "": e
	})) : a
},
baidu.format = baidu.string.format,
function() {
	var a = /^\#[\da-f]{6}$/i,
	b = /^rgb\((\d+), (\d+), (\d+)\)$/,
	c = {
		black: "#000000",
		silver: "#c0c0c0",
		gray: "#808080",
		white: "#ffffff",
		maroon: "#800000",
		red: "#ff0000",
		purple: "#800080",
		fuchsia: "#ff00ff",
		green: "#008000",
		lime: "#00ff00",
		olive: "#808000",
		yellow: "#ffff0",
		navy: "#000080",
		blue: "#0000ff",
		teal: "#008080",
		aqua: "#00ffff"
	};
	baidu.string.formatColor = function(d) {
		if (a.test(d)) return d;
		if (b.test(d)) {
			for (var e, f = 1, d = "#"; f < 4; f++) e = parseInt(RegExp["$" + f]).toString(16),
			d += ("00" + e).substr(e.length);
			return d
		}
		if (/^\#[\da-f]{3}$/.test(d)) {
			var g = d.charAt(1),
			h = d.charAt(2),
			i = d.charAt(3);
			return "#" + g + g + h + h + i + i
		}
		return c[d] ? c[d] : ""
	}
} (),
baidu.string.getByteLength = function(a) {
	return String(a).replace(/[^\x00-\xff]/g, "ci").length
},
baidu.string.stripTags = function(a) {
	return String(a || "").replace(/<[^>]+>/g, "")
},
baidu.string.subByte = function(a, b, c) {
	return a = String(a),
	c = c || "",
	b < 0 || baidu.string.getByteLength(a) <= b ? a + c: (a = a.substr(0, b).replace(/([^\x00-\xff])/g, "$1 ").substr(0, b).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1"), a + c)
},
baidu.string.toHalfWidth = function(a) {
	return String(a).replace(/[\uFF01-\uFF5E]/g, function(a) {
		return String.fromCharCode(a.charCodeAt(0) - 65248)
	}).replace(/\u3000/g, " ")
},
baidu.string.wbr = function(a) {
	return String(a).replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, "$&<wbr>").replace(/><wbr>/g, ">")
},
baidu.swf = baidu.swf || {},
baidu.swf.version = function() {
	var a = navigator;
	if (a.plugins && a.mimeTypes.length) {
		var b = a.plugins["Shockwave Flash"];
		if (b && b.description) return b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
	} else if (window.ActiveXObject && ! window.opera) for (var c = 12; c >= 2; c--) try {
		var d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + c);
		if (d) {
			var e = d.GetVariable("$version");
			return e.replace(/WIN/g, "").replace(/,/g, ".")
		}
	} catch(f) {}
} (),
baidu.swf.createHTML = function(a) {
	a = a || {};
	var b = baidu.swf.version,
	c = a.ver || "6.0.0",
	d, e, f, g, h, i, j = {},
	k = baidu.string.encodeHTML;
	for (g in a) j[g] = a[g];
	a = j;
	if (!b) return "";
	b = b.split("."),
	c = c.split(".");
	for (f = 0; f < 3; f++) {
		d = parseInt(b[f], 10),
		e = parseInt(c[f], 10);
		if (e < d) break;
		if (e > d) return ""
	}
	var l = a.vars,
	m = ["classid", "codebase", "id", "width", "height", "align"];
	a.align = a.align || "middle",
	a.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
	a.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0",
	a.movie = a.url || "",
	delete a.vars,
	delete a.url;
	if ("string" == typeof l) a.flashvars = l;
	else {
		var n = [];
		for (g in l) i = l[g],
		n.push(g + "=" + encodeURIComponent(i));
		a.flashvars = n.join("&")
	}
	var o = ["<object "];
	for (f = 0, h = m.length; f < h; f++) i = m[f],
	o.push(" ", i, '="', k(a[i]), '"');
	o.push(">");
	var p = {
		wmode: 1,
		scale: 1,
		quality: 1,
		play: 1,
		loop: 1,
		menu: 1,
		salign: 1,
		bgcolor: 1,
		base: 1,
		allowscriptaccess: 1,
		allownetworking: 1,
		allowfullscreen: 1,
		seamlesstabbing: 1,
		devicefont: 1,
		swliveconnect: 1,
		flashvars: 1,
		movie: 1
	};
	for (g in a) i = a[g],
	g = g.toLowerCase(),
	p[g] && (i || i === ! 1 || i === 0) && o.push('<param name="' + g + '" value="' + k(i) + '" />');
	a.src = a.movie,
	a.name = a.id,
	delete a.id,
	delete a.movie,
	delete a.classid,
	delete a.codebase,
	a.type = "application/x-shockwave-flash",
	a.pluginspage = "http://www.macromedia.com/go/getflashplayer",
	o.push("<embed");
	var q;
	for (g in a) {
		i = a[g];
		if (i || i === ! 1 || i === 0) {
			if ((new RegExp("^salign$", "i")).test(g)) {
				q = i;
				continue
			}
			o.push(" ", g, '="', k(i), '"')
		}
	}
	return q && o.push(' salign="', k(q), '"'),
	o.push("></embed></object>"),
	o.join("")
},
baidu.swf.create = function(a, b) {
	a = a || {};
	var c = baidu.swf.createHTML(a) || a.errorMessage || "";
	b && "string" == typeof b && (b = document.getElementById(b)),
	baidu.dom.insertHTML(b || document.body, "beforeEnd", c)
},
baidu.swf.getMovie = function(a) {
	var b = document[a],
	c;
	return baidu.browser.ie == 9 ? b && b.length ? (c = baidu.array.remove(baidu.lang.toArray(b), function(a) {
		return a.tagName.toLowerCase() != "embed"
	})).length == 1 ? c[0] : c: b: b || window[a]
},
baidu.swf.Proxy = function(a, b, c) {
	var d = this,
	e = this._flash = baidu.swf.getMovie(a),
	f;
	if (!b) return this;
	f = setInterval(function() {
		try {
			e[b] && (d._initialized = ! 0, clearInterval(f), c && c())
		} catch(a) {}
	},
	100)
},
baidu.swf.Proxy.prototype.getFlash = function() {
	return this._flash
},
baidu.swf.Proxy.prototype.isReady = function() {
	return !! this._initialized
},
baidu.swf.Proxy.prototype.call = function(a, b) {
	try {
		var c = this.getFlash(),
		d = Array.prototype.slice.call(arguments);
		d.shift(),
		c[a] && c[a].apply(c, d)
	} catch(e) {}
},
baidu.url.getQueryValue = function(a, b) {
	var c = new RegExp("(^|&|\\?|#)" + baidu.string.escapeReg(b) + "=([^&#]*)(&|$|#)", ""),
	d = a.match(c);
	return d ? d[2] : null
},
baidu.url.jsonToQuery = function(a, b) {
	var c = [],
	d,
	e = b || function(a) {
		return baidu.url.escapeSymbol(a)
	};
	return baidu.object.each(a, function(a, b) {
		if (baidu.lang.isArray(a)) {
			d = a.length;
			while (d--) c.push(b + "=" + e(a[d], b))
		} else c.push(b + "=" + e(a, b))
	}),
	c.join("&")
},
baidu.url.queryToJson = function(a) {
	var b = a.substr(a.lastIndexOf("?") + 1),
	c = b.split("&"),
	d = c.length,
	e = {},
	f = 0,
	g,
	h,
	i,
	j;
	for (; f < d; f++) {
		if (!c[f]) continue;
		j = c[f].split("="),
		g = j[0],
		h = j[1],
		i = e[g],
		"undefined" == typeof i ? e[g] = h: baidu.lang.isArray(i) ? i.push(h) : e[g] = [i, h]
	}
	return e
},
typeof window.qing == "undefined" && (window.qing = {}),
baidu.extend(qing, baidu),
qing.url = {},
baidu.extend(qing.url, baidu.url),
qing.url.jsonToQuery = function(a, b) {
	if (!b || typeof b != "function") b = function(a) {
		return (a + "").replace(/[#%&+=\/\\\ \f\r\n\t]/g, function(a) {
			return "%" + (256 + a.charCodeAt()).toString(16).substring(1).toUpperCase()
		})
	};
	return baidu.url.jsonToQuery(a, b)
},
qing.ajax = {},
baidu.extend(qing.ajax, baidu.ajax),
qing.ajax.requestFromList = [{
	reg: /^http:\/\/hi\.baidu\.com\/home.*$/,
	value: "home_request"
},
{
	reg: /^http:\/\/hi\.baidu\.com\/new.*$/,
	value: "new_request"
}],
qing.ajax.qingSource = "",
qing.ajax.request = function() {
	var a = qing.ajax.qingSource,
	b = [];
	if (!a) {
		var c = location.href,
		d = qing.ajax.requestFromList;
		for (var e = 0, f = d.length; e < f; e++) {
			var g = d[e].reg;
			if (g.test(c)) {
				qing.ajax.qingSource = d[e].value,
				a = d[e].value;
				break
			}
		}
	}
	return function(c, d) {
		var e;
		d.method && d.method != "get" && d.method != "GET" ? (e = "post", d.data && typeof d.data == "object" ? d.data.bdstoken = d.data.bdstoken || qBdsToken: d.data && typeof d.data == "string" && (d.data = qing.url.queryToJson(d.data), d.data.bdstoken = d.data.bdstoken || qBdsToken), d.data || (d.data = {
			bdstoken: qBdsToken
		}), d.data = qing.url.jsonToQuery(d.data), d.data && d.data != "" && (d.data += "&"), d.data += "qing_request_source=" + a, d.timeout = d.timeout || 1e4, d.ontimeout = d.ontimeout || function() {
			qui.showError("\u7f51\u7edc\u8d85\u65f6")
		}) : (e = "get", d.data && typeof d.data == "object" && (d.data = qing.url.jsonToQuery(d.data)), c += (c.indexOf("?") == - 1 ? "?": "&") + "qing_request_source=" + a);
		for (var f = 0, g = b.length; f < g; f++) {
			var h = b[f];
			if (c == h.url) {
				if (e == "get" && h.method == "get") return;
				if (e == "post" && h.method == "post" && (d.data && d.data == h.data || ! d.data)) return
			}
		}
		b.push({
			url: c,
			data: d.data,
			method: e
		});
		var i = d.onsuccess || function(a) {};
		return d.onsuccess = function(a, f) {
			try {
				for (var g = 0, h = b.length; g < h; g++) {
					var j = b[g];
					if (c == j.url) {
						if (e == "get" && j.method == "get") {
							b.splice(g, 1);
							break
						}
						if (e == "post" && j.method == "post" && (d.data && d.data == j.data || ! d.data)) {
							b.splice(g, 1);
							break
						}
					}
				}
				var k;
				k = qing.json.parse(f);
				var l = parseInt(k.errorNo);
				if (l == 0) return i(k.data);
				var m = ! 1;
				d.onerror && (d.onerror(k), m = ! 0);
				if (d["onerrorno" + l]) d["onerrorno" + l](),
				m = ! 0;
				else if (l == 102) qui.showForbidSelf(),
				m = ! 0;
				else if (l == 600) {
					var n = new qui.dialog.Dialog({
						title: "",
						content: '<div>\u62b1\u6b49\uff0c\u60a8\u7684\u6587\u7ae0\u5305\u542b\u4e0d\u5408\u9002\u5185\u5bb9\uff0c\u9700\u5ba1\u6838\u540e\u624d\u80fd\u516c\u5f00\u53d1\u8868\u3002</div><div>\u70b9\u51fb\u201c\u786e\u8ba4\u201d\u8fdb\u5165\u5ba1\u6838\u6d41\u7a0b\uff0c\u8be5\u535a\u6587\u6682\u65f6\u9501\u5b9a\u3002</div><div>\u70b9\u51fb\u201c\u53d6\u6d88\u201d\u8fd4\u56de\u4fee\u6539\u539f\u6587\u7ae0\u3002</div><div style="margin-top:20px;">\u540c\u6b65\u529f\u80fd\u5c06\u4e0d\u53ef\u7528</div>',
						height: 100,
						buttons: [{
							text: "\u786e\u8ba4",
							type: "green",
							handler: function() {
								n.close(),
								d.data += d.data != "" ? "&filter=1": "filter=1",
								baidu.ajax.request(c, d)
							}
						},
						{
							text: "\u53d6\u6d88",
							type: "gray",
							handler: function() {
								n.close()
							}
						}]
					});
					n.show({
						isAutoHide: ! 1
					})
				} ! m && (d.method == "post" || d.method == "POST") && qui.showError(k.errorMsg)
			} catch(o) {
				d.onexception && d.onexception("format-error", f)
			}
		},
		baidu.ajax.request(c, d)
	}
} (),
qing.ajax.get = function(a, b, c, d, e) {
	/[\?\&]asyn\=/.test(a) || (a = a + (a.indexOf("?") == - 1 ? "?": "&") + "asyn=1"),
	typeof b == "object" && (b = qing.url.jsonToQuery(b), a += "&" + b);
	var f = c,
	g = d,
	h;
	typeof b == "function" && (f = b, g = c, h = d),
	h = undefined == h ? ! 0: h,
	h && (a += "&_" + + (new Date) + "=1");
	var i = {
		onsuccess: f,
		onerror: g
	};
	return qing.ajax.request(a, i)
},
qing.ajax.post = function(a, b, c, d) {
	return qing.ajax.request(a, {
		onsuccess: c,
		onerror: d,
		method: "POST",
		data: b
	})
},
qing.sio = {},
qing.extend(qing.sio, baidu.sio),
qing.sio.callByServer = function(a, b, c) {
	a += (a.indexOf("?") < 0 ? "?": "&") + "qing_request_source=" + qing.ajax.qingSource,
	/[\?\&]asyn\=/.test(a) || (a += (a.indexOf("?") < 0 ? "?": "&") + "asyn=1"),
	typeof b == "string" && (a += (a.indexOf("?") < 0 ? "?_": "&_") + + (new Date) + "=1"),
	baidu.sio.callByServer(a, b, c)
},
qing.sio.callByBrowser = function(a, b, c) {
	a += (a.indexOf("?") < 0 ? "?": "&") + "qing_request_source=" + qing.ajax.qingSource,
	/[\?\&]asyn\=/.test(a) || (a += (a.indexOf("?") < 0 ? "?": "&") + "asyn=1"),
	typeof b == "string" && (a += (a.indexOf("?") < 0 ? "?_": "&_") + + (new Date) + "=1"),
	baidu.sio.callByBrowser(a, b, c)
},
qing.sio.log = function(a) {
	return a += (a.indexOf("?") < 0 ? "?_": "&_") + + (new Date) + "=1",
	baidu.sio.log(a)
},
qing.sio.jsLoader = function(a) {
	var b = function() {
		this.load = function() {
			var b = document.getElementsByTagName("script");
			for (i = 0; i < b.length; i++) if (b[i].src && b[i].src.indexOf(a.url) != - 1) {
				this.onsuccess();
				return
			}
			s = document.createElement("script"),
			s.type = "text/javascript",
			s.charset = a.charset || "utf-8",
			a.url.indexOf("?") ? a.url += "?t=" + (new Date).getTime() : a.url += "&" + (new Date).getTime();
			if (a.hasCallback) {
				var c = "_q_cbk_" + Math.floor(Math.random() * 1e4) + "_" + (new Date).getTime();
				window[c] = a.success,
				a.url += "&callback=" + c
			}
			s.src = a.url;
			var d = document.getElementsByTagName("head")[0];
			d.appendChild(s);
			var e = this;
			a.hasCallback || (s.onload = s.onreadystatechange = function(a) {
				if (this.readyState && this.readyState == "loading") return;
				e.onsuccess(a)
			}),
			s.onerror = function(a) {
				d.removeChild(s),
				e.onfailure(a)
			}
		},
		this.onsuccess = function(b) {
			a.success && a.success(b)
		},
		this.onfailure = function(b) {
			a.failure && a.failure(b)
		}
	},
	c = new b;
	c.load()
},
qing.registNS = function(fullNS, isIgnorSelf) {
	var reg = /^[_$a-z]+[_$a-z0-9]*/i,
	nsArray = fullNS.split("."),
	sEval = "",
	sNS = "",
	n = isIgnorSelf ? nsArray.length - 1: nsArray.length;
	for (var i = 0; i < n; i++) {
		if (!reg.test(nsArray[i])) throw new Error("Invalid namespace:" + nsArray[i] + "");
		i != 0 && (sNS += "."),
		sNS += nsArray[i],
		sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();else " + sNS + ";"
	}
	return sEval != "" ? eval(sEval) : {}
},
qing.getUniqueId = function() {
	var a = 0;
	return function(b, c) {
		c = c || "XQing",
		b = qing.g(b);
		var d = c + ++a;
		return b ? b.id ? b.id: b.id = d: d
	}
} (),
qing.registNS("qext.fn"),
qext.fn.getAncestorByClass = function(a, b) {
	var c = a;
	if (!c) return c;
	while (c) {
		if (c.className && T.dom.hasClass(c, b)) break;
		c = c.parentNode
	}
	return c
},
qext.fn.addEventMap = function(a, b, c, d) {
	T.array.each(b, function(b) {
		T.on(a, b, function(a) {
			var e = a.target || a.srcElement;
			if (!e) return ! 1;
			for (var f in c[b]) {
				var g = c[b][f];
				if (e.className && qing.dom.hasClass(e, f)) {
					if (b == "click" && a.button && a.button != 1) break;
					g.call(e, a);
					break
				}
				if (ancestor = qext.fn.getAncestorByClass(e, f)) {
					if (b == "click" && a.button && a.button != 1) break;
					g.call(ancestor, a);
					break
				}
			}
			typeof d == "function" && d.call(a)
		})
	})
},
qext.fn.resizeImgSize = function(a, b) {
	if (T.browser.ie != 6) return ! 1;
	var c = a.offsetWidth,
	d = a.offsetHeight;
	if (b.maxwidth && c > b.maxwidth || b.maxheight && d > b.maxheight) {
		var e = b.maxwidth || 1e7,
		f = b.maxheight || 1e7,
		g = c / e,
		h = d / f,
		i = Math.max(g, h);
		a.style.width = c / i + "px",
		a.style.height = d / i + "px"
	}
	if (b.minwidth && c < b.minwidth || b.minheight && d < b.minheight) {
		var j = b.minwidth || 1e7,
		k = b.minheight || 1e7,
		l = c / j,
		m = d / k,
		n = Math.max(l, m);
		a.style.width = c / n + "px",
		a.style.height = d / n + "px"
	}
	b.callback && typeof b.callback == "function" && b.callback(),
	a.style.position = "static"
},
qext.fn.imgCenterCrop = function(a, b, c) {
	var d = new Image;
	d.onload = function() {
		if (a.src.length < 1) {
			a.width = b,
			a.height = c;
			return
		}
		var d = this.width,
		e = this.height;
		if (d < b && e < c) {
			a.width = b,
			a.height = c;
			return
		}
		d > e ? (a.height = c, a.width = c * d / e) : (a.width = b, a.height = b * e / d),
		a.src && (a.style.display = ""),
		a.style.position = "relative",
		a.style.marginTop = - (a.height - c) / 2 + "px",
		a.style.marginLeft = - (a.width - b) / 2 + "px"
	},
	d.src = a.src
},
qext.fn.getDimensions = function(a) {
	element = T.g(a);
	var b = T.dom.getStyle(element, "display");
	if (b && b !== "none") return {
		width: element.offsetWidth,
		height: element.offsetHeight
	};
	var c = element.style,
	d = {
		visibility: c.visibility,
		position: c.position,
		display: c.display
	},
	e = {
		visibility: "hidden",
		display: "block"
	};
	d.position !== "fixed" && (e.position = "absolute"),
	T.dom.setStyle(element, e);
	var f = {
		width: element.offsetWidth,
		height: element.offsetHeight
	};
	return T.dom.setStyle(element, d),
	f
},
qext.fn.scrollFix = function(a, b, c) {
	b = parseInt(b, 10) || 40;
	var d = qing.dom.getPosition(a).top - b,
	e = T.browser.isWebkit ? document.body: document.documentElement,
	f = e.scrollTop,
	g = d < 0 ? 0: d;
	return qani.animate(e, {
		scroll: g
	},
	c || 500)
},
qext.fn.onTingHeightChange = function() {},
qext.fn.changeTingHeight = function(a, b) {
	var c = "ifrMusicPlayer" + a,
	d = qing.g(c); ! d && (d = qing.g("ifrMusicPlayer")),
	d && (b == 1 ? (d.style.height = "90px", d.height = 90) : (d.style.height = "37px", d.height = 37)),
	qext.fn.onTingHeightChange && qext.fn.onTingHeightChange(a)
},
qext.fn.setStoken = function() {
	var a = 0,
	b = 11e4,
	c = 1e4;
	return function(d) {
		var e = qing.cookie.get("PSPTOKEN"),
		d = d || {};
		if (e) return;
		if (a > 4) {
			qing.cookie.set("PSPTOKEN", "::", {
				expires: 3e4,
				domain: "." + location.hostname,
				path: "/"
			}),
			d.onfailure && d.onfailure(),
			qext.stat.ns("m_20121011_error5"),
			qext.stat.ns("m_20121012_loga_indead_" + b + "_error");
			return
		}
		a++;
		var f = qDomain.passport + "/v2/?loga&tpl=qing";
		qext.stat.ns("m_20121011_loga_request"),
		qing.sio.callByServer(f, function(a) {
			b = parseInt(a.errno),
			b == 11e4 ? (qing.cookie.set("PSPTOKEN", a.bdstoken, {
				expires: 2592e6,
				domain: "." + location.hostname,
				path: "/"
			}), d.onsuccess && d.onsuccess(), qext.stat.ns("m_20121011_success")) : (qext.fn.setStoken(), qext.stat.ns("m_20121011_error"), qext.stat.ns("m_20121012_loga_" + b + "error"))
		},
		{
			timeOut: c,
			onfailure: function() {
				c += 3e3,
				qext.fn.setStoken(),
				qext.stat.ns("m_20121011_timeout"),
				b = 900000001
			}
		})
	}
} (),
qext.stylesheet = function(a, b, c) {
	var b = b || document;
	return b || qing.browser.ie == 6 ? new qext.SelfStylesheet(a, b, c) : qext.stylesheet.singleton ? (qext.stylesheet.singleton.addRule(a), qext.stylesheet.singleton) : (qext.stylesheet.singleton = new qext.SelfStylesheet(a, b, c), qext.stylesheet.singleton)
},
qext.SelfStylesheet = function(a, b, c) {
	this.rules = {};
	var d = b.getElementsByTagName("head")[0];
	b ? (this.eStyle = b.createElement("style"), this.eStyle.type = "text/css", this.eStyle.id = c) : this.eStyle = qing.dom.create("style", {
		type: "text/css",
		id: c
	}),
	this.addRule(a),
	d.appendChild(this.eStyle)
},
qext.SelfStylesheet.prototype = {
	addRule: function(a, b) {
		var c, d = this.eStyle;
		b ? c = {
			key: b
		}: c = a;
		var e = function() {
			return d.styleSheet ? function(a, b) {
				qing.browser.ie < 8 ? a.styleSheet.cssText = b: a.styleSheet.cssText += b
			}: function(a, b) {
				var c = document.createTextNode(b);
				a.appendChild(c)
			}
		} (),
		f = "";
		for (var g in c) {
			f += g + "{";
			var h = c[g];
			for (var i in h) f += i + ":" + h[i] + ";";
			f += "}"
		}
		e(d, f)
	}
},
qing.registNS("qext"),
qext.FontDetect = function() {
	var a = null,
	b = null,
	c = ! 1,
	d = function(a) {
		var b = document.createElement("p");
		qing.dom.setStyles(b, {
			"font-family": a + ", Times New Roman",
			"font-size": "300pt",
			display: "inline",
			position: "absolute",
			top: "-10000px",
			left: "-10000px"
		}),
		qing.dom.addClass(b, "sp-font-detect"),
		b.innerHTML = "mmmmmmmmml",
		document.body.appendChild(b);
		var c = b.offsetWidth;
		return document.body.removeChild(b),
		c
	},
	e = function() {
		return a || (a = d("Times New Roman")),
		a
	},
	f = function() {
		qing.browser.ie && (b = qing.dom.create("object", {
			id: "sp-font-detect-obj",
			classid: "clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b"
		}), qing.dom.setStyles(b, {
			position: "absolute",
			top: "-10000px",
			left: "-10000px",
			width: "1px",
			height: "1px"
		}), document.body.appendChild(b), c = ! 0)
	},
	g = function(a, b) {
		for (var c = 0, d = b.length; c < d; c++) if (a == b[c]) return ! 0;
		return ! 1
	},
	h = function() {
		if (typeof screen.fontSmoothingEnabled != "undefined") return screen.fontSmoothingEnabled;
		try {
			var a = document.createElement("canvas");
			a.width = "35",
			a.height = "35",
			a.style.display = "none",
			document.body.appendChild(a);
			var b = a.getContext("2d");
			b.textBaseline = "top",
			b.font = "32px Arial",
			b.fillStyle = "black",
			b.strokeStyle = "black",
			b.fillText("E", 0, 0);
			for (var c = 8; c <= 32; c++) for (var d = 1; d <= 32; d++) {
				var e = b.getImageData(d, c, 1, 1).data[3];
				if (e != 255 && e != 0) return document.body.removeChild(a),
				! 0
			}
			return document.body.removeChild(a),
			! 1
		} catch(f) {
			return null
		}
	},
	i = function(a, h) {
		typeof h != "function" && (h = new Function);
		var i = ! 1;
		if (g("Times New Roman", a)) return h(!0);
		if (qing.browser.ie) {
			c || f();
			var j = b.fonts;
			if (j.count) for (var k = 1, l = j.count; k <= l; k++) if (g(j(k), a)) return h(!0);
			return h(!1)
		}
		var m = 0,
		n = e();
		for (var o = 0, p = a.length; o < p; o++) {
			m = d(a[o]);
			if (m !== n) return h(!0)
		}
		return h(!1)
	},
	j = function(a, b) {
		var c = navigator.userAgent.indexOf("Windows NT 5.1") > - 1 ? h() : ! 0;
		c ? i(a, b) : b(!1)
	};
	return {
		isClearTypeOn: h,
		detectFont: i,
		detect: j
	}
} (),
qing.registNS("qext.lazy"),
qext.lazy.ImageLoad = function() {
	var a = 0,
	b = 0,
	c = [],
	d = ! 1,
	e = null,
	f = function(a, b) {
		var c = b ? 0: 60,
		d = b ? 0: 60,
		e = {};
		try {
			e = qing.dom.getPosition(a)
		} catch(f) {
			e = {
				left: 0,
				top: 0
			}
		}
		var g = qing.page.getScrollTop(),
		h = qing.page.getScrollLeft(),
		i = qing.page.getViewWidth(),
		j = qing.page.getViewHeight(),
		k = e.left - c,
		l = e.top - d,
		m = e.left + a.offsetWidth + c,
		n = e.top + a.offsetHeight + d,
		o = h,
		p = g,
		q = h + i,
		r = g + j;
		return k <= q && l <= r && m >= o && n >= p
	},
	g = function(a) {
		return qing.dom.getAttr(a, "data-loaded") == "1" ? ! 0: ! 1
	},
	h = function() {
		d || (d = ! 0, a = window.setInterval(function() {
			if (c.length === 0) {
				window.clearInterval(a),
				d = ! 1;
				return
			}
			for (var b = 0; b < c.length; b++) {
				var h = c[b];
				if (!g(h) && f(h)) {
					qing.dom.getAttr(h, "data-loadfunc") != "1" && (qing.dom.setAttr(h, "data-loadfunc", 1), qing.on(h, "load", function(a) {
						var b = this;
						qing.dom.setAttr(b, "data-loaded", 1);
						for (var d = 0; d < c.length; d++) {
							var f = c[d];
							b === f && c.splice(d, 1)
						}
						e && typeof e == "function" && e(b)
					}));
					var i = qing.dom.getAttr(h, "data-src") + "";
					i.indexOf("http") > - 1 && (qing.dom.setAttr(h, "src", i), h.removeAttribute("data-src"))
				}
			}
		},
		300))
	},
	i = function(a) {
		var b = ! 1;
		a || (a = document.body, b = ! 0);
		var d = [];
		qing.array.each(a.getElementsByTagName("img"), function(a, b) {
			qing.dom.getAttr(a, "data-src") && ! g(a) && d.push(a)
		}),
		b ? c = d: c = c.concat(d),
		h(c)
	},
	j = function() {
		qing.array.each(["resize", "scroll", "load"], function(a) {
			qing.on(window, a, function(a) {
				b && window.clearTimeout(b),
				b = window.setTimeout(function() {
					b = 0,
					i()
				},
				20),
				qing.event.stop(a)
			})
		})
	},
	k = function(a) {
		e = a,
		i(),
		j()
	};
	return {
		init: k,
		isVisible: f,
		scanAndDoRender: i
	}
} ();

