requirejs.config({
	"paths": {
		"require/urchinAplus.min": __static("/yk/newtudou/js/require/urchinAplus.min.6e1303f8d3")
	}
});

function Swipe(t, e) {
	function i() {
		f = v.children,
			m = new Array(f.length),
			_ = t.getBoundingClientRect().width || t.offsetWidth,
			v.style.width = f.length * _ + "px";
		for (var e = f.length; e--;) {
			var i = f[e];
			i.style.width = _ + "px",
				i.setAttribute("data-index", e),
			p.transitions && (i.style.left = e * -_ + "px",
				s(e, g > e ? -_ : e > g ? _ : 0, 0))
		}
		p.transitions || (v.style.left = g * -_ + "px")
	}
	
	function n() {
		g ? r(g - 1) : e.continuous && r(f.length - 1)
	}
	
	function a() {
		g < f.length - 1 ? r(g + 1) : e.continuous && r(0)
	}
	
	function r(t, i) {
		if (g != t) {
			if (p.transitions) {
				for (var n = Math.abs(g - t) - 1, a = Math.abs(g - t) / (g - t); n--;)
					s((t > g ? t : g) - n - 1, _ * a, 0);
				s(g, _ * a, i || y),
					s(t, 0, i || y)
			} else
				l(g * -_, t * -_, i || y);
			g = t,
				c(e.callback && e.callback(g, f[g]))
		}
	}
	
	function s(t, e, i) {
		o(t, e, i),
			m[t] = e
	}
	
	function o(t, e, i) {
		var n = f[t]
			, a = n && n.style;
		a && (a.webkitTransitionDuration = a.MozTransitionDuration = a.msTransitionDuration = a.OTransitionDuration = a.transitionDuration = i + "ms",
			a.webkitTransform = "translate(" + e + "px,0)" + "translateZ(0)",
			a.msTransform = a.MozTransform = a.OTransform = "translateX(" + e + "px)")
	}
	
	function l(t, i, n) {
		if (!n)
			return v.style.left = i + "px",
				void 0;
		var a = +new Date
			, r = setInterval(function() {
			var s = +new Date - a;
			return s > n ? (v.style.left = i + "px",
			A && d(),
			e.transitionEnd && e.transitionEnd.call(event, g, f[g]),
				clearInterval(r),
				void 0) : (v.style.left = (i - t) * (Math.floor(100 * (s / n)) / 100) + t + "px",
				void 0)
		}, 4)
	}
	
	function d() {
		E = setTimeout(a, A)
	}
	
	function u() {
		A = 0,
			clearTimeout(E)
	}
	
	var h = function() {
	}
		, c = function(t) {
		setTimeout(t || h, 0)
	}
		, p = {
		addEventListener: !!window.addEventListener,
		touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
		transitions: function(t) {
			var e = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
			for (var i in e)
				if (void 0 !== t.style[e[i]])
					return !0;
			return !1
		}(document.createElement("swipe"))
	};
	if (t) {
		var f, m, _, v = t.children[0];
		e = e || {};
		var g = parseInt(e.startSlide, 10) || 0
			, y = e.speed || 300;
		e.continuous = e.continuous ? e.continuous : !0;
		var E, T, A = e.auto || 0, b = {}, P = {}, k = {
			handleEvent: function(t) {
				switch (t.type) {
					case "touchstart":
						this.start(t);
						break;
					case "touchmove":
						this.move(t);
						break;
					case "touchend":
						c(this.end(t));
						break;
					case "webkitTransitionEnd":
					case "msTransitionEnd":
					case "oTransitionEnd":
					case "otransitionend":
					case "transitionend":
						c(this.transitionEnd(t));
						break;
					case "resize":
						c(i.call())
				}
				e.stopPropagation && t.stopPropagation()
			},
			start: function(t) {
				var e = t.touches[0];
				b = {
					x: e.pageX,
					y: e.pageY,
					time: +new Date
				},
					T = void 0,
					P = {},
					v.addEventListener("touchmove", this, !1),
					v.addEventListener("touchend", this, !1)
			},
			move: function(t) {
				if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
					e.disableScroll && t.preventDefault();
					var i = t.touches[0];
					P = {
						x: i.pageX - b.x,
						y: i.pageY - b.y
					},
					"undefined" == typeof T && (T = !!(T || Math.abs(P.x) < Math.abs(P.y))),
					T || (t.preventDefault(),
						u(),
						P.x = P.x / (!g && P.x > 0 || g == f.length - 1 && P.x < 0 ? Math.abs(P.x) / _ + 1 : 1),
						o(g - 1, P.x + m[g - 1], 0),
						o(g, P.x + m[g], 0),
						o(g + 1, P.x + m[g + 1], 0))
				}
			},
			end: function() {
				var t = +new Date - b.time
					, i = Number(t) < 250 && Math.abs(P.x) > 20 || Math.abs(P.x) > _ / 2
					, n = !g && P.x > 0 || g == f.length - 1 && P.x < 0
					, a = P.x < 0;
				T || (i && !n ? (a ? (s(g - 1, -_, 0),
					s(g, m[g] - _, y),
					s(g + 1, m[g + 1] - _, y),
					g += 1) : (s(g + 1, _, 0),
					s(g, m[g] + _, y),
					s(g - 1, m[g - 1] + _, y),
					g += -1),
				e.callback && e.callback(g, f[g])) : (s(g - 1, -_, y),
					s(g, 0, y),
					s(g + 1, _, y))),
					v.removeEventListener("touchmove", k, !1),
					v.removeEventListener("touchend", k, !1)
			},
			transitionEnd: function(t) {
				parseInt(t.target.getAttribute("data-index"), 10) == g && (A && d(),
				e.transitionEnd && e.transitionEnd.call(t, g, f[g]))
			}
		};
		return i(),
		A && d(),
			p.addEventListener ? (p.touch && v.addEventListener("touchstart", k, !1),
			p.transitions && (v.addEventListener("webkitTransitionEnd", k, !1),
				v.addEventListener("msTransitionEnd", k, !1),
				v.addEventListener("oTransitionEnd", k, !1),
				v.addEventListener("otransitionend", k, !1),
				v.addEventListener("transitionend", k, !1)),
				window.addEventListener("resize", k, !1)) : window.onresize = function() {
				i()
			}
			,
			{
				setup: function() {
					i()
				},
				slide: function(t, e) {
					r(t, e)
				},
				prev: function() {
					u(),
						n()
				},
				next: function() {
					u(),
						a()
				},
				getPos: function() {
					return g
				},
				kill: function() {
					u(),
						v.style.width = "auto",
						v.style.left = 0;
					for (var t = f.length; t--;) {
						var e = f[t];
						e.style.width = "100%",
							e.style.left = 0,
						p.transitions && o(t, 0, 0)
					}
					p.addEventListener ? (v.removeEventListener("touchstart", k, !1),
						v.removeEventListener("webkitTransitionEnd", k, !1),
						v.removeEventListener("msTransitionEnd", k, !1),
						v.removeEventListener("oTransitionEnd", k, !1),
						v.removeEventListener("otransitionend", k, !1),
						v.removeEventListener("transitionend", k, !1),
						window.removeEventListener("resize", k, !1)) : window.onresize = null
				}
			}
	}
}

define("lib/util/cookie", [], function() {
	var t = function() {
		return t.get.apply(t, arguments)
	}
		, e = t.utils = {
		isArray: Array.isArray || function(t) {
			return "[object Array]" === Object.prototype.toString.call(t)
		}
		,
		isPlainObject: function(t) {
			return !!t && "[object Object]" === Object.prototype.toString.call(t)
		},
		toArray: function(t) {
			return Array.prototype.slice.call(t)
		},
		getKeys: Object.keys || function(t) {
			var e = []
				, i = "";
			for (i in t)
				t.hasOwnProperty(i) && e.push(i);
			return e
		}
		,
		escape: function(t) {
			return String(t).replace(/[,;"\\=\s%]/g, function(t) {
				return encodeURIComponent(t)
			})
		},
		retrieve: function(t, e) {
			return null == t ? e : t
		}
	};
	return t.defaults = {},
		t.expiresMultiplier = 86400,
		t.set = function(t, i, n) {
			if (e.isPlainObject(t))
				for (var a in t)
					t.hasOwnProperty(a) && this.set(a, t[a], i);
			else {
				n = e.isPlainObject(n) ? n : {
					expires: n
				};
				var r = void 0 !== n.expires ? n.expires : this.defaults.expires || ""
					, s = typeof r;
				"string" === s && "" !== r ? r = new Date(r) : "number" === s && (r = new Date(+new Date + 1e3 * this.expiresMultiplier * r)),
				"" !== r && "toGMTString" in r && (r = ";expires=" + r.toGMTString());
				var o = n.path || this.defaults.path;
				o = o ? ";path=" + o : "";
				var l = n.domain || this.defaults.domain;
				l = l ? ";domain=" + l : "";
				var d = n.secure || this.defaults.secure ? ";secure" : "";
				document.cookie = e.escape(t) + "=" + e.escape(i) + r + o + l + d
			}
			return this
		}
		,
		t.remove = function(t, i) {
			t = e.isArray(t) ? t : e.toArray(arguments),
				i = e.isPlainObject(i) ? i : {},
				i.expires = -1;
			for (var n = 0, a = t.length; a > n; n++)
				this.set(t[n], "", i);
			return this
		}
		,
		t.empty = function(t) {
			return t = e.isPlainObject(t) ? t : {},
				this.remove(e.getKeys(this.all()), t)
		}
		,
		t.get = function(t, i) {
			i = i || void 0;
			var n = this.all();
			if (e.isArray(t)) {
				for (var a = {}, r = 0, s = t.length; s > r; r++) {
					var o = t[r];
					a[o] = e.retrieve(n[o], i)
				}
				return a
			}
			return e.retrieve(n[t], i)
		}
		,
		t.all = function() {
			if ("" === document.cookie)
				return {};
			for (var t = document.cookie.split("; "), e = {}, i = 0, n = t.length; n > i; i++) {
				var a = t[i].split("=");
				try {
					e[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
				} catch (r) {
					e[decodeURIComponent(a[0])] = a[1]
				}
			}
			return e
		}
		,
		t.enabled = function() {
			if (navigator.cookieEnabled)
				return !0;
			var e = "_" === t.set("_", "_").get("_");
			return t.remove("_"),
				e
		}
		,
		t
}),
	function() {
		function obMerge(t) {
			for (var e = 1; e < arguments.length; ++e)
				for (var i in arguments[e])
					t[i] = arguments[e][i];
			return t
		}
		
		function countProperties(t) {
			var e = 0;
			for (var i in t)
				t.hasOwnProperty(i) && e++;
			return e
		}
		
		function findInArray(t, e) {
			if (Array.prototype.indexOf)
				return t.indexOf(e);
			for (var i = 0; i < t.length; ++i)
				if (t[i] === e)
					return i;
			return -1
		}
		
		function evalString(t) {
			return t.replace(/\\t/, "	").replace(/\\n/, "\n").replace(/\\(['"\\])/g, "$1")
		}
		
		function trimQuotes(t) {
			return evalString(t.replace(/^['"](.*)['"]$/, "$1")).replace(/^\s+|\s+$/g, "")
		}
		
		function findTag(t, e) {
			for (var i = 0, n = 0, a = jSmart.prototype.left_delimiter, r = jSmart.prototype.right_delimiter, s = jSmart.prototype.auto_literal, o = /^\s*(.+)\s*$/i, l = t ? new RegExp("^\\s*(" + t + ")\\s*$", "i") : o, d = 0; d < e.length; ++d)
				if (e.substr(d, a.length) == a) {
					if (s && d + 1 < e.length && e.substr(d + 1, 1).match(/\s/))
						continue;
					i || (e = e.slice(d),
						n += parseInt(d),
						d = 0),
						++i
				} else if (e.substr(d, r.length) == r) {
					if (s && d - 1 >= 0 && e.substr(d - 1, 1).match(/\s/))
						continue;
					if (!--i) {
						var u = e.slice(a.length, d).replace(/[\r\n]/g, " ")
							, h = u.match(l);
						if (h)
							return h.index = n,
								h[0] = e.slice(0, d + r.length),
								h
					}
					0 > i && (i = 0)
				}
			return null
		}
		
		function findCloseTag(t, e, i) {
			var n = ""
				, a = null
				, r = null
				, s = 0;
			do {
				if (a && (s += a[0].length),
						a = findTag(t, i),
						!a)
					throw new Error("Unclosed {" + e + "}");
				n += i.slice(0, a.index),
					s += a.index,
					i = i.slice(a.index + a[0].length),
					r = findTag(e, n),
				r && (n = n.slice(r.index + r[0].length))
			} while (r);
			return a.index = s,
				a
		}
		
		function findElseTag(t, e, i, n) {
			for (var a = 0, r = findTag(i, n); r; r = findTag(i, n)) {
				var s = findTag(t, n);
				if (!s || s.index > r.index)
					return r.index += a,
						r;
				n = n.slice(s.index + s[0].length),
					a += s.index + s[0].length;
				var o = findCloseTag(e, t, n);
				n = n.slice(o.index + o[0].length),
					a += o.index + o[0].length
			}
			return null
		}
		
		function execute(code, data) {
			if ("string" == typeof code)
				with ({
					__code: code
				})
					with (modifiers)
						with (data)
							try {
								return eval(__code)
							} catch (e) {
								throw new Error(e.message + " in \n" + code)
							}
			return code
		}
		
		function executeByFuncObject(t, e) {
			try {
				return t.apply(this, e)
			} catch (i) {
				throw new Error(i.message)
			}
		}
		
		function assignVar(t, e, i) {
			t.match(/\[\]$/) ? i[t.replace(/\[\]$/, "")].push(e) : i[t] = e
		}
		
		function parse(t, e) {
			for (var i = findTag("", t); i; i = findTag("", t)) {
				i.index && parseText(t.slice(0, i.index), e),
					t = t.slice(i.index + i[0].length);
				var n = i[1].match(/^\s*(\w+)(.*)$/);
				if (n) {
					var a = n[1]
						, r = n.length > 2 ? n[2].replace(/^\s+|\s+$/g, "") : "";
					if (a in buildInFunctions) {
						var s = buildInFunctions[a]
							, o = ("parseParams" in s ? s.parseParams : parseParams)(r);
						if ("block" == s.type) {
							t = t.replace(/^\n/, "");
							var l = findCloseTag("/" + a, a + " +[^}]*", t);
							s.parse(o, e, t.slice(0, l.index)),
								t = t.slice(l.index + l[0].length)
						} else
							s.parse(o, e),
							"extends" == a && (e = []);
						t = t.replace(/^\n/, "")
					} else if (a in plugins) {
						var d = plugins[a];
						if ("block" == d.type) {
							var l = findCloseTag("/" + a, a + " +[^}]*", t);
							parsePluginBlock(a, parseParams(r), e, t.slice(0, l.index)),
								t = t.slice(l.index + l[0].length)
						} else
							"function" == d.type && parsePluginFunc(a, parseParams(r), e);
						("append" == a || "assign" == a || "capture" == a || "eval" == a || "include" == a) && (t = t.replace(/^\n/, ""))
					} else
						buildInFunctions.expression.parse(i[1], e)
				} else {
					var u = buildInFunctions.expression.parse(i[1], e);
					"build-in" == u.type && "operator" == u.name && "=" == u.op && (t = t.replace(/^\n/, ""))
				}
			}
			return t && parseText(t, e),
				e
		}
		
		function parseText(t, e) {
			if (parseText.parseEmbeddedVars)
				for (var i = /([$][\w@]+)|`([^`]*)`/, n = i.exec(t); n; n = i.exec(t))
					e.push({
						type: "text",
						data: t.slice(0, n.index)
					}),
						e.push(parseExpression(n[1] ? n[1] : n[2]).tree),
						t = t.slice(n.index + n[0].length);
			return e.push({
				type: "text",
				data: t
			}),
				e
		}
		
		function parseFunc(t, e, i) {
			return e.__parsed.name = parseText(t, [])[0],
				i.push({
					type: "plugin",
					name: "__func",
					params: e
				}),
				i
		}
		
		function parseOperator(t, e, i, n) {
			n.push({
				type: "build-in",
				name: "operator",
				op: t,
				optype: e,
				precedence: i,
				params: {}
			})
		}
		
		function parseVar(t, e, i) {
			for (var n = e.token, a = [{
				type: "text",
				data: i.replace(/^(\w+)@(key|index|iteration|first|last|show|total)/gi, "$1__$2")
			}], r = /^(?:\.|\s*->\s*|\[\s*)/, s = t.match(r); s; s = t.match(r)) {
				e.token += s[0],
					t = t.slice(s[0].length);
				var o = {
					value: "",
					tree: []
				};
				if (s[0].match(/\[/)) {
					o = parseExpression(t),
					o && (e.token += o.value,
						a.push(o.tree),
						t = t.slice(o.value.length));
					var l = t.match(/\s*\]/);
					l && (e.token += l[0],
						t = t.slice(l[0].length))
				} else {
					var d = parseModifiers.stop;
					if (parseModifiers.stop = !0,
							lookUp(t, o)) {
						e.token += o.value;
						var u = o.tree[0];
						"plugin" == u.type && "__func" == u.name && (u.hasOwner = !0),
							a.push(u),
							t = t.slice(o.value.length)
					} else
						o = !1;
					parseModifiers.stop = d
				}
				o || a.push({
					type: "text",
					data: ""
				})
			}
			return e.tree.push({
				type: "var",
				parts: a
			}),
				e.value += e.token.substr(n.length),
				onParseVar(e.token),
				t
		}
		
		function onParseVar() {
		}
		
		function parseModifiers(t, e) {
			if (!parseModifiers.stop) {
				var i = t.match(/^\|(\w+)/);
				if (i) {
					e.value += i[0];
					var n = "default" == i[1] ? "defaultValue" : i[1];
					t = t.slice(i[0].length).replace(/^\s+/, ""),
						parseModifiers.stop = !0;
					for (var a = [], r = t.match(/^\s*:\s*/); r; r = t.match(/^\s*:\s*/)) {
						e.value += t.slice(0, r[0].length),
							t = t.slice(r[0].length);
						var s = {
							value: "",
							tree: []
						};
						lookUp(t, s) ? (e.value += s.value,
							a.push(s.tree[0]),
							t = t.slice(s.value.length)) : parseText("", a)
					}
					parseModifiers.stop = !1,
						a.unshift(e.tree.pop()),
						e.tree.push(parseFunc(n, {
							__parsed: a
						}, [])[0]),
						parseModifiers(t, e)
				}
			}
		}
		
		function lookUp(t, e) {
			if (!t)
				return !1;
			if (t.substr(0, jSmart.prototype.left_delimiter.length) == jSmart.prototype.left_delimiter) {
				var i = findTag("", t);
				if (i)
					return e.token = i[0],
						e.value += i[0],
						parse(i[0], e.tree),
						parseModifiers(t.slice(e.value.length), e),
						!0
			}
			for (var n = 0; n < tokens.length; ++n)
				if (t.match(tokens[n].re))
					return e.token = RegExp.lastMatch,
						e.value += RegExp.lastMatch,
						tokens[n].parse(e, t.slice(e.token.length)),
						!0;
			return !1
		}
		
		function bundleOp(t, e, i) {
			var n = e[t];
			if ("operator" == n.name && n.precedence == i && !n.params.__parsed) {
				if ("binary" == n.optype)
					return n.params.__parsed = [e[t - 1], e[t + 1]],
						e.splice(t - 1, 3, n),
						!0;
				if ("post-unary" == n.optype)
					return n.params.__parsed = [e[t - 1]],
						e.splice(t - 1, 2, n),
						!0;
				n.params.__parsed = [e[t + 1]],
					e.splice(t, 2, n)
			}
			return !1
		}
		
		function composeExpression(t) {
			var e = 0;
			for (e = 0; e < t.length; ++e)
				t[e] instanceof Array && (t[e] = composeExpression(t[e]));
			for (var i = 1; 14 > i; ++i)
				if (2 == i || 10 == i)
					for (e = t.length; e > 0; --e)
						e -= bundleOp(e - 1, t, i);
				else
					for (e = 0; e < t.length; ++e)
						e -= bundleOp(e, t, i);
			return t[0]
		}
		
		function parseExpression(t) {
			for (var e = {
				value: "",
				tree: []
			}; lookUp(t.slice(e.value.length), e);)
				;
			return e.tree.length ? (e.tree = composeExpression(e.tree),
				e) : !1
		}
		
		function parseParams(t, e, i) {
			var n = t.replace(/\n/g, " ").replace(/^\s+|\s+$/g, "")
				, a = [];
			a.__parsed = [];
			var t = "";
			if (!n)
				return a;
			for (e || (e = /^\s+/,
				i = /^(\w+)\s*=\s*/); n;) {
				var r = null;
				if (i) {
					var s = n.match(i);
					s && (r = trimQuotes(s[1]),
						t += n.slice(0, s[0].length),
						n = n.slice(s[0].length))
				}
				var o = parseExpression(n);
				if (!o)
					break;
				r ? (a[r] = o.value,
					a.__parsed[r] = o.tree) : (a.push(o.value),
					a.__parsed.push(o.tree)),
					t += n.slice(0, o.value.length),
					n = n.slice(o.value.length);
				var l = n.match(e);
				if (!l)
					break;
				t += n.slice(0, l[0].length),
					n = n.slice(l[0].length)
			}
			return a.toString = function() {
				return t
			}
				,
				a
		}
		
		function parsePluginBlock(t, e, i, n) {
			i.push({
				type: "plugin",
				name: t,
				params: e,
				subTree: parse(n, [])
			})
		}
		
		function parsePluginFunc(t, e, i) {
			i.push({
				type: "plugin",
				name: t,
				params: e
			})
		}
		
		function getActualParamValues(t, e) {
			var i = [];
			for (var n in t.__parsed)
				if (t.__parsed.hasOwnProperty(n)) {
					var a = process([t.__parsed[n]], e);
					i[n] = a
				}
			return i.__get = function(t, e, n) {
				if (t in i && "undefined" != typeof i[t])
					return i[t];
				if ("undefined" != typeof n && "undefined" != typeof i[n])
					return i[n];
				if (null === e)
					throw new Error("The required attribute '" + t + "' is missing");
				return e
			}
				,
				i
		}
		
		function isEmptyObject(t) {
			for (var e in t)
				if (t.hasOwnProperty(e))
					return !1;
			return !0
		}
		
		function getVarValue(t, e, i) {
			for (var n = e, a = "", r = 0; r < t.parts.length; ++r) {
				var s = t.parts[r];
				if ("plugin" == s.type && "__func" == s.name && s.hasOwner)
					e.__owner = n,
						n = process([t.parts[r]], e),
						delete e.__owner;
				else if (a = process([s], e),
					a in e.smarty.section && "text" == s.type && "smarty" != process([t.parts[0]], e) && (a = e.smarty.section[a].index),
					!a && "undefined" != typeof i && n instanceof Array && (a = n.length),
					"undefined" != typeof i && r == t.parts.length - 1 && (n[a] = i),
					"object" == typeof n && null !== n && a in n)
					n = n[a];
				else {
					if ("undefined" == typeof i)
						return i;
					n[a] = {},
						n = n[a]
				}
			}
			return n
		}
		
		function process(t, e) {
			for (var i = "", n = 0; n < t.length; ++n) {
				var a = ""
					, r = t[n];
				if ("text" == r.type)
					a = r.data;
				else if ("var" == r.type)
					a = getVarValue(r, e);
				else if ("build-in" == r.type)
					a = buildInFunctions[r.name].process(r, e);
				else if ("plugin" == r.type) {
					var s = plugins[r.name];
					if ("block" == s.type) {
						var o = {
							value: !0
						};
						for (s.process(getActualParamValues(r.params, e), "", e, o); o.value;)
							o.value = !1,
								a += s.process(getActualParamValues(r.params, e), process(r.subTree, e), e, o)
					} else
						"function" == s.type && (a = s.process(getActualParamValues(r.params, e), e))
				}
				if ("boolean" == typeof a && (a = a ? "1" : ""),
					1 == t.length)
					return a;
				if (i += a,
					e.smarty["continue"] || e.smarty["break"])
					return i
			}
			return i
		}
		
		function getTemplate(t, e, i) {
			if (!i && t in files)
				e = files[t];
			else {
				var n = jSmart.prototype.getTemplate(t);
				if ("string" != typeof n)
					throw new Error("No template for " + t);
				parse(applyFilters(jSmart.prototype.filters_global.pre, stripComments(n.replace(/\r\n/g, "\n"))), e),
					files[t] = e
			}
			return e
		}
		
		function stripComments(t) {
			for (var e = "", i = t.match(/{\*/); i; i = t.match(/{\*/)) {
				e += t.slice(0, i.index),
					t = t.slice(i.index + i[0].length);
				var n = t.match(/\*}/);
				if (!n)
					throw new Error("Unclosed {*");
				t = t.slice(n.index + n[0].length)
			}
			return e + t
		}
		
		function applyFilters(t, e) {
			for (var i = 0; i < t.length; ++i)
				e = t[i](e);
			return e
		}
		
		var buildInFunctions = {
			expression: {
				parse: function(t, e) {
					var i = parseExpression(t);
					return e.push({
						type: "build-in",
						name: "expression",
						expression: i.tree,
						params: parseParams(t.slice(i.value.length).replace(/^\s+|\s+$/g, ""))
					}),
						i.tree
				},
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)
						, n = process([t.expression], e);
					if (findInArray(i, "nofilter") < 0) {
						for (var a = 0; a < default_modifiers.length; ++a) {
							var r = default_modifiers[a];
							if (r) {
								for (var s = r.split(":"), o = s[0], l = s.slice(1), d = 0; d < l.length; d++)
									l[d] = trimQuotes(l[d]);
								var u = modifiers[o]
									, h = [n].concat(l);
								u && "function" == typeof u && (n = u.apply(this, h))
							}
						}
						escape_html && (n = modifiers.escape(n)),
							n = applyFilters(varFilters, n),
						tpl_modifiers.length && (__t = function() {
							return n
						}
							,
							n = process(tpl_modifiers, e))
					}
					return n
				}
			},
			operator: {
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)
						, n = i[0];
					if ("binary" != t.optype) {
						if ("!" == t.op)
							return !n;
						var a = "var" == t.params.__parsed[0].type;
						a && (n = getVarValue(t.params.__parsed[0], e));
						var r = n;
						if ("pre-unary" == t.optype) {
							switch (t.op) {
								case "-":
									r = -n;
									break;
								case "++":
									r = ++n;
									break;
								case "--":
									r = --n
							}
							a && getVarValue(t.params.__parsed[0], e, n)
						} else {
							switch (t.op) {
								case "++":
									n++;
									break;
								case "--":
									n--
							}
							getVarValue(t.params.__parsed[0], e, n)
						}
						return r
					}
					var s = i[1];
					if ("=" == t.op)
						return getVarValue(t.params.__parsed[0], e, s),
							"";
					if (t.op.match(/(\+=|-=|\*=|\/=|%=)/)) {
						switch (n = getVarValue(t.params.__parsed[0], e),
							t.op) {
							case "+=":
								n += s;
								break;
							case "-=":
								n -= s;
								break;
							case "*=":
								n *= s;
								break;
							case "/=":
								n /= s;
								break;
							case "%=":
								n %= s
						}
						return getVarValue(t.params.__parsed[0], e, n)
					}
					if (t.op.match(/div/))
						return "div" != t.op ^ 0 == n % s;
					if (t.op.match(/even/))
						return "even" != t.op ^ 0 == n / s % 2;
					if (t.op.match(/xor/))
						return (n || s) && !(n && s);
					switch (t.op) {
						case "==":
							return n == s;
						case "!=":
							return n != s;
						case "+":
							return Number(n) + Number(s);
						case "-":
							return Number(n) - Number(s);
						case "*":
							return Number(n) * Number(s);
						case "/":
							return Number(n) / Number(s);
						case "%":
							return Number(n) % Number(s);
						case "&&":
							return n && s;
						case "||":
							return n || s;
						case "<":
							return s > n;
						case "<=":
							return s >= n;
						case ">":
							return n > s;
						case ">=":
							return n >= s;
						case "===":
							return n === s;
						case "!==":
							return n !== s
					}
				}
			},
			section: {
				type: "block",
				parse: function(t, e, i) {
					var n = []
						, a = [];
					e.push({
						type: "build-in",
						name: "section",
						params: t,
						subTree: n,
						subTreeElse: a
					});
					var r = findElseTag("section [^}]+", "/section", "sectionelse", i);
					r ? (parse(i.slice(0, r.index), n),
						parse(i.slice(r.index + r[0].length).replace(/^[\r\n]/, ""), a)) : parse(i, n)
				},
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)
						, n = {};
					e.smarty.section[i.__get("name", null, 0)] = n;
					var a = i.__get("show", !0);
					if (n.show = a,
							!a)
						return process(t.subTreeElse, e);
					var r = parseInt(i.__get("start", 0))
						, s = i.loop instanceof Object ? countProperties(i.loop) : isNaN(i.loop) ? 0 : parseInt(i.loop)
						, o = parseInt(i.__get("step", 1))
						, l = parseInt(i.__get("max"));
					isNaN(l) && (l = Number.MAX_VALUE),
						0 > r ? (r += s,
						0 > r && (r = 0)) : r >= s && (r = s ? s - 1 : 0);
					for (var d = 0, u = 0, h = r; h >= 0 && s > h && l > d; h += o,
						++d)
						u = h;
					n.total = d,
						n.loop = d,
						d = 0;
					var c = "";
					for (h = r; h >= 0 && s > h && l > d && !e.smarty["break"]; h += o,
						++d)
						n.first = h == r,
							n.last = 0 > h + o || h + o >= s,
							n.index = h,
							n.index_prev = h - o,
							n.index_next = h + o,
							n.iteration = n.rownum = d + 1,
							c += process(t.subTree, e),
							e.smarty["continue"] = !1;
					return e.smarty["break"] = !1,
						d ? c : process(t.subTreeElse, e)
				}
			},
			setfilter: {
				type: "block",
				parseParams: function(t) {
					return [parseExpression("__t()|" + t).tree]
				},
				parse: function(t, e, i) {
					e.push({
						type: "build-in",
						name: "setfilter",
						params: t,
						subTree: parse(i, [])
					})
				},
				process: function(t, e) {
					tpl_modifiers = t.params;
					var i = process(t.subTree, e);
					return tpl_modifiers = [],
						i
				}
			},
			"for": {
				type: "block",
				parseParams: function(t) {
					var e = t.match(/^\s*\$(\w+)\s*=\s*([^\s]+)\s*to\s*([^\s]+)\s*(?:step\s*([^\s]+))?\s*(.*)$/);
					if (!e)
						throw new Error("Invalid {for} parameters: " + t);
					return parseParams("varName='" + e[1] + "' from=" + e[2] + " to=" + e[3] + " step=" + (e[4] ? e[4] : "1") + " " + e[5])
				},
				parse: function(t, e, i) {
					var n = []
						, a = [];
					e.push({
						type: "build-in",
						name: "for",
						params: t,
						subTree: n,
						subTreeElse: a
					});
					var r = findElseTag("for\\s[^}]+", "/for", "forelse", i);
					r ? (parse(i.slice(0, r.index), n),
						parse(i.slice(r.index + r[0].length), a)) : parse(i, n)
				},
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)
						, n = parseInt(i.__get("from"))
						, a = parseInt(i.__get("to"))
						, r = parseInt(i.__get("step"));
					isNaN(r) && (r = 1);
					var s = parseInt(i.__get("max"));
					isNaN(s) && (s = Number.MAX_VALUE);
					for (var o = 0, l = "", d = Math.min(Math.ceil(((r > 0 ? a - n : n - a) + 1) / Math.abs(r)), s), u = parseInt(i.from); d > o && !e.smarty["break"]; u += r,
						++o)
						e[i.varName] = u,
							l += process(t.subTree, e),
							e.smarty["continue"] = !1;
					return e.smarty["break"] = !1,
					o || (l = process(t.subTreeElse, e)),
						l
				}
			},
			"if": {
				type: "block",
				parse: function(t, e, i) {
					var n = []
						, a = [];
					e.push({
						type: "build-in",
						name: "if",
						params: t,
						subTreeIf: n,
						subTreeElse: a
					});
					var r = findElseTag("if\\s+[^}]+", "/if", "else[^}]*", i);
					if (r) {
						parse(i.slice(0, r.index), n),
							i = i.slice(r.index + r[0].length);
						var s = r[1].match(/^else\s*if(.*)/);
						s ? buildInFunctions["if"].parse(parseParams(s[1]), a, i.replace(/^\n/, "")) : parse(i.replace(/^\n/, ""), a)
					} else
						parse(i, n)
				},
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)[0];
					return !i || i instanceof Array && 0 == i.length || "object" == typeof i && isEmptyObject(i) ? process(t.subTreeElse, e) : process(t.subTreeIf, e)
				}
			},
			foreach: {
				type: "block",
				parseParams: function(t) {
					var e = t.match(/^\s*([$].+)\s*as\s*[$](\w+)\s*(=>\s*[$](\w+))?\s*$/i);
					return e && (t = "from=" + e[1] + " item=" + (e[4] || e[2]),
					e[4] && (t += " key=" + e[2])),
						parseParams(t)
				},
				parse: function(t, e, i) {
					var n = []
						, a = [];
					e.push({
						type: "build-in",
						name: "foreach",
						params: t,
						subTree: n,
						subTreeElse: a
					});
					var r = findElseTag("foreach\\s[^}]+", "/foreach", "foreachelse", i);
					r ? (parse(i.slice(0, r.index), n),
						parse(i.slice(r.index + r[0].length).replace(/^[\r\n]/, ""), a)) : parse(i, n)
				},
				process: function(t, e) {
					var i = getActualParamValues(t.params, e)
						, n = i.from;
					n instanceof Object || (n = [n]);
					var a = countProperties(n);
					e[i.item + "__total"] = a,
					"name" in i && (e.smarty.foreach[i.name] = {},
						e.smarty.foreach[i.name].total = a);
					var r = ""
						, s = 0;
					for (var o in n)
						if (n.hasOwnProperty(o)) {
							if (e.smarty["break"])
								break;
							e[i.item + "__key"] = isNaN(o) ? o : parseInt(o),
							"key" in i && (e[i.key] = e[i.item + "__key"]),
								e[i.item] = n[o],
								e[i.item + "__index"] = parseInt(s),
								e[i.item + "__iteration"] = parseInt(s + 1),
								e[i.item + "__first"] = 0 === s,
								e[i.item + "__last"] = s == a - 1,
							"name" in i && (e.smarty.foreach[i.name].index = parseInt(s),
								e.smarty.foreach[i.name].iteration = parseInt(s + 1),
								e.smarty.foreach[i.name].first = 0 === s ? 1 : "",
								e.smarty.foreach[i.name].last = s == a - 1 ? 1 : ""),
								++s,
								r += process(t.subTree, e),
								e.smarty["continue"] = !1
						}
					return e.smarty["break"] = !1,
						e[i.item + "__show"] = s > 0,
					i.name && (e.smarty.foreach[i.name].show = s > 0 ? 1 : ""),
						s > 0 ? r : process(t.subTreeElse, e)
				}
			},
			"function": {
				type: "block",
				parse: function(t, e, i) {
					var n = [];
					plugins[trimQuotes(t.name ? t.name : t[0])] = {
						type: "function",
						subTree: n,
						defautParams: t,
						process: function(t, e) {
							var i = getActualParamValues(this.defautParams, e);
							return delete i.name,
								process(this.subTree, obMerge({}, e, i, t))
						}
					},
						parse(i, n)
				}
			},
			php: {
				type: "block",
				parse: function() {
				}
			},
			"extends": {
				type: "function",
				parse: function(t, e) {
					e.splice(0, e.length),
						getTemplate(trimQuotes(t.file ? t.file : t[0]), e)
				}
			},
			block: {
				type: "block",
				parse: function(t, e, i) {
					e.push({
						type: "build-in",
						name: "block",
						params: t
					}),
						t.append = findInArray(t, "append") >= 0,
						t.prepend = findInArray(t, "prepend") >= 0,
						t.hide = findInArray(t, "hide") >= 0,
						t.hasChild = t.hasParent = !1,
						onParseVar = function(e) {
							e.match(/^\s*[$]smarty.block.child\s*$/) && (t.hasChild = !0),
							e.match(/^\s*[$]smarty.block.parent\s*$/) && (t.hasParent = !0)
						}
					;
					var e = parse(i, []);
					onParseVar = function() {
					}
					;
					var n = trimQuotes(t.name ? t.name : t[0]);
					n in blocks || (blocks[n] = []),
						blocks[n].push({
							tree: e,
							params: t
						})
				},
				process: function(t, e) {
					e.smarty.block.parent = e.smarty.block.child = "";
					var i = trimQuotes(t.params.name ? t.params.name : t.params[0]);
					return this.processBlocks(blocks[i], blocks[i].length - 1, e),
						e.smarty.block.child
				},
				processBlocks: function(t, e, i) {
					if (!e && t[e].params.hide)
						return i.smarty.block.child = "",
							void 0;
					for (var n = !0, a = !1; e >= 0; --e) {
						if (t[e].params.hasParent) {
							var r = i.smarty.block.child;
							i.smarty.block.child = "",
								this.processBlocks(t, e - 1, i),
								i.smarty.block.parent = i.smarty.block.child,
								i.smarty.block.child = r
						}
						var r = i.smarty.block.child
							, s = process(t[e].tree, i);
						i.smarty.block.child = r,
							t[e].params.hasChild ? i.smarty.block.child = s : n ? i.smarty.block.child = s + i.smarty.block.child : a && (i.smarty.block.child += s),
							n = t[e].params.append,
							a = t[e].params.prepend
					}
				}
			},
			strip: {
				type: "block",
				parse: function(t, e, i) {
					parse(i.replace(/[ \t]*[\r\n]+[ \t]*/g, ""), e)
				}
			},
			literal: {
				type: "block",
				parse: function(t, e, i) {
					parseText(i, e)
				}
			},
			ldelim: {
				type: "function",
				parse: function(t, e) {
					parseText(jSmart.prototype.left_delimiter, e)
				}
			},
			rdelim: {
				type: "function",
				parse: function(t, e) {
					parseText(jSmart.prototype.right_delimiter, e)
				}
			},
			"while": {
				type: "block",
				parse: function(t, e, i) {
					e.push({
						type: "build-in",
						name: "while",
						params: t,
						subTree: parse(i, [])
					})
				},
				process: function(t, e) {
					for (var i = ""; getActualParamValues(t.params, e)[0] && !e.smarty["break"];)
						i += process(t.subTree, e),
							e.smarty["continue"] = !1;
					return e.smarty["break"] = !1,
						i
				}
			}
		}
			, plugins = {}
			, modifiers = {}
			, files = {}
			, blocks = null
			, scripts = null
			, tpl_modifiers = []
			, tokens = [{
			re: /^\$([\w@]+)/,
			parse: function(t, e) {
				parseModifiers(parseVar(e, t, RegExp.$1), t)
			}
		}, {
			re: /^(true|false)/i,
			parse: function(t) {
				parseText(t.token.match(/true/i) ? "1" : "", t.tree)
			}
		}, {
			re: /^'([^'\\]*(?:\\.[^'\\]*)*)'/,
			parse: function(t, e) {
				parseText(evalString(RegExp.$1), t.tree),
					parseModifiers(e, t)
			}
		}, {
			re: /^"([^"\\]*(?:\\.[^"\\]*)*)"/,
			parse: function(t, e) {
				var i = evalString(RegExp.$1)
					, n = i.match(tokens[0].re);
				if (n) {
					var a = {
						token: n[0],
						tree: []
					};
					if (parseVar(i, a, n[1]),
						a.token.length == i.length)
						return t.tree.push(a.tree[0]),
							void 0
				}
				parseText.parseEmbeddedVars = !0,
					t.tree.push({
						type: "plugin",
						name: "__quoted",
						params: {
							__parsed: parse(i, [])
						}
					}),
					parseText.parseEmbeddedVars = !1,
					parseModifiers(e, t)
			}
		}, {
			re: /^(\w+)\s*[(]([)]?)/,
			parse: function(t, e) {
				var i = RegExp.$1
					, n = RegExp.$2
					, a = parseParams(n ? "" : e, /^\s*,\s*/);
				parseFunc(i, a, t.tree),
					t.value += a.toString(),
					parseModifiers(e.slice(a.toString().length), t)
			}
		}, {
			re: /^\s*\(\s*/,
			parse: function(t) {
				var e = [];
				t.tree.push(e),
					e.parent = t.tree,
					t.tree = e
			}
		}, {
			re: /^\s*\)\s*/,
			parse: function(t) {
				t.tree.parent && (t.tree = t.tree.parent)
			}
		}, {
			re: /^\s*(\+\+|--)\s*/,
			parse: function(t) {
				t.tree.length && "var" == t.tree[t.tree.length - 1].type ? parseOperator(RegExp.$1, "post-unary", 1, t.tree) : parseOperator(RegExp.$1, "pre-unary", 1, t.tree)
			}
		}, {
			re: /^\s*(===|!==|==|!=)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1, "binary", 6, t.tree)
			}
		}, {
			re: /^\s+(eq|ne|neq)\s+/i,
			parse: function(t) {
				var e = RegExp.$1.replace(/ne(q)?/, "!=").replace(/eq/, "==");
				parseOperator(e, "binary", 6, t.tree)
			}
		}, {
			re: /^\s*!\s*/,
			parse: function(t) {
				parseOperator("!", "pre-unary", 2, t.tree)
			}
		}, {
			re: /^\s+not\s+/i,
			parse: function(t) {
				parseOperator("!", "pre-unary", 2, t.tree)
			}
		}, {
			re: /^\s*(=|\+=|-=|\*=|\/=|%=)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1, "binary", 10, t.tree)
			}
		}, {
			re: /^\s*(\*|\/|%)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1, "binary", 3, t.tree)
			}
		}, {
			re: /^\s+mod\s+/i,
			parse: function(t) {
				parseOperator("%", "binary", 3, t.tree)
			}
		}, {
			re: /^\s*(\+|-)\s*/,
			parse: function(t) {
				t.tree.length && "operator" != t.tree[t.tree.length - 1].name ? parseOperator(RegExp.$1, "binary", 4, t.tree) : parseOperator(RegExp.$1, "pre-unary", 4, t.tree)
			}
		}, {
			re: /^\s*(<=|>=|<>|<|>)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1.replace(/<>/, "!="), "binary", 5, t.tree)
			}
		}, {
			re: /^\s+(lt|lte|le|gt|gte|ge)\s+/i,
			parse: function(t) {
				var e = RegExp.$1.replace(/lt/, "<").replace(/l(t)?e/, "<=").replace(/gt/, ">").replace(/g(t)?e/, ">=");
				parseOperator(e, "binary", 5, t.tree)
			}
		}, {
			re: /^\s+(is\s+(not\s+)?div\s+by)\s+/i,
			parse: function(t) {
				parseOperator(RegExp.$2 ? "div_not" : "div", "binary", 7, t.tree)
			}
		}, {
			re: /^\s+is\s+(not\s+)?(even|odd)(\s+by\s+)?\s*/i,
			parse: function(t) {
				var e = RegExp.$1 ? "odd" == RegExp.$2 ? "even" : "even_not" : "odd" == RegExp.$2 ? "even_not" : "even";
				parseOperator(e, "binary", 7, t.tree),
				RegExp.$3 || parseText("1", t.tree)
			}
		}, {
			re: /^\s*(&&)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1, "binary", 8, t.tree)
			}
		}, {
			re: /^\s*(\|\|)\s*/,
			parse: function(t) {
				parseOperator(RegExp.$1, "binary", 9, t.tree)
			}
		}, {
			re: /^\s+and\s+/i,
			parse: function(t) {
				parseOperator("&&", "binary", 11, t.tree)
			}
		}, {
			re: /^\s+xor\s+/i,
			parse: function(t) {
				parseOperator("xor", "binary", 12, t.tree)
			}
		}, {
			re: /^\s+or\s+/i,
			parse: function(t) {
				parseOperator("||", "binary", 13, t.tree)
			}
		}, {
			re: /^#(\w+)#/,
			parse: function(t, e) {
				var i = {
					token: "$smarty",
					tree: []
				};
				parseVar(".config." + RegExp.$1, i, "smarty"),
					t.tree.push(i.tree[0]),
					parseModifiers(e, t)
			}
		}, {
			re: /^\s*\[\s*/,
			parse: function(t, e) {
				var i = parseParams(e, /^\s*,\s*/, /^('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|\w+)\s*=>\s*/);
				parsePluginFunc("__array", i, t.tree),
					t.value += i.toString();
				var n = e.slice(i.toString().length).match(/\s*\]/);
				n && (t.value += n[0])
			}
		}, {
			re: /^[\d.]+/,
			parse: function(t, e) {
				t.token = t.token.indexOf(".") > -1 ? parseFloat(t.token) : parseInt(t.token, 10),
					parseText(t.token, t.tree),
					parseModifiers(e, t)
			}
		}, {
			re: /^\w+/,
			parse: function(t, e) {
				parseText(t.token, t.tree),
					parseModifiers(e, t)
			}
		}]
			, jSmart = function(t) {
			this.tree = [],
				this.tree.blocks = {},
				this.scripts = {},
				this.default_modifiers = [],
				this.filters = {
					variable: [],
					post: []
				},
				this.smarty = {
					smarty: {
						block: {},
						"break": !1,
						capture: {},
						"continue": !1,
						counter: {},
						cycle: {},
						foreach: {},
						section: {},
						now: Math.floor((new Date).getTime() / 1e3),
						"const": {},
						config: {},
						current_dir: "/",
						template: "",
						ldelim: jSmart.prototype.left_delimiter,
						rdelim: jSmart.prototype.right_delimiter,
						version: "2.15.0"
					}
				},
				blocks = this.tree.blocks,
				parse(applyFilters(jSmart.prototype.filters_global.pre, stripComments(new String(t ? t : "").replace(/\r\n/g, "\n"))), this.tree)
		};
		jSmart.prototype.fetch = function(t) {
			blocks = this.tree.blocks,
				scripts = this.scripts,
				escape_html = this.escape_html,
				default_modifiers = jSmart.prototype.default_modifiers_global.concat(this.default_modifiers),
				this.data = obMerge("object" == typeof t ? t : {}, this.smarty),
				varFilters = jSmart.prototype.filters_global.variable.concat(this.filters.variable);
			var e = process(this.tree, this.data);
			return jSmart.prototype.debugging && plugins.debug.process([], this.data),
				applyFilters(jSmart.prototype.filters_global.post.concat(this.filters.post), e)
		}
			,
			jSmart.prototype.escape_html = !1,
			jSmart.prototype.registerPlugin = function(t, e, i) {
				"modifier" == t ? modifiers[e] = i : plugins[e] = {
					type: t,
					process: i
				}
			}
			,
			jSmart.prototype.registerFilter = function(t, e) {
				(this.tree ? this.filters : jSmart.prototype.filters_global)["output" == t ? "post" : t].push(e)
			}
			,
			jSmart.prototype.filters_global = {
				pre: [],
				variable: [],
				post: []
			},
			jSmart.prototype.configLoad = function(t, e, i) {
				i = i ? i : this.data;
				for (var n = t.replace(/\r\n/g, "\n").replace(/^\s+|\s+$/g, ""), a = /^\s*(?:\[([^\]]+)\]|(?:(\w+)[ \t]*=[ \t]*("""|'[^'\\\n]*(?:\\.[^'\\\n]*)*'|"[^"\\\n]*(?:\\.[^"\\\n]*)*"|[^\n]*)))/m, r = "", s = n.match(a); s; s = n.match(a)) {
					if (n = n.slice(s.index + s[0].length),
							s[1])
						r = s[1];
					else if ((!r || r == e) && "." != r.substr(0, 1))
						if ('"""' == s[3]) {
							var o = n.match(/"""/);
							o && (i.smarty.config[s[2]] = n.slice(0, o.index),
								n = n.slice(o.index + o[0].length))
						} else
							i.smarty.config[s[2]] = trimQuotes(s[3]);
					var l = n.match(/\n+/);
					if (!l)
						break;
					n = n.slice(l.index + l[0].length)
				}
			}
			,
			jSmart.prototype.clearConfig = function(t) {
				t ? delete this.data.smarty.config[t] : this.data.smarty.config = {}
			}
			,
			jSmart.prototype.addDefaultModifier = function(t) {
				t instanceof Array || (t = [t]);
				for (var e = 0; e < t.length; ++e) {
					var i = {
						value: "",
						tree: [0]
					};
					parseModifiers("|" + t[e], i),
						(this.tree ? this.default_modifiers : this.default_modifiers_global).push(i.tree[0])
				}
			}
			,
			jSmart.prototype.default_modifiers_global = ['escape:"html"'],
			jSmart.prototype.getTemplate = function(t) {
				return document.getElementById(t).innerHTML
			}
			,
			jSmart.prototype.getFile = function(t) {
				throw new Error("No file for " + t)
			}
			,
			jSmart.prototype.getJavascript = function(t) {
				throw new Error("No Javascript for " + t)
			}
			,
			jSmart.prototype.getConfig = function(t) {
				throw new Error("No config for " + t)
			}
			,
			jSmart.prototype.auto_literal = !0,
			jSmart.prototype.left_delimiter = "{",
			jSmart.prototype.right_delimiter = "}",
			jSmart.prototype.debugging = !1,
			jSmart.prototype.PHPJS = function(fnm, modifier) {
				if ("function" == eval("typeof " + fnm))
					return "object" == typeof window ? window : global;
				if ("function" == typeof PHP_JS)
					return new PHP_JS;
				throw new Error("Modifier '" + modifier + "' uses JavaScript port of PHP function '" + fnm + "'. You can find one at http://phpjs.org")
			}
			,
			jSmart.prototype.makeTimeStamp = function(t) {
				if (!t)
					return Math.floor((new Date).getTime() / 1e3);
				if (isNaN(t)) {
					var e = jSmart.prototype.PHPJS("strtotime", "date_format").strtotime(t);
					return -1 == e || e === !1 ? Math.floor((new Date).getTime() / 1e3) : e
				}
				return t = new String(t),
					14 == t.length ? Math.floor(new Date(t.substr(0, 4), t.substr(4, 2) - 1, t.substr(6, 2), t.substr(8, 2), t.substr(10, 2)).getTime() / 1e3) : parseInt(t)
			}
			,
			jSmart.prototype.registerPlugin("function", "__array", function(t) {
				var e = [];
				for (var i in t)
					t.hasOwnProperty(i) && t[i] && "function" != typeof t[i] && (e[i] = t[i]);
				return e
			}),
			jSmart.prototype.registerPlugin("function", "__func", function(t, e) {
				for (var i = [], n = {}, a = [], r = 0; r < t.length; ++r)
					i.push(t.name + "__p" + r),
						a.push(t[r]),
						n[t.name + "__p" + r] = t[r];
				var s, o = obMerge({}, e, n);
				return "__owner" in e && t.name in e.__owner ? (s = "__owner." + t.name,
					execute(s + "(" + i.join(",") + ")", o)) : modifiers.hasOwnProperty(t.name) ? (s = modifiers[t.name],
					executeByFuncObject(s, a, o)) : (s = t.name,
					execute(s + "(" + i.join(",") + ")", o))
			}),
			jSmart.prototype.registerPlugin("function", "__quoted", function(t) {
				return t.join("")
			}),
			jSmart.prototype.registerPlugin("function", "append", function(t, e) {
				var i = t.__get("var", null, 0);
				i in e && e[i] instanceof Array || (e[i] = []);
				var n = t.__get("index", !1)
					, a = t.__get("value", null, 1);
				return n === !1 ? e[i].push(a) : e[i][n] = a,
					""
			}),
			jSmart.prototype.registerPlugin("function", "assign", function(t, e) {
				return assignVar(t.__get("var", null, 0), t.__get("value", null, 1), e),
					""
			}),
			jSmart.prototype.registerPlugin("function", "break", function(t, e) {
				return e.smarty["break"] = !0,
					""
			}),
			jSmart.prototype.registerPlugin("function", "call", function(t, e) {
				var i = t.__get("name", null, 0);
				delete t.name;
				var n = t.__get("assign", !1);
				delete t.assign;
				var a = plugins[i].process(t, e);
				return n ? (assignVar(n, a, e),
					"") : a
			}),
			jSmart.prototype.registerPlugin("block", "capture", function(t, e, i) {
				if (e) {
					e = e.replace(/^\n/, ""),
						i.smarty.capture[t.__get("name", "default", 0)] = e,
					"assign" in t && assignVar(t.assign, e, i);
					var n = t.__get("append", !1);
					n && (n in i ? i[n] instanceof Array && i[n].push(e) : i[n] = [e])
				}
				return ""
			}),
			jSmart.prototype.registerPlugin("function", "continue", function(t, e) {
				return e.smarty["continue"] = !0,
					""
			}),
			jSmart.prototype.registerPlugin("function", "counter", function(t, e) {
				var i = t.__get("name", "default");
				if (i in e.smarty.counter) {
					var n = e.smarty.counter[i];
					"start" in t ? n.value = parseInt(t.start) : (n.value = parseInt(n.value),
						n.skip = parseInt(n.skip),
						"down" == n.direction ? n.value -= n.skip : n.value += n.skip),
						n.skip = t.__get("skip", n.skip),
						n.direction = t.__get("direction", n.direction),
						n.assign = t.__get("assign", n.assign)
				} else
					e.smarty.counter[i] = {
						value: parseInt(t.__get("start", 1)),
						skip: parseInt(t.__get("skip", 1)),
						direction: t.__get("direction", "up"),
						assign: t.__get("assign", !1)
					};
				return e.smarty.counter[i].assign ? (e[e.smarty.counter[i].assign] = e.smarty.counter[i].value,
					"") : t.__get("print", !0) ? e.smarty.counter[i].value : ""
			}),
			jSmart.prototype.registerPlugin("function", "cycle", function(t, e) {
				var i = t.__get("name", "default")
					, n = t.__get("reset", !1);
				i in e.smarty.cycle || (e.smarty.cycle[i] = {
					arr: [""],
					delimiter: t.__get("delimiter", ","),
					index: 0
				},
					n = !0),
				t.__get("delimiter", !1) && (e.smarty.cycle[i].delimiter = t.delimiter);
				var a = t.__get("values", !1);
				if (a) {
					var r = [];
					if (a instanceof Object)
						for (nm in a)
							r.push(a[nm]);
					else
						r = a.split(e.smarty.cycle[i].delimiter);
					(r.length != e.smarty.cycle[i].arr.length || r[0] != e.smarty.cycle[i].arr[0]) && (e.smarty.cycle[i].arr = r,
						e.smarty.cycle[i].index = 0,
						n = !0)
				}
				return t.__get("advance", "true") && (e.smarty.cycle[i].index += 1),
				(e.smarty.cycle[i].index >= e.smarty.cycle[i].arr.length || n) && (e.smarty.cycle[i].index = 0),
					t.__get("assign", !1) ? (assignVar(t.assign, e.smarty.cycle[i].arr[e.smarty.cycle[i].index], e),
						"") : t.__get("print", !0) ? e.smarty.cycle[i].arr[e.smarty.cycle[i].index] : ""
			}),
			jSmart.prototype.print_r = function(t, e) {
				if (t instanceof Object) {
					var i = (t instanceof Array ? "Array[" + t.length + "]" : "Object") + "<br>";
					for (var n in t)
						t.hasOwnProperty(n) && (i += e + "&nbsp;&nbsp;<strong>" + n + "</strong> : " + jSmart.prototype.print_r(t[n], e + "&nbsp;&nbsp;&nbsp;") + "<br>");
					return i
				}
				return t
			}
			,
			jSmart.prototype.registerPlugin("function", "debug", function(t, e) {
				"undefined" != typeof dbgWnd && dbgWnd.close(),
					dbgWnd = window.open("", "", "width=680,height=600,resizable,scrollbars=yes");
				var i = ""
					, n = 0;
				for (var a in e)
					i += "<tr class=" + (++n % 2 ? "odd" : "even") + "><td><strong>" + a + "</strong></td><td>" + jSmart.prototype.print_r(e[a], "") + "</td></tr>";
				return dbgWnd.document.write("                <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>                <head>                     <title>jSmart Debug Console</title>                   <style type='text/css'>                      table {width: 100%;}                      td {vertical-align:top;width: 50%;}                      .even td {background-color: #fafafa;}                   </style>                </head>                <body>                   <h1>jSmart Debug Console</h1>                   <h2>assigned template variables</h2>                   <table>" + i + "</table>                </body>                </html>             "),
					""
			}),
			jSmart.prototype.registerPlugin("function", "eval", function(t, e) {
				var i = [];
				parse(t.__get("var", "", 0), i);
				var n = process(i, e);
				return "assign" in t ? (assignVar(t.assign, n, e),
					"") : n
			}),
			jSmart.prototype.registerPlugin("function", "fetch", function(t, e) {
				var i = jSmart.prototype.getFile(t.__get("file", null, 0));
				return "assign" in t ? (assignVar(t.assign, i, e),
					"") : i
			}),
			jSmart.prototype.registerPlugin("function", "html_checkboxes", function(t, e) {
				var i, n, a, r = t.__get("type", "checkbox"), s = t.__get("name", r), o = t.__get("name", r),
					l = t.__get("values", t.options), d = t.__get("options", []), u = "options" in t, h = t.__get("selected", !1),
					c = t.__get("separator", ""), p = Boolean(t.__get("labels", !0)), f = Boolean(t.__get("label_ids", !1)),
					m = [], _ = 0, v = "";
				if ("checkbox" == r && (s += "[]"),
						!u)
					for (i in t.output)
						d.push(t.output[i]);
				for (i in l)
					l.hasOwnProperty(i) && (n = u ? i : l[i],
						a = o + "_" + n,
						v = p ? f ? '<label for="' + a + '">' : "<label>" : "",
						v += '<input type="' + r + '" name="' + s + '" value="' + n + '" ',
					f && (v += 'id="' + a + '" '),
					h == (u ? i : l[i]) && (v += 'checked="checked" '),
						v += "/>" + d[u ? i : _++],
						v += p ? "</label>" : "",
						v += c,
						m.push(v));
				return "assign" in t ? (assignVar(t.assign, m, e),
					"") : m.join("\n")
			}),
			jSmart.prototype.registerPlugin("function", "html_image", function(t) {
				var e, i = t.__get("file", null), n = t.__get("width", !1), a = t.__get("height", !1), r = t.__get("alt", ""),
					s = t.__get("href", t.__get("link", !1)), o = t.__get("path_prefix", ""), l = {
						file: 1,
						width: 1,
						height: 1,
						alt: 1,
						href: 1,
						basedir: 1,
						path_prefix: 1,
						link: 1
					},
					d = '<img src="' + o + i + '"' + ' alt="' + r + '"' + (n ? ' width="' + n + '"' : "") + (a ? ' height="' + a + '"' : "");
				for (e in t)
					t.hasOwnProperty(e) && "string" == typeof t[e] && (e in l || (d += " " + e + '="' + t[e] + '"'));
				return d += " />",
					s ? '<a href="' + s + '">' + d + "</a>" : d
			}),
			jSmart.prototype.registerPlugin("function", "html_options", function(t) {
				var e, i = t.__get("values", t.options), n = t.__get("options", []), a = "options" in t;
				if (!a)
					for (e in t.output)
						n.push(t.output[e]);
				var r = t.__get("selected", !1)
					, s = []
					, o = ""
					, l = 0;
				for (e in i)
					i.hasOwnProperty(e) && (o = '<option value="' + (a ? e : i[e]) + '"',
					r == (a ? e : i[e]) && (o += ' selected="selected"'),
						o += ">" + n[a ? e : l++] + "</option>",
						s.push(o));
				var d = t.__get("name", !1);
				return (d ? '<select name="' + d + '">\n' + s.join("\n") + "\n</select>" : s.join("\n")) + "\n"
			}),
			jSmart.prototype.registerPlugin("function", "html_radios", function(t, e) {
				return t.type = "radio",
					plugins.html_checkboxes.process(t, e)
			}),
			jSmart.prototype.registerPlugin("function", "html_select_date", function(t) {
				var e = t.__get("prefix", "Date_")
					,
					i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
					, n = "";
				n += '<select name="' + e + 'Month">\n';
				var a = 0;
				for (a = 0; a < i.length; ++a)
					n += '<option value="' + a + '">' + i[a] + "</option>\n";
				for (n += "</select>\n",
					     n += '<select name="' + e + 'Day">\n',
					     a = 0; 31 > a; ++a)
					n += '<option value="' + a + '">' + a + "</option>\n";
				return n += "</select>\n"
			}),
			jSmart.prototype.registerPlugin("function", "html_table", function(t) {
				var e, i = [];
				if (t.loop instanceof Array)
					i = t.loop;
				else
					for (e in t.loop)
						t.loop.hasOwnProperty(e) && i.push(t.loop[e]);
				var n = t.__get("rows", !1)
					, a = t.__get("cols", !1);
				a || (a = n ? Math.ceil(i.length / n) : 3);
				var r = [];
				if (isNaN(a)) {
					if ("object" == typeof a)
						for (e in a)
							a.hasOwnProperty(e) && r.push(a[e]);
					else
						r = a.split(/\s*,\s*/);
					a = r.length
				}
				n = n ? n : Math.ceil(i.length / a);
				var s = t.__get("inner", "cols")
					, o = t.__get("caption", "")
					, l = t.__get("table_attr", 'border="1"')
					, d = t.__get("th_attr", !1);
				d && "object" != typeof d && (d = [d]);
				var u = t.__get("tr_attr", !1);
				u && "object" != typeof u && (u = [u]);
				var h = t.__get("td_attr", !1);
				h && "object" != typeof h && (h = [h]);
				for (var c = t.__get("trailpad", "&nbsp;"), p = t.__get("hdir", "right"), f = t.__get("vdir", "down"), m = "", _ = 0; n > _; ++_) {
					m += "<tr" + (u ? " " + u[_ % u.length] : "") + ">\n";
					for (var v = 0; a > v; ++v) {
						var g = "cols" == s ? ("down" == f ? _ : n - 1 - _) * a + ("right" == p ? v : a - 1 - v) : ("right" == p ? v : a - 1 - v) * n + ("down" == f ? _ : n - 1 - _);
						m += "<td" + (h ? " " + h[v % h.length] : "") + ">" + (g < i.length ? i[g] : c) + "</td>\n"
					}
					m += "</tr>\n"
				}
				var y = "";
				if (r.length) {
					y = "\n<thead><tr>";
					for (var E = 0; E < r.length; ++E)
						y += "\n<th" + (d ? " " + d[E % d.length] : "") + ">" + r["right" == p ? E : r.length - 1 - E] + "</th>";
					y += "\n</tr></thead>"
				}
				return "<table " + l + ">" + (o ? "\n<caption>" + o + "</caption>" : "") + y + "\n<tbody>\n" + m + "</tbody>\n</table>\n"
			}),
			jSmart.prototype.registerPlugin("function", "include", function(t, e) {
				var i = t.__get("file", null, 0)
					, n = obMerge({}, e, t);
				n.smarty.template = i;
				var a = process(getTemplate(i, [], findInArray(t, "nocache") >= 0), n);
				return "assign" in t ? (assignVar(t.assign, a, e),
					"") : a
			}),
			jSmart.prototype.registerPlugin("function", "include_javascript", function(t, e) {
				var i = t.__get("file", null, 0);
				if (t.__get("once", !0) && i in scripts)
					return "";
				scripts[i] = !0;
				var n = execute(jSmart.prototype.getJavascript(i), {
					$this: e
				});
				return "assign" in t ? (assignVar(t.assign, n, e),
					"") : n
			}),
			jSmart.prototype.registerPlugin("function", "include_php", function(t, e) {
				return plugins.include_javascript.process(t, e)
			}),
			jSmart.prototype.registerPlugin("function", "insert", function(params, data) {
				var fparams = {};
				for (var nm in params)
					params.hasOwnProperty(nm) && isNaN(nm) && params[nm] && "string" == typeof params[nm] && "name" != nm && "assign" != nm && "script" != nm && (fparams[nm] = params[nm]);
				var prefix = "insert_";
				"script" in params && (eval(jSmart.prototype.getJavascript(params.script)),
					prefix = "smarty_insert_");
				var func = eval(prefix + params.__get("name", null, 0))
					, s = func(fparams, data);
				return "assign" in params ? (assignVar(params.assign, s, data),
					"") : s
			}),
			jSmart.prototype.registerPlugin("block", "javascript", function(t, e, i) {
				return i.$this = i,
					execute(e, i),
					delete i.$this,
					""
			}),
			jSmart.prototype.registerPlugin("function", "config_load", function(t, e) {
				return jSmart.prototype.configLoad(jSmart.prototype.getConfig(t.__get("file", null, 0)), t.__get("section", "", 1), e),
					""
			}),
			jSmart.prototype.registerPlugin("function", "mailto", function(t) {
				var e = t.__get("address", null)
					, i = t.__get("encode", "none")
					, n = t.__get("text", e)
					, a = jSmart.prototype.PHPJS("rawurlencode", "mailto").rawurlencode(t.__get("cc", "")).replace("%40", "@")
					, r = jSmart.prototype.PHPJS("rawurlencode", "mailto").rawurlencode(t.__get("bcc", "")).replace("%40", "@")
					,
					o = jSmart.prototype.PHPJS("rawurlencode", "mailto").rawurlencode(t.__get("followupto", "")).replace("%40", "@")
					, l = jSmart.prototype.PHPJS("rawurlencode", "mailto").rawurlencode(t.__get("subject", ""))
					, d = jSmart.prototype.PHPJS("rawurlencode", "mailto").rawurlencode(t.__get("newsgroups", ""))
					, u = t.__get("extra", "");
				if (e += a ? "?cc=" + a : "",
						e += r ? (a ? "&" : "?") + "bcc=" + r : "",
						e += l ? (a || r ? "&" : "?") + "subject=" + l : "",
						e += d ? (a || r || l ? "&" : "?") + "newsgroups=" + d : "",
						e += o ? (a || r || l || d ? "&" : "?") + "followupto=" + o : "",
						s = '<a href="mailto:' + e + '" ' + u + ">" + n + "</a>",
					"javascript" == i) {
					s = "document.write('" + s + "');";
					for (var h = "", c = 0; c < s.length; ++c)
						h += "%" + jSmart.prototype.PHPJS("bin2hex", "mailto").bin2hex(s.substr(c, 1));
					return '<script type="text/javascript">eval(unescape(\'' + h + "'))</script>"
				}
				if ("javascript_charcode" == i) {
					for (var p = [], c = 0; c < s.length; ++c)
						p.push(jSmart.prototype.PHPJS("ord", "mailto").ord(s.substr(c, 1)));
					return '<script type="text/javascript" language="javascript">\n<!--\n{document.write(String.fromCharCode(' + p.join(",") + "))}\n//-->\n</script>\n"
				}
				if ("hex" == i) {
					if (e.match(/^.+\?.+$/))
						throw new Error("mailto: hex encoding does not work with extra attributes. Try javascript.");
					for (var f = "", c = 0; c < e.length; ++c)
						f += e.substr(c, 1).match(/\w/) ? "%" + jSmart.prototype.PHPJS("bin2hex", "mailto").bin2hex(e.substr(c, 1)) : e.substr(c, 1);
					for (var m = "", c = 0; c < n.length; ++c)
						m += "&#x" + jSmart.prototype.PHPJS("bin2hex", "mailto").bin2hex(n.substr(c, 1)) + ";";
					return '<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;' + f + '" ' + u + ">" + m + "</a>"
				}
				return s
			}),
			jSmart.prototype.registerPlugin("function", "math", function(params, data) {
				with (Math)
					with (params)
						var res = eval(params.__get("equation", null).replace(/pi\(\s*\)/g, "PI"));
				return "format" in params && (res = jSmart.prototype.PHPJS("sprintf", "math").sprintf(params.format, res)),
					"assign" in params ? (assignVar(params.assign, res, data),
						"") : res
			}),
			jSmart.prototype.registerPlugin("block", "nocache", function(t, e) {
				return e
			}),
			jSmart.prototype.registerPlugin("block", "textformat", function(t, e, i) {
				if (!e)
					return "";
				var n = t.__get("wrap", 80)
					, a = t.__get("wrap_char", "\n")
					, r = t.__get("wrap_cut", !1)
					, s = t.__get("indent_char", " ")
					, o = t.__get("indent", 0)
					, l = new Array(o + 1).join(s)
					, d = t.__get("indent_first", 0)
					, u = new Array(d + 1).join(s)
					, h = t.__get("style", "");
				"email" == h && (n = 72);
				for (var c = e.split(/[\r\n]{2}/), p = 0; p < c.length; ++p) {
					var f = c[p];
					f && (f = f.replace(/^\s+|\s+$/, "").replace(/\s+/g, " "),
					d > 0 && (f = u + f),
						f = modifiers.wordwrap(f, n - o, a, r),
					o > 0 && (f = f.replace(/^/gm, l)),
						c[p] = f)
				}
				var m = c.join(a + a);
				return "assign" in t ? (assignVar(t.assign, m, i),
					"") : m
			}),
			jSmart.prototype.registerPlugin("modifier", "capitalize", function(t, e, i) {
				var n = new RegExp(e ? "[^a-zA-Z_à-ü]+" : "[^a-zA-Z0-9_à-ü]")
					, a = null
					, r = "";
				for (i && (t = t.toLowerCase()),
					     a = t.match(n); a; a = t.match(n)) {
					var s = t.slice(0, a.index);
					r += s.match(/\d/) ? s : s.charAt(0).toUpperCase() + s.slice(1),
						r += t.slice(a.index, a.index + a[0].length),
						t = t.slice(a.index + a[0].length)
				}
				return t.match(/\d/) ? r + t : r + t.charAt(0).toUpperCase() + t.slice(1)
			}),
			jSmart.prototype.registerPlugin("modifier", "cat", function(t, e) {
				return e = e ? e : "",
				t + e
			}),
			jSmart.prototype.registerPlugin("modifier", "count", function(t, e) {
				if (null === t || "undefined" == typeof t)
					return 0;
				if (t.constructor !== Array && t.constructor !== Object)
					return 1;
				e = Boolean(e);
				var i, n = 0;
				for (i in t)
					t.hasOwnProperty(i) && (n++,
					e && t[i] && (t[i].constructor === Array || t[i].constructor === Object) && (n += modifiers.count(t[i], !0)));
				return n
			}),
			jSmart.prototype.registerPlugin("modifier", "count_characters", function(t, e) {
				return e ? t.length : t.replace(/\s/g, "").length
			}),
			jSmart.prototype.registerPlugin("modifier", "count_paragraphs", function(t) {
				var e = t.match(/\n+/g);
				return e ? e.length + 1 : 1
			}),
			jSmart.prototype.registerPlugin("modifier", "count_sentences", function(t) {
				var e = t.match(/[^\s]\.(?!\w)/g);
				return e ? e.length : 0
			}),
			jSmart.prototype.registerPlugin("modifier", "count_words", function(t) {
				var e = t.match(/\w+/g);
				return e ? e.length : 0
			}),
			jSmart.prototype.registerPlugin("modifier", "date_format", function(t, e, i) {
				return jSmart.prototype.PHPJS("strftime", "date_format").strftime(e ? e : "%b %e, %Y", jSmart.prototype.makeTimeStamp(t ? t : i))
			}),
			jSmart.prototype.registerPlugin("modifier", "defaultValue", function(t, e) {
				return t && "null" != t && "undefined" != t ? t : e ? e : ""
			}),
			jSmart.prototype.registerPlugin("modifier", "unescape", function(t, e, i) {
				switch (t = new String(t),
					e = e || "html",
					i = i || "UTF-8",
					e) {
					case "html":
						return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#039;/g, "'").replace(/&quot;/g, '"');
					case "entity":
					case "htmlall":
						return jSmart.prototype.PHPJS("html_entity_decode", "unescape").html_entity_decode(t, 0);
					case "url":
						return jSmart.prototype.PHPJS("rawurldecode", "unescape").rawurldecode(t)
				}
				return t
			}),
			jSmart.prototype.registerPlugin("modifier", "escape", function(t, e, i, n) {
				switch (t = new String(t),
					e = e || "html",
					i = i || "UTF-8",
					n = "undefined" != typeof n ? Boolean(n) : !0,
					e) {
					case "html":
						return n && (t = t.replace(/&/g, "&amp;")),
							t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;");
					case "htmlall":
						return jSmart.prototype.PHPJS("htmlentities", "escape").htmlentities(t, 3, i);
					case "url":
						return jSmart.prototype.PHPJS("rawurlencode", "escape").rawurlencode(t);
					case "urlpathinfo":
						return jSmart.prototype.PHPJS("rawurlencode", "escape").rawurlencode(t).replace(/%2F/g, "/");
					case "quotes":
						return t.replace(/(^|[^\\])'/g, "$1\\'");
					case "hex":
						for (var a = "", r = 0; r < t.length; ++r)
							a += "%" + jSmart.prototype.PHPJS("bin2hex", "escape").bin2hex(t.substr(r, 1));
						return a;
					case "hexentity":
						for (var a = "", r = 0; r < t.length; ++r)
							a += "&#x" + jSmart.prototype.PHPJS("bin2hex", "escape").bin2hex(t.substr(r, 1)).toLowerCase() + ";";
						return a;
					case "decentity":
						for (var a = "", r = 0; r < t.length; ++r)
							a += "&#" + jSmart.prototype.PHPJS("ord", "escape").ord(t.substr(r, 1)) + ";";
						return a;
					case "mail":
						return t.replace(/@/g, " [AT] ").replace(/[.]/g, " [DOT] ");
					case "nonstd":
						for (var a = "", r = 0; r < t.length; ++r) {
							var s = jSmart.prototype.PHPJS("ord", "escape").ord(t.substr(r, 1));
							a += s >= 126 ? "&#" + s + ";" : t.substr(r, 1)
						}
						return a;
					case "javascript":
						return t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/<\//g, "</")
				}
				return t
			}),
			jSmart.prototype.registerPlugin("modifier", "indent", function(t, e, i) {
				e = e ? e : 4,
					i = i ? i : " ";
				for (var n = ""; e--;)
					n += i;
				var a = t.match(/\n+$/);
				return n + t.replace(/\n+$/, "").replace(/\n/g, "\n" + n) + (a ? a[0] : "")
			}),
			jSmart.prototype.registerPlugin("modifier", "lower", function(t) {
				return t.toLowerCase()
			}),
			jSmart.prototype.registerPlugin("modifier", "nl2br", function(t) {
				return t.replace(/\n/g, "<br />\n")
			}),
			jSmart.prototype.registerPlugin("modifier", "regex_replace", function(t, e, i) {
				var n = e.match(/^ *\/(.*)\/(.*) *$/);
				return new String(t).replace(new RegExp(n[1], "g" + (n.length > 1 ? n[2] : "")), i)
			}),
			jSmart.prototype.registerPlugin("modifier", "replace", function(t, e, i) {
				if (!e)
					return t;
				t = new String(t),
					e = new String(e),
					i = new String(i);
				var n = ""
					, a = -1;
				for (a = t.indexOf(e); a >= 0; a = t.indexOf(e))
					n += t.slice(0, a) + i,
						a += e.length,
						t = t.slice(a);
				return n + t
			}),
			jSmart.prototype.registerPlugin("modifier", "spacify", function(t, e) {
				return e || (e = " "),
					t.replace(/(\n|.)(?!$)/g, "$1" + e)
			}),
			jSmart.prototype.registerPlugin("modifier", "noprint", function() {
				return ""
			}),
			jSmart.prototype.registerPlugin("modifier", "string_format", function(t, e) {
				return jSmart.prototype.PHPJS("sprintf", "string_format").sprintf(e, t)
			}),
			jSmart.prototype.registerPlugin("modifier", "strip", function(t, e) {
				return e = e ? e : " ",
					new String(t).replace(/[\s]+/g, e)
			}),
			jSmart.prototype.registerPlugin("modifier", "strip_tags", function(t, e) {
				return e = null == e ? !0 : e,
					new String(t).replace(/<[^>]*?>/g, e ? " " : "")
			}),
			jSmart.prototype.registerPlugin("modifier", "truncate", function(t, e, i, n, a) {
				return e = e ? e : 80,
					i = null != i ? i : "...",
					t.length <= e ? t : (e -= Math.min(e, i.length),
						a ? t.slice(0, Math.floor(e / 2)) + i + t.slice(t.length - Math.floor(e / 2)) : (n || (t = t.slice(0, e + 1).replace(/\s+?(\S+)?$/, "")),
						t.slice(0, e) + i))
			}),
			jSmart.prototype.registerPlugin("modifier", "upper", function(t) {
				return t.toUpperCase()
			}),
			jSmart.prototype.registerPlugin("modifier", "wordwrap", function(t, e, i, n) {
				e = e || 80,
					i = i || "\n";
				for (var a = t.split("\n"), r = 0; r < a.length; ++r) {
					for (var s = a[r], o = ""; s.length > e;) {
						for (var l = 0, d = s.slice(l).match(/\s+/); d && l + d.index <= e; d = s.slice(l).match(/\s+/))
							l += d.index + d[0].length;
						l = l || (n ? e : d ? d.index + d[0].length : s.length),
							o += s.slice(0, l).replace(/\s+$/, ""),
						l < s.length && (o += i),
							s = s.slice(l)
					}
					a[r] = o + s
				}
				return a.join("\n")
			}),
			jSmart.prototype.registerPlugin("function", "cdn", function(t) {
				var e = t.__get("url", "");
				if ("function" == typeof window.__static) {
					var i = window.__static;
					return i(e)
				}
				return console.error("base -> common __static"),
					""
			}),
			jSmart.prototype.registerPlugin("modifier", "robot_uname", function(t) {
				return t.replace(/^\{[^}]+\}/g, "")
			}),
			String.prototype.fetch = function(t) {
				var e = new jSmart(this);
				return e.fetch(t)
			}
			,
			"object" == typeof module && module && "object" == typeof module.exports ? module.exports = jSmart : "function" == typeof define && define.amd ? define("lib/gallery/jsmart", [], function() {
				return jSmart
			}) : "undefined" != typeof global && (global.jSmart = jSmart)
	}(),
	define("h5/tpljs/playerrel", [], function() {
		var t = '<div class="td-h5__swiper" id="slider">                <div class="td-h5__swiper__items" style="width:{$pagenum*100}%;">                {foreach $list as $item}                {if $item@index < 8}                    {if $item@index%2 == 0}<div class="td-h5__swiper__item">{/if}                        <div class="td-h5__video" data-js="player-rel-item" from="play" iden="{$item.codeId}" pub="6003e5af38715583" data-spm-click="gostr=/yt/newtudou.h5.detailPlayerLaterDL;locaid=dvideo_down">                            <div class="td-h5__video__thumb">                                <img src="{$item.picUrl}&width=264&height=148" alt="" class="td-h5__video__thumb__pic" />                            </div>                            <div class="td-h5__video__meta">                                <div class="td-h5__video__meta__title">{$item.title}</div>                                <div class="td-h5__video__meta__other">                                    <span class=""><i class="td-h5__ico__playnum"></i><span class="">{$item.playAmount}</span></span>                                </div>                                <div class="td-h5__video__meta__action">                                    <div class="td-h5__video__meta__action__btn">用土豆app打开</div>                                </div>                            </div>                        </div>                    {if $item@index%2 == 1 || $item@last}</div>{/if}                {/if}               {/foreach}               </div>            </div>            <div class="td-h5__swiper-dots" id="position">                {section name=loop loop=$pagenum max=4}                    <i{if $smarty.section.loop.first} class="on"{/if}></i>                {/section}            </div>';
		return t
	}),
	function(t) {
		function e(n) {
			if (i[n])
				return i[n].exports;
			var a = i[n] = {
				exports: {},
				id: n,
				loaded: !1
			};
			return t[n].call(a.exports, a, a.exports, e),
				a.loaded = !0,
				a.exports
		}
		
		var i = {};
		return e.m = t,
			e.c = i,
			e.p = "",
			e(0)
	}([function(t, e, i) {
		i(15),
			i(28),
			i(11),
			i(12),
			i(13),
			t.exports = i(14)
	}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var a = i(2)
				, r = n(a)
				, s = i(27);
			n(s);
			var o = {
				TAG: "util",
				jsopInfo: {},
				KEYARR: [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
				protocol: "http:",
				addEventListenerHander: function(t, e, i) {
					t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
				},
				removeEventListenerHander: function(t, e, i) {
					t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = null
				},
				getById: function(t, e) {
					return e && e instanceof HTMLElement ? e.getElementById(t) : document.getElementById(t)
				},
				getByClass: function(t, e) {
					return e && e instanceof HTMLElement ? e.getElementsByClassName(t) : document.getElementsByClassName(t)
				},
				get: function(t, e) {
					if (e = e || document,
						0 === t.indexOf(".")) {
						var i = t.substr(1, t.length - 1);
						return e.getElementsByClassName(i)
					}
					var n = t;
					return 0 === t.indexOf("#") && (n = t.substr(1, t.length - 1)),
						e.getElementById(n)
				},
				getScreenState: function() {
					var t = window.orientation;
					switch (t) {
						case 90:
						case -90:
							t = 0;
							break;
						default:
							t = 1
					}
					return t
				},
				urlParameter: function(t) {
					var e = [];
					for (var i in t)
						e.push(i + "=" + t[i]);
					return e.join("&")
				},
				toJSON: function(t) {
					var e = [];
					for (var i in t)
						e.push('"' + i + '":"' + t[i] + '"');
					return "{" + e.join(",") + "}"
				},
				getURlKey: function(t, e) {
					var i = e.split("?");
					if (i.length > 1) {
						i = i[1].split("&");
						for (var n = i.length, a = 0; n > a; a++) {
							var r = i[a].split("=");
							if (r.length > 1 && r[0] === t)
								return r[1]
						}
					}
					return null
				},
				sendlog: function(t, e) {
					var i = "youku-uniplayer-stat";
					t.indexOf("http:") < 0 && t.indexOf("https:") < 0 && (t = this.protocol + t);
					var n = document.createElement("img");
					e && n.addEventListener("error", e, !1),
						n.src = t + "&r_=" + Math.floor(1e4 * Math.random()),
						n.id = i
				},
				loadfile: function(t, e) {
					var i = null;
					"js" == e ? (i = document.createElement("script"),
						i.setAttribute("type", "text/javascript"),
						i.setAttribute("src", t)) : "css" == e && (i = document.createElement("link"),
						i.setAttribute("rel", "stylesheet"),
						i.setAttribute("type", "text/css"),
						i.setAttribute("href", t)),
					"undefined" != typeof i && document.getElementsByTagName("head")[0].appendChild(i)
				},
				getJsonp: function(t, e, i, n, a) {
					var r = t
						, s = (new Date).getTime() + Math.round(100 * Math.random())
						, o = "_stId" + s
						, l = document.createElement("script")
						, d = "json" + s
						, u = this;
					l.type = "text/javascript",
						l.onerror = l.onbort = function() {
							u[o] && (clearTimeout(u[o]),
								delete u[o],
							i && i(),
								document.getElementsByTagName("head")[0].removeChild(l),
								delete window[d])
						}
					;
					var h = a ? a : 15e3;
					u[o] = setTimeout(function(t) {
						u[t] && (clearTimeout(u[t]),
							delete u[t],
						n && n(),
							document.getElementsByTagName("head")[0].removeChild(l),
							delete window[d])
					}(o), h),
						window[d] = function(t) {
							u[o] && (clearTimeout(u[o]),
								delete u[o],
								e(t),
								document.getElementsByTagName("head")[0].removeChild(l),
								delete window[d])
						}
						,
						r += "&callback=" + d,
						l.src = r,
						document.getElementsByTagName("head")[0].appendChild(l)
				},
				translate: function(t, e) {
					for (var i = [], n = 0; n < t.length; n++) {
						var a = 0;
						a = t[n] >= "a" && t[n] <= "z" ? t[n].charCodeAt(0) - "a".charCodeAt(0) : t[n] - "0" + 26;
						for (var r = 0; 36 > r; r++)
							if (e[r] == a) {
								a = r;
								break
							}
						i[n] = a > 25 ? a - 26 : String.fromCharCode(a + 97)
					}
					return i.join("")
				},
				decode64: function(t) {
					if (!t)
						return "";
					t = t.toString();
					var e = void 0
						, i = void 0
						, n = void 0
						, a = void 0
						, r = void 0
						, s = void 0
						, o = void 0
						,
						l = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
					for (s = t.length,
						     r = 0,
						     o = ""; s > r;) {
						do
							e = l[255 & t.charCodeAt(r++)];
						while (s > r && -1 == e);
						if (-1 == e)
							break;
						do
							i = l[255 & t.charCodeAt(r++)];
						while (s > r && -1 == i);
						if (-1 == i)
							break;
						o += String.fromCharCode(e << 2 | (48 & i) >> 4);
						do {
							if (n = 255 & t.charCodeAt(r++),
								61 == n)
								return o;
							n = l[n]
						} while (s > r && -1 == n);
						if (-1 == n)
							break;
						o += String.fromCharCode((15 & i) << 4 | (60 & n) >> 2);
						do {
							if (a = 255 & t.charCodeAt(r++),
								61 == a)
								return o;
							a = l[a]
						} while (s > r && -1 == a);
						if (-1 == a)
							break;
						o += String.fromCharCode((3 & n) << 6 | a)
					}
					return o
				},
				encode64: function(t) {
					if (!t)
						return "";
					t = t.toString();
					var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
						, i = void 0
						, n = void 0
						, a = void 0
						, r = void 0
						, s = void 0
						, o = void 0;
					for (a = t.length,
						     n = 0,
						     i = ""; a > n;) {
						if (r = 255 & t.charCodeAt(n++),
							n == a) {
							i += e.charAt(r >> 2),
								i += e.charAt((3 & r) << 4),
								i += "==";
							break
						}
						if (s = t.charCodeAt(n++),
							n == a) {
							i += e.charAt(r >> 2),
								i += e.charAt((3 & r) << 4 | (240 & s) >> 4),
								i += e.charAt((15 & s) << 2),
								i += "=";
							break
						}
						o = t.charCodeAt(n++),
							i += e.charAt(r >> 2),
							i += e.charAt((3 & r) << 4 | (240 & s) >> 4),
							i += e.charAt((15 & s) << 2 | (192 & o) >> 6),
							i += e.charAt(63 & o)
					}
					return i
				},
				rc4: function(t, e) {
					for (var i = [], n = 0, a = void 0, r = "", s = 0; 256 > s; s++)
						i[s] = s;
					for (s = 0; 256 > s; s++)
						n = (n + i[s] + t.charCodeAt(s % t.length)) % 256,
							a = i[s],
							i[s] = i[n],
							i[n] = a;
					s = 0,
						n = 0;
					for (var o = 0; o < e.length; o++)
						s = (s + 1) % 256,
							n = (n + i[s]) % 256,
							a = i[s],
							i[s] = i[n],
							i[n] = a,
							r += String.fromCharCode(e.charCodeAt(o) ^ i[(i[s] + i[n]) % 256]);
					return r
				},
				mergeObject: function(t, e) {
					for (var i in t)
						e[i] = t[i];
					return e
				},
				htmlEncodeAll: function(t) {
					return null == t ? "" : t.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
				},
				cookie: {
					isCookie: !0,
					getCookie: function(t) {
						try {
							for (var e = document.cookie.split(";"), i = e.length, n = 0; i > n; n++) {
								var a = e[n].split("=");
								if (a[0] = a[0].split(" ").join(""),
									a.length > 1 && a[0] === t)
									return decodeURIComponent(a[1])
							}
						} catch (s) {
							return this.isCookie = !1,
								r.default.w(this.TAG, "document.cookie is excption"),
								null
						}
					},
					setCookie: function(t, e, i) {
						try {
							i = i || {},
							null === e && (e = "",
								i.expires = -1);
							var n = "";
							if (i.expires && ("number" == typeof i.expires || i.expires.toUTCString)) {
								var a = void 0;
								"number" == typeof i.expires ? (a = new Date,
									a.setTime(a.getTime() + 1e3 * 60 * 60 * 24 * i.expires)) : a = i.expires,
									n = "; ex2pires=" + a.toUTCString()
							}
							var s = i.path ? "; path=" + i.path : ""
								, o = i.domain ? "; domain=" + i.domain : ""
								, l = i.secure ? "; secure" : "";
							document.cookie = [t, "=", encodeURIComponent(e), n, s, o, l].join("")
						} catch (d) {
							this.isCookie = !1,
								r.default.w(this.TAG, "document.cookie is excption")
						}
					}
				},
				show: function(t, e) {
					if (e = e || "block",
						t instanceof Array)
						for (var i = 0, n = t.length; n > i; i++) {
							var a = t[i];
							a && a instanceof HTMLElement && (a.style.display = e)
						}
					t && t instanceof HTMLElement && (t.style.display = e)
				},
				hide: function(t) {
					if (t instanceof Array)
						for (var e = 0, i = t.length; i > e; e++) {
							var n = t[e];
							n && n instanceof HTMLElement && (n.style.display = "none")
						}
					t && t instanceof HTMLElement && (t.style.display = "none")
				},
				createElement: function(t, e, i, n) {
					n = n || "div";
					var a = document.createElement(n);
					return t && (a.className = t),
					e && (a.id = e),
					i && (a.innerHTML = i),
						a
				},
				getTimeModel: function(t) {
					var e = void 0
						, i = void 0
						, n = void 0
						, a = [];
					return e = Math.floor(t / 3600),
						t %= 3600,
						i = Math.floor(t / 60),
						n = parseInt(t % 60),
						e > 0 ? a.push(e) : "",
						i > 9 ? a.push(i) : a.push("0" + i),
						n > 9 ? a.push(n) : a.push("0" + n),
						a.join(":")
				},
				checkBind: function() {
					Function.prototype.bind || (Function.prototype.bind = function(t) {
							if ("function" != typeof this)
								throw new TypeError("What is trying to be bound is not callable");
							var e = Array.prototype.slice.call(arguments, 1)
								, i = this
								, n = function() {
							};
							return fBound = function() {
								return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
							}
								,
								n.prototype = this.prototype,
								fBound.prototype = new n,
								fBound
						}
					)
				},
				addAplusMeta: function() {
					var t = document.location.href;
					if (t.indexOf("youku.com") < 0 && t.indexOf("tudou.com") < 0) {
						var e = document.getElementsByTagName("head")[0]
							, i = document.createElement("meta");
						i.name = "aplus-disable-pvid",
							i.content = "true",
							e.appendChild(i)
					}
				},
				loadAplus: function() {
					window.goldlog ? window.goldlog.pvid && (window.goldlog.pvid = "") : (o.addAplusMeta(),
						this.loadfile(this.protocol + "//g.alicdn.com/alilog/mlog/aplus_o.js", "js"))
				},
				getUCStr: function(t) {
					var e = ""
						, i = navigator.userAgent.toLowerCase();
					if (i.indexOf("ucbrowser") > -1)
						if ("undefined" != typeof uckey && uckey.getUCKey)
							try {
								var n = uckey.getUCKey(t);
								e += "&uc_param_str=xk&xk=" + n,
									r.default.i(this.TAG, n)
							} catch (a) {
								e += "&uc_param_str=x"
							}
						else {
							var s = i.search(/ucbrowser/i);
							-1 != s && parseFloat(i.substr(s + 10, 4)) >= 9.8 && (e += "&uc_param_str=xk",
								r.default.i(this.TAG, parseFloat(i.substr(s + 10, 4))))
						}
					return e
				},
				checkProtocol: function() {
					var t = "";
					t = document.location && document.location.protocol ? document.location.protocol : document.location && document.location.href && document.location.href.indexOf("https:") > -1 ? "https:" : "http:",
						this.protocol = t
				},
				getCna: function() {
					return this.cna ? this.cna : this.cookie.getCookie("cna") ? (this.cna = this.cookie.getCookie("cna"),
						this.cna) : window.goldlog && window.goldlog.Etag ? (this.cna = window.goldlog.Etag,
						this.cna) : (this.loadfile("https://log.mmstat.com/eg.js", "js"),
						null)
				}
			};
			window.util = o,
				o.checkBind(),
				o.checkProtocol(),
				o.loadAplus(),
				e.default = o
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1);
			n(s);
			var o = function() {
				function t() {
					a(this, t)
				}
				
				return r(t, null, [{
					key: "e",
					value: function(e, i) {
						if (t.ENABLE_ERROR) {
							(!e || t.FORCE_GLOBAL_TAG) && (e = t.GLOBAL_TAG);
							var n = "ERROR[" + e + "] > " + i;
							console.error ? console.error(n) : console.warn ? console.warn(n) : console.log(n),
							t.ENABLE_PRINT && t.p(n)
						}
					}
				}, {
					key: "i",
					value: function(e, i) {
						if (t.ENABLE_INFO) {
							(!e || t.FORCE_GLOBAL_TAG) && (e = t.GLOBAL_TAG);
							var n = "INFO[" + e + "] > " + i;
							console.info ? console.info(n) : console.log(n),
							t.ENABLE_PRINT && t.p(n)
						}
					}
				}, {
					key: "w",
					value: function(e, i) {
						if (t.ENABLE_WARN) {
							(!e || t.FORCE_GLOBAL_TAG) && (e = t.GLOBAL_TAG);
							var n = "WARN[" + e + "] > " + i;
							console.warn ? console.warn(n) : console.log(n),
							t.ENABLE_PRINT && t.p(n)
						}
					}
				}, {
					key: "d",
					value: function(e, i) {
						if (t.ENABLE_DEBUG) {
							(!e || t.FORCE_GLOBAL_TAG) && (e = t.GLOBAL_TAG);
							var n = "DEBUG[" + e + "] > " + i;
							console.debug ? console.debug(n) : console.log(n),
							t.ENABLE_PRINT && t.p(n)
						}
					}
				}, {
					key: "p",
					value: function(e) {
						e = "***" + e,
							t.dom ? t.dom.innerHTML = t.dom.innerHTML + "<br>" + e : document.getElementById(t.DOMID) ? t.dom = document.getElementById(t.DOMID) : (t.dom = document.createElement("div"),
								document.getElementsByTagName("body")[0].appendChild(t.dom))
					}
				}]),
					t
			}();
			o.GLOBAL_TAG = "YoukuH5PlayerCore",
				o.FORCE_GLOBAL_TAG = !1,
				o.ENABLE_ERROR = !0,
				o.ENABLE_INFO = !1,
				o.ENABLE_WARN = !0,
				o.ENABLE_DEBUG = !1,
				o.ENABLE_PRINT = !1,
				o.DOMID = "YoukuH5PlayerCore_log",
				e.default = o
		}
		, function(t) {
			function e() {
				this._events = this._events || {},
					this._maxListeners = this._maxListeners || void 0
			}
			
			function i(t) {
				return "function" == typeof t
			}
			
			function n(t) {
				return "number" == typeof t
			}
			
			function a(t) {
				return "object" == typeof t && null !== t
			}
			
			function r(t) {
				return void 0 === t
			}
			
			t.exports = e,
				e.EventEmitter = e,
				e.prototype._events = void 0,
				e.prototype._maxListeners = void 0,
				e.defaultMaxListeners = 10,
				e.prototype.setMaxListeners = function(t) {
					if (!n(t) || 0 > t || isNaN(t))
						throw TypeError("n must be a positive number");
					return this._maxListeners = t,
						this
				}
				,
				e.prototype.emit = function(t) {
					var e, n, s, o, l, d;
					if (this._events || (this._events = {}),
						"error" === t && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
						if (e = arguments[1],
							e instanceof Error)
							throw e;
						var u = new Error('Uncaught, unspecified "error" event. (' + e + ")");
						throw u.context = e,
							u
					}
					if (n = this._events[t],
							r(n))
						return !1;
					if (i(n))
						switch (arguments.length) {
							case 1:
								n.call(this);
								break;
							case 2:
								n.call(this, arguments[1]);
								break;
							case 3:
								n.call(this, arguments[1], arguments[2]);
								break;
							default:
								o = Array.prototype.slice.call(arguments, 1),
									n.apply(this, o)
						}
					else if (a(n))
						for (o = Array.prototype.slice.call(arguments, 1),
							     d = n.slice(),
							     s = d.length,
							     l = 0; s > l; l++)
							d[l].apply(this, o);
					return !0
				}
				,
				e.prototype.addListener = function(t, n) {
					var s;
					if (!i(n))
						throw TypeError("listener must be a function");
					return this._events || (this._events = {}),
					this._events.newListener && this.emit("newListener", t, i(n.listener) ? n.listener : n),
						this._events[t] ? a(this._events[t]) ? this._events[t].push(n) : this._events[t] = [this._events[t], n] : this._events[t] = n,
					a(this._events[t]) && !this._events[t].warned && (s = r(this._maxListeners) ? e.defaultMaxListeners : this._maxListeners,
					s && s > 0 && this._events[t].length > s && (this._events[t].warned = !0,
						console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length),
					"function" == typeof console.trace && console.trace())),
						this
				}
				,
				e.prototype.on = e.prototype.addListener,
				e.prototype.once = function(t, e) {
					function n() {
						this.removeListener(t, n),
						a || (a = !0,
							e.apply(this, arguments))
					}
					
					if (!i(e))
						throw TypeError("listener must be a function");
					var a = !1;
					return n.listener = e,
						this.on(t, n),
						this
				}
				,
				e.prototype.removeListener = function(t, e) {
					var n, r, s, o;
					if (!i(e))
						throw TypeError("listener must be a function");
					if (!this._events || !this._events[t])
						return this;
					if (n = this._events[t],
							s = n.length,
							r = -1,
						n === e || i(n.listener) && n.listener === e)
						delete this._events[t],
						this._events.removeListener && this.emit("removeListener", t, e);
					else if (a(n)) {
						for (o = s; o-- > 0;)
							if (n[o] === e || n[o].listener && n[o].listener === e) {
								r = o;
								break
							}
						if (0 > r)
							return this;
						1 === n.length ? (n.length = 0,
							delete this._events[t]) : n.splice(r, 1),
						this._events.removeListener && this.emit("removeListener", t, e)
					}
					return this
				}
				,
				e.prototype.removeAllListeners = function(t) {
					var e, n;
					if (!this._events)
						return this;
					if (!this._events.removeListener)
						return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t],
							this;
					if (0 === arguments.length) {
						for (e in this._events)
							"removeListener" !== e && this.removeAllListeners(e);
						return this.removeAllListeners("removeListener"),
							this._events = {},
							this
					}
					if (n = this._events[t],
							i(n))
						this.removeListener(t, n);
					else if (n)
						for (; n.length;)
							this.removeListener(t, n[n.length - 1]);
					return delete this._events[t],
						this
				}
				,
				e.prototype.listeners = function(t) {
					var e;
					return e = this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
				}
				,
				e.prototype.listenerCount = function(t) {
					if (this._events) {
						var e = this._events[t];
						if (i(e))
							return 1;
						if (e)
							return e.length
					}
					return 0
				}
				,
				e.listenerCount = function(t, e) {
					return t.listenerCount(e)
				}
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				FRONT_AD: "frontAD",
				BACK_AD: "backAD",
				INSERT_AD: "insertAD",
				PAUSE_AD: "pauseAD",
				OVERLAY_AD: "overlayAD",
				AD_END: "adend",
				AD_ERROR: "aderror",
				AD_PLAY: "adplay",
				AD_PAUSE: "adpause",
				AD_TIMEUPDATE: "adtimeupdate",
				AD_LOADING: "adloading",
				AD_TIMEOUT: "adtimeout",
				AD_CANPLAY: "adcanplay",
				AD_READY: "adready",
				AD_DATA_OK: "addataok",
				AD_DATA_ERROR: "addataerror",
				UGLY_CLOSE_AD: "uglyclosead",
				FRONT_AD_END: "frontADend",
				FRONT_AD_ERROR: "frontADerror",
				FRONT_AD_INFO_OK: "frontAdinfook",
				FRONT_AD_UNITED_INFO_OK: "unitedfrontadinfook",
				FRONT_AD_INFO_ADAPER_OK: "frontAdinfoadapterok",
				FRONT_AD_INFO_TIMEOUT: "frontAdinfotimeout",
				BACK_AD_END: "backAdend",
				BACK_AD_ERROR: "backaderror",
				BACK_AD_INFO_OK: "backAdinfook",
				BACK_AD_INFO_TIMEOUT: " backAdinfotimeout",
				INSERT_AD_INFO_OK: "insertAdinfook",
				PAUSE_AD_INFO_OK: "pauseAdinfook",
				PAUSE_AD_INFO_ERROR: "pauseAdinfoerror",
				PAUSE_AD_INFO_TIMEOUT: "pauseadinfotimeout",
				OVERLAY_AD_INFO_OK: "overlayAdinfook",
				AdPluginObject: "adpluginobject"
			};
			e.default = i
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				PLAYER_STATE: {
					INIT: "PLAYER_STATE_INIT",
					READY: "PLAYER_STATE_READY",
					AD: "PLAYER_STATE_AD",
					ADPLAY: "PLAYER_STATE_ADPLAYING",
					ADPAUSE: "PLAYER_STATE_ADPAUSE",
					PLAYING: "PLAYER_STATE_PLAYING",
					END: "PLAYER_STATE_END",
					ERROR: "PLAYER_STATE_ERROR",
					PAUSE: "PLAYER_STATE_PAUSE"
				}
			};
			e.YKP = i
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				loadstart: "onLoadStart",
				canplay: "onCanPlay",
				loadeddata: "onLoadedData",
				loadedmetadata: "onLoadedMetaData",
				abort: "onAbort",
				error: "onError",
				pause: "onPause",
				waiting: "onWaiting",
				stalled: "onStalled",
				suspend: "onSuspend",
				play: "onPlay",
				volumechange: "onVolumeChange",
				playing: "onPlaying",
				seeked: "onSeeked",
				seeking: "onSeeking",
				durationchange: "onDurationChange",
				progress: "onProgress",
				ratechange: "onRateChange",
				timeupdate: "onTimeUpdate",
				ended: "onEnded"
			};
			e.VIDEO_EVENTS = i
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				FRONT_AD_API: "//valf.atm.youku.com/vf",
				END_AD_API: "//valb.atm.youku.com/vb",
				MID_AD_API: "//valo.atm.youku.com/vo",
				STA_AD_API: "//valt.atm.youku.com/vt",
				PAUSE_AD_API: "//valp.atm.youku.com/vp"
			}
				, n = {
				FRONT_AD_API: "//mf.atm.youku.com/mf",
				END_AD_API: "//mb.atm.youku.com/mb",
				CONTENT_AD_API: "//mo.atm.youku.com/mo",
				STA_AD_API: "//mt.atm.youku.com/mt",
				PAUSE_AD_API: "//mp.atm.youku.com/mp"
			}
				, a = {
				IF_FRONT: !0,
				IF_MID: !0,
				IF_END: !0,
				IF_CONT: !0
			}
				, r = {
				FRONT: "front",
				END: "end",
				CONT: "contentad",
				STA: "standard",
				PAUSE: "pause"
			};
			e.YoukuAdApiPC = i,
				e.YoukuAdApiM = n,
				e.ADConfigM = a,
				e.AD_MAP = r
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = function() {
				function t(e) {
					a(this, t),
						this.addata = e,
						this.curnum = 0
				}
				
				return r(t, [{
					key: "changeNum",
					value: function(t) {
						this.curnum = t
					}
				}, {
					key: "setData",
					value: function(t) {
						this.addata = t
					}
				}, {
					key: "sendSUS",
					value: function(t) {
						if (!(!this.addata || 0 > t || t >= this.addata.VAL.length)) {
							var e = this.addata.VAL[t]
								, i = e.SUS;
							if ("undefined" != typeof i) {
								for (var n = 0; n < i.length; n++) {
									var a = i[n].U;
									o.default.sendlog(a)
								}
								this._loadBRS(e.BRS)
							}
						}
					}
				}, {
					key: "sendUnitedVTVC",
					value: function(t) {
						if (this.addata) {
							t += 2;
							var e = this.addata.VAL[0]
								, i = e.VTVC;
							this._vtccache || (this._vtccache = []);
							for (var n = null, a = 1e6, r = 1e5, s = 0; s < i.length; s++) {
								var l = i[s].U
									, d = parseInt(i[s].T, 10)
									, u = t - d;
								u >= 0 && r > u && (r = u,
									n = l,
									a = d)
							}
							null != n && -1 === this._vtccache.indexOf(a) && (this._vtccache.push(a),
								debug.log("<b> vc = " + n + "</b>"),
								o.default.loadfile(n, "js"))
						}
					}
				}, {
					key: "sendVC",
					value: function(t) {
						if (!(!this.addata || 0 > t || t >= this.addata.VAL.length)) {
							var e = this.addata.VAL[this.curnum]
								, i = e.VT;
							if ("undefined" != typeof i) {
								var n = e.VC;
								loadjscssfile(n, "js")
							}
						}
					}
				}, {
					key: "sendSUS_",
					value: function(t) {
						if (!(!this.addata || 0 > t || t >= this.addata.VAL.length)) {
							var e = this.addata
								, i = this.curnum + 2
								, n = e["A" + i].SU
								, a = e["A" + i].ATMSU
								, r = e["A" + i].ISOSU;
							o.default.sendlog(n),
								o.default.sendlog(a),
								o.default.sendlog(r)
						}
					}
				}, {
					key: "sendSUE",
					value: function(t) {
						if (!(!this.addata || 0 > t || t >= this.addata.VAL.length)) {
							var e = this.addata.VAL[t]
								, i = e.SUE;
							if ("undefined" != typeof i)
								for (var n = 0; n < i.length; n++) {
									var a = i[n].U;
									o.default.sendlog(a)
								}
						}
					}
				}, {
					key: "sendSU",
					value: function(t) {
						if (this.addata) {
							var e = this.addata.VAL[this.curnum]
								, i = e.SU;
							if ("undefined" != typeof i) {
								this._sucache || (this._sucache = []);
								for (var n = 1e4, a = 1e6, r = 0; r < i.length; r++) {
									i[r].U;
									var s = parseInt(i[r].T, 10)
										, l = t - s;
									l >= 0 && n > l && (n = l,
										a = s)
								}
								if (1e6 != a && -1 == this._sucache.indexOf(a)) {
									this._sucache.push(a);
									for (var d = 0; d < i.length; d++)
										parseInt(i[d].T, 10) == a && o.default.sendlog(i[d].U)
								}
							}
						}
					}
				}, {
					key: "sendSU_",
					value: function(t) {
						if (this.addata) {
							curnum += 2;
							var e = this.addata["A" + curnum].MT;
							if (e && t >= parseInt(e, 10)) {
								var i = this.addata["A" + curnum].MU
									, n = this.addata["A" + curnum].CMU;
								o.default.sendlog(i),
									o.default.sendlog(n)
							}
						}
					}
				}, {
					key: "sendCUM",
					value: function() {
						if (this.addata) {
							var t = this.addata.VAL[this.curnum]
								, e = t.CUM;
							if ("undefined" != typeof e)
								for (var i = 0; i < e.length; i++) {
									var n = e[i].U;
									o.default.sendlog(n)
								}
						}
					}
				}, {
					key: "sendUnitedCUM",
					value: function(t) {
						if (this.addata) {
							var e = this.addata.VAL[0]
								, i = e.CUM;
							if ("undefined" != typeof i && 0 !== i.length)
								for (var n = 0; n < i.length; n++)
									if (t < parseInt(i[n].T, 10)) {
										for (var a = 0; a < (i[n].CUM || []).length; a++)
											o.default.sendlog(i[n].CUM[a].U);
										break
									}
						}
					}
				}, {
					key: "_loadBRS",
					value: function() {
						var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
						(/^https/.test(t) || /^https/.test(location.href) && /^\/{2}:/.test(t)) && o.default.loadfile(t, "js")
					}
				}], [{
					key: "sendPauseAdCUM",
					value: function(t) {
						var e = t.VAL[0].CUM;
						if (e)
							for (var i = 0; i < e.length; i++)
								o.default.sendlog(e[i].U)
					}
				}, {
					key: "sendPauseAdSUS",
					value: function(t) {
						var e = t.VAL[0].SUS;
						if (e)
							for (var i = 0; i < e.length; i++)
								o.default.sendlog(e[i].U)
					}
				}]),
					t
			}();
			e.default = l
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				flv: "flv",
				mp4hd: "mp4",
				mp4hd2: "flv",
				mp4hd3: "flv",
				"3gphd": "mp4",
				"3gp": "flv",
				flvhd: "flv"
			}
				, n = {
				flvhd: "标清",
				"3gphd": "标清",
				mp4hd: "高清",
				mp4hd2: "超清",
				mp4hd3: "1080p"
			};
			e.VIDEOHD_MAP = i,
				e.SHOWHD_MAP = n
		}
		, function(t, e) {
			function i(t, e, i) {
				return e in t ? Object.defineProperty(t, e, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = i,
					t
			}
			
			function n() {
				var t = self.navigator.userAgent.toLowerCase()
					,
					e = /(edge)\/([\w.]+)/.exec(t) || /(opr)[\/]([\w.]+)/.exec(t) || /(chrome)[ \/]([\w.]+)/.exec(t) || /(iemobile)[\/]([\w.]+)/.exec(t) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || []
					,
					n = /(ipad)/.exec(t) || /(ipod)/.exec(t) || /(windows phone)/.exec(t) || /(iphone)/.exec(t) || /(kindle)/.exec(t) || /(android)/.exec(t) || /(windows)/.exec(t) || /(mac)/.exec(t) || /(linux)/.exec(t) || /(cros)/.exec(t) || []
					, r = {
						browser: e[5] || e[3] || e[1] || "",
						version: e[2] || e[4] || "0",
						majorVersion: e[4] || e[2] || "0",
						platform: n[0] || ""
					}
					, s = {};
				if (s.isMobile = t.indexOf("mobile") > -1,
						s.isIOS9 = /iPhone|iPod/.test(navigator.userAgent) && /OS 9|OS 1\d{1,}/i.test(navigator.userAgent),
						s.isMobile) {
					var o = i({
						alipay: "alipayclient",
						youku: "youku",
						UC: "ucbrowser",
						qqBrowser: "mqqbrowser",
						maoyan: "movie/",
						weixin: "micromessenger",
						sogou: "sogoumse"
					}, "sogou", "sogoumobilebrowser");
					for (var l in o)
						t.indexOf(o[l]) > -1 && (s.browserType = l)
				}
				if (r.browser) {
					s[r.browser] = !0;
					var d = r.majorVersion.split(".");
					s.version = {
						major: parseInt(r.majorVersion, 10),
						string: r.version
					},
					d.length > 1 && (s.version.minor = parseInt(d[1], 10)),
					d.length > 2 && (s.version.build = parseInt(d[2], 10))
				}
				if (r.platform && (s[r.platform] = !0),
					(s.chrome || s.opr || s.safari) && (s.webkit = !0),
					s.rv || s.iemobile) {
					s.rv && delete s.rv;
					var u = "msie";
					r.browser = u,
						s[u] = !0
				}
				if (s.edge) {
					delete s.edge;
					var h = "msedge";
					r.browser = h,
						s[h] = !0
				}
				if (s.opr) {
					var c = "opera";
					r.browser = c,
						s[c] = !0
				}
				if (s.safari && s.android) {
					var p = "android";
					r.browser = p,
						s[p] = !0
				}
				s.browserType ? (s.name = s.browserType,
					s.safari = !1,
					s.chrome = !1) : s.safari ? (s.name = "safari",
					s.safari = !0) : (s.name = "chrome",
					s.chrome = !0),
					s.android ? (s.os = "android",
						s.android = !0) : "iphone" === r.platform || "ipod" === r.platform || "ipad" === r.platform || "mac" === r.platform ? (s.os = "ios",
						s.ios = !0) : ("windows phone" === r.platform || "windows" === r.platform) && (s.os = "windows"),
					s.device = s.isMobile ? "phone" : "windows" === r.platform ? "pc" : r.platform,
					s.isIphone = "iphone" === r.platform,
					s.isIpod = "ipod" === r.platform,
					s.isIpad = "ipad" === r.platform,
					a = s,
					window.Browser = s
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var a = {};
			n(),
				e.default = a
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(3)
				, d = n(l)
				, u = function() {
				function t(e) {
					a(this, t),
						this.adDom = e,
						this.adBtns = {},
						this._emitter = new d.default,
						this.lastTime = 0,
						this.num = 0,
						this.adBtns.skipBtn = o.default.get(".td-h5__player__advert-skip", this.adDom)[0],
						this.adBtns.timeNum = o.default.get(".td-h5__player__advert-sec", this.adDom)[0],
						this.adBtns.detailBtn = o.default.get(".td-h5__player__advert-detail", this.adDom)[0]
				}
				
				return r(t, [{
					key: "_fSkipAd",
					value: function() {
						this._emitter.emit("adpause");
						var t = "//cps.youku.com/redirect.html?id=000002bf";
						location.href = t
					}
				}, {
					key: "_knowDetail",
					value: function() {
						this._emitter.emit("adpause");
						var t = this.adInfo[this.num].CU;
						location.href = t
					}
				}, {
					key: "_bindEvent",
					value: function() {
						this.ifEvent || (this.ifEvent = !0,
							this.e = {
								skipAd: this._fSkipAd.bind(this),
								knowDetail: this._knowDetail.bind(this)
							},
							o.default.addEventListenerHander(this.adBtns.skipBtn, "touchend", this.e.skipAd),
							o.default.addEventListenerHander(this.adBtns.detailBtn, "touchend", this.e.knowDetail))
					}
				}, {
					key: "setAdInfo",
					value: function(t) {
						this.adInfo = t.VAL,
							this.totalTime = t.totalTime,
							this.adBtns.timeNum.innerHTML = parseInt(this.totalTime),
							this._bindEvent()
					}
				}, {
					key: "reset",
					value: function() {
						this.adInfo = null,
							this.totalTime = 0,
							this.lastTime = 0,
							this.num = 0
					}
				}, {
					key: "hide",
					value: function() {
						o.default.hide(this.adDom)
					}
				}, {
					key: "show",
					value: function() {
						o.default.show(this.adDom)
					}
				}, {
					key: "update",
					value: function(t, e) {
						this.num = e,
						this.lastTime > 0 && t - this.lastTime < .5 || (this.lastTime = t,
							this.adBtns.timeNum.innerHTML = parseInt(this.totalTime - t))
					}
				}]),
					t
			}();
			e.default = u
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(3)
				, d = n(l)
				, u = function() {
				function t(e) {
					a(this, t),
						this.parentDom = e,
						this.errorTipDom = o.default.get(".td-h5__player__tip__error", this.parentDom)[0],
						this.warningTipDom = o.default.get(".td-h5__player__tip__warning", this.parentDom)[0],
						this.btns = {
							warningNote: o.default.get(".td-h5__player__tip__warning__txt", this.warningTipDom)[0],
							warningBtn: o.default.get(".td-h5__player__button-link", this.warningTipDom)[0],
							errorNote: o.default.get(".td-h5__player__tip__error__txt", this.errorTipDom)[0],
							retryBtn: o.default.get(".td-h5__player__button-refresh", this.errorTipDom)[0]
						},
						this.e = {},
						this._emitter = new d.default,
						this._bindEvent()
				}
				
				return r(t, [{
					key: "_bindEvent",
					value: function() {
						this.ifEvent || (this.ifEvent = !0,
							this.e = {
								retry: this.retry.bind(this),
								openApp: this.openApp.bind(this)
							},
							o.default.addEventListenerHander(this.btns.retryBtn, "touchend", this.e.retry),
							o.default.addEventListenerHander(this.btns.warningBtn, "touchend", this.e.openApp))
					}
				}, {
					key: "showError",
					value: function(t, e) {
						e ? (o.default.hide(this.warningTipDom),
							o.default.show(this.errorTipDom),
						t && (this.btns.errorNote.innerHTML = t)) : (o.default.hide(this.errorTipDom),
							o.default.show(this.warningTipDom),
						t && (this.btns.warningNote.innerHTML = t))
					}
				}, {
					key: "hideError",
					value: function() {
						o.default.hide(this.warningTipDom),
							o.default.hide(this.errorTipDom)
					}
				}, {
					key: "openApp",
					value: function() {
						console.log("打开APP")
					}
				}, {
					key: "retry",
					value: function() {
						var t = {};
						this._emitter.emit("retry", t),
							this.hideError()
					}
				}]),
					t
			}();
			e.default = u
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(3)
				, d = n(l)
				, u = i(14)
				, h = n(u)
				, c = i(11)
				, p = n(c)
				, f = i(12)
				, m = n(f)
				, _ = function() {
				function t(e, i, n) {
					a(this, t),
						this.playerDom = e,
						this._player = i,
						this._config = n,
						this.ifEvent = !1,
						this.ifFullScreen = !1,
						this.isErrorVideo = !1,
						this.isLimitPause = !1,
						this.ifAbort = !1,
						this.btn = {
							poster: o.default.get(".td-h5__player__poster", this.playerDom)[0],
							posterImg: o.default.get(".td-h5__player__poster__pic", this.playerDom)[0],
							initVideotime: o.default.get(".td-h5__player__playinit__videotime", this.playerDom)[0],
							playBtn: o.default.get(".td-h5__player__playinit", this.playerDom)[0],
							replayBtn: o.default.get(".td-h5__player__button-replay", this.playerDom)[0],
							trigger: o.default.get(".td-h5__player__trigger", this.playerDom)[0],
							loading: o.default.get(".td-h5__player__loading", this.playerDom)[0],
							adBtn: o.default.get(".td-h5__player__advert", this.playerDom)[0],
							noteDom: o.default.get(".td-h5__player__tip", this.playerDom)[0],
							progress: o.default.get(".td-h5__player__console", this.playerDom)[0],
							minProgress: o.default.get(".td-h5__player__progress-mini", this.playerDom)[0],
							license: o.default.get(".td-h5__player__license", this.playerDom)[0],
							register: o.default.get(".td-h5__player__register", this.playerDom)[0]
						},
						this.dashboard = o.default.get(".td-h5__player__dashboard", this.playerDom)[0],
						this.xconsole = o.default.get(".td-h5__player__console", this.dashboard)[0],
						this.btn.midPlayBtn = o.default.get(".td-h5__player__button-mid", this.playerDom)[0],
						this.btn.fullScreenBtn = o.default.get(".td-h5__player__console__fullscreen", this.playerDom)[0],
						this.panner = {},
						this.class = {
							pause: "pause",
							play: "playing",
							outScreen: "outscreen",
							inScreen: "fscreen"
						},
						this.e = {
							play: this.play.bind(this),
							pause: this.pause.bind(this),
							playNext: this.playNext.bind(this),
							onTrigger: this.onTrigger.bind(this),
							onSeeking: this.onSeeking.bind(this),
							onProgress: this.onTouchProgress.bind(this),
							onProgressEnd: this.onTouchProgressEnd.bind(this),
							retry: this.retry.bind(this),
							replay: this.replay.bind(this),
							switchFullscreen: this.switchFullscreen.bind(this)
						},
						this._emitter = new d.default,
						this._progress = new h.default(this.btn.progress, this.btn.minProgress),
						this._adPannel = new p.default(this.btn.adBtn),
						this._noticePannel = new m.default(this.btn.noteDom),
						this.isIOS10 = /iPhone|iPod/.test(navigator.userAgent) && /OS 10|OS 1\d{1,}/i.test(navigator.userAgent),
						this.isIOS = window.navigator.userAgent.indexOf("iPhone OS") > -1 ? !0 : !1
				}
				
				return r(t, [{
					key: "init",
					value: function(t) {
						if (this.hideLoading(),
								this._video = t,
							!this._video || this.isErrorVideo)
							return !1;
						if (this._trialInfo = this._player.getTrialInfo(),
								this._showInfo = this._player.getShow(),
								this._trialInfo) {
							if (this._trialInfo.time) {
								var e = "使用土豆App，看免费高清视频";
								this.showError(e)
							} else
								this.showError("视频出错啦!");
							return this.togglePlayerStatus(9),
								!1
						}
						if (this.togglePlayerStatus(0),
								this.btn.initVideotime.innerHTML = o.default.getTimeModel(this._video.seconds),
								this._video.logo)
							if (this.btn.poster.children.length > 0)
								this.btn.poster.children[0].src = this._video.logo.replace("https://", "//");
							else {
								var i = document.createElement("img");
								i.src = this._video.logo.replace("https://", "//"),
									this.btn.poster.appendChild(i)
							}
						this._progress.init(this._video.seconds, 0, 0),
							this.showRegisterNum(),
							this.bindEvent()
					}
				}, {
					key: "bindEvent",
					value: function() {
						this.ifEvent || (this.ifEvent = !0,
							o.default.addEventListenerHander(this.btn.midPlayBtn, "click", this.e.play),
							o.default.addEventListenerHander(this.btn.playBtn, "click", this.e.play),
							o.default.addEventListenerHander(this.btn.trigger, "click", this.e.onTrigger),
							o.default.addEventListenerHander(this.btn.replayBtn, "click", this.e.replay),
							o.default.addEventListenerHander(this.btn.fullScreenBtn, "click", this.e.switchFullscreen),
							this._progress._emitter.on("touchprogressend", this.e.onProgressEnd),
							this._progress._emitter.on("touchprogress", this.e.onProgress),
							this._progress._emitter.on("seeking", this.e.onSeeking),
							this._adPannel._emitter.on("adpause", this.e.pause),
							this._adPannel._emitter.on("retry", this.e.retry))
					}
				}, {
					key: "togglePlayerStatus",
					value: function(t) {
						0 === t ? this.playerDom.setAttribute("video-status", "init") : 1 === t ? this.playerDom.setAttribute("video-status", "play") : 2 === t ? this.playerDom.setAttribute("video-status", "playingmin") : 3 === t || (4 === t ? this.playerDom.setAttribute("video-status", "ended") : 5 === t || (6 === t ? this.playerDom.setAttribute("video-status", "advert") : 7 === t ? this.playerDom.setAttribute("video-status", "adpause") : 8 === t || 9 === t && this.playerDom.setAttribute("video-status", "tips")))
					}
				}, {
					key: "showRegisterNum",
					value: function() {
						this._showInfo && (this._showInfo.license_num && (this.btn.license.innerHTML = this._showInfo.license_num),
						this._showInfo.tudou_register_num && (this.btn.register.innerHTML = this._showInfo.tudou_register_num))
					}
				}, {
					key: "showMidPlayBtn",
					value: function() {
						o.default.show(this.btn.midPlayBtn, "block")
					}
				}, {
					key: "hideMidPlayBtn",
					value: function() {
						o.default.hide(this.btn.midPlayBtn)
					}
				}, {
					key: "play",
					value: function() {
						this._player.isPause || this._player.mediaElement.paused ? this._player.play() : this._player.pause()
					}
				}, {
					key: "pause",
					value: function() {
						this._player.isPause || this._player.pause()
					}
				}, {
					key: "retry",
					value: function(t) {
						this.showLoading(),
							t && t.password ? this._player.reLoad(t.password) : this._player.reLoad()
					}
				}, {
					key: "replay",
					value: function() {
						this._player.replay()
					}
				}, {
					key: "onTrigger",
					value: function() {
						this.ifdashShow ? this.hideDash() : this.showDash()
					}
				}, {
					key: "onPlay",
					value: function() {
						this.ifadplay = !1,
							this.showDash();
						var t = this.btn.midPlayBtn.className;
						this.btn.midPlayBtn.className = t.replace(this.class.pause, this.class.play)
					}
				}, {
					key: "onPause",
					value: function() {
						console.log("controls onPause"),
							this.isLimitPause === !0 ? (this.togglePlayerStatus(9),
								this.showError("使用土豆App，看免费高清视频")) : this.ifAbort === !0 ? (this.togglePlayerStatus(9),
								this.showError("网络出问题了～", !0)) : this.showDash();
						var t = this.btn.midPlayBtn.className;
						this.btn.midPlayBtn.className = t.replace(this.class.play, this.class.pause),
						!this.isIOS10 && this.isIOS && this.showMidPlayBtn()
					}
				}, {
					key: "onTimeUpdate",
					value: function(t) {
						this.hideLoading();
						var e = this._config.limitPlay.ifLimitPlay ? this._config.limitPlay.ifLimitPlay : !1
							, i = 1e3 * parseInt(this._config.limitPlay.limitTime ? this._config.limitPlay.limitTime : 30);
						return (!this.lastTime || this._progress.isTouching) && (this.lastTime = t),
							1 == e && 1e3 * t > i ? (this.isLimitPause = !0,
								this.pause(),
								void 0) : (this.isLimitPause = !1,
							(0 === t || 1e3 * Math.abs(t - this.lastTime) >= 500) && (this.lastTime = t,
								this._progress.update(t)),
								void 0)
					}
				}, {
					key: "onEnded",
					value: function() {
						console.log("controls onEnded"),
							this.togglePlayerStatus(4)
					}
				}, {
					key: "onError",
					value: function(t) {
						if (this.togglePlayerStatus(9),
								this.isErrorVideo = !0,
								!t)
							return this.showError("加载出错了，点击重试", !0),
								void 0;
						var e = parseInt(t.code);
						-2001 === e || -2002 === e || -2004 === e || -2005 === e || -3001 === e || -3002 === e || -3006 === e || -3007 === e || -3008 === e ? this.showError("使用土豆App，看免费高清视频") : this.showError("视频出错啦!")
					}
				}, {
					key: "onAbort",
					value: function() {
						this.ifAbort = !0
					}
				}, {
					key: "showDash",
					value: function() {
						this._player.sendEventLog("xCd", "c"),
							this.togglePlayerStatus(1),
							this.ifdashShow = !0,
							this._progress.changeStatus(!this.ifdashShow),
							this.setTimeoutHideDash()
					}
				}, {
					key: "hideDash",
					value: function() {
						this.dashtimer && (clearTimeout(this.dashtimer),
							this.dashtimer = null),
						this._player.isPause || this._player.isEnd || this._progress.isTouching || (this._player.sendEventLog("xHd", "c"),
							this.ifdashShow = !1,
							this._progress.changeStatus(!this.ifdashShow),
							this.togglePlayerStatus(2))
					}
				}, {
					key: "setTimeoutHideDash",
					value: function() {
						var t = this;
						this.dashtimer && clearTimeout(this.dashtimer),
							this.dashtimer = setTimeout(function() {
								t.hideDash()
							}, 5e3)
					}
				}, {
					key: "showLoading",
					value: function() {
						this.ifdashShow && this.hideMidPlayBtn(),
							o.default.show(this.btn.loading, "flex")
					}
				}, {
					key: "hideLoading",
					value: function() {
						this.ifdashShow && this.showMidPlayBtn(),
							o.default.hide(this.btn.loading)
					}
				}, {
					key: "showRecord",
					value: function(t) {
						this.showDash(),
							this._progress.showRecode(t)
					}
				}, {
					key: "showSkipHead",
					value: function(t) {
						this.showDash(),
							this._progress.showSkiplog(t, "已经为您跳过片头")
					}
				}, {
					key: "showSkipTail",
					value: function(t) {
						this.showDash(),
							this._progress.showSkiplog(t, "已经为您跳过片尾")
					}
				}, {
					key: "playNext",
					value: function() {
						this._videoList = this._player.getVideoList(),
						this._videoList.next && this._player.changeByVid(this._videoList.next.encodevid)
					}
				}, {
					key: "showError",
					value: function(t, e) {
						this._noticePannel.showError(t, e)
					}
				}, {
					key: "changeHd",
					value: function() {
					}
				}, {
					key: "changeLanguage",
					value: function() {
					}
				}, {
					key: "switchFullscreen",
					value: function(t) {
						var e = t && t.method ? t.method : "c";
						if (this.ifFullScreen) {
							this._player.sendEventLog("exfs", e);
							var i = document.documentElement.clientWidth
								, n = 0;
							if (n = 0 === o.default.getScreenState() ? document.documentElement.clientHeight : 9 * i / 16,
									document.webkitCancelFullScreen)
								return this._changeFullState(),
									this.ifFullScreen = !1,
									this._player.exitFullscreen(),
									document.webkitCancelFullScreen(),
									void 0
						} else {
							if (this._player.launchFullscreen(),
									this._player.sendEventLog("xenfs", e),
								this.isIOS && 1 === o.default.getScreenState())
								return this.playerDom.webkitRequestFullScreen ? (this.ifFullScreen = !0,
									this.playerDom.webkitRequestFullScreen(),
									void 0) : (this._player.mediaElement.webkitSupportsFullscreen && this._player.mediaElement.readyState >= 1 && this._player.mediaElement.webkitEnterFullscreen(),
									void 0);
							if (document.documentElement.clientWidth,
									document.documentElement.clientHeight,
									this.playerDom.webkitRequestFullScreen)
								return this._changeFullState("enter"),
									this.ifFullScreen = !0,
									this.playerDom.webkitRequestFullScreen(),
									void 0;
							this._player.mediaElement.webkitSupportsFullscreen && this._player.mediaElement.readyState >= 1 && this._player.mediaElement.webkitEnterFullscreen()
						}
					}
				}, {
					key: "_changeFullState",
					value: function(t) {
						var e = this.btn.fullScreenBtn.className;
						this.btn.fullScreenBtn.className = "enter" === t ? e.replace(this.class.inScreen, this.class.outScreen) : e.replace(this.class.outScreen, this.class.inScreen)
					}
				}, {
					key: "seek",
					value: function(t, e) {
						this.showLoading(),
							this._player.seek(e)
					}
				}, {
					key: "onTouchProgress",
					value: function(t) {
						var e = t.st || 0;
						t.dt || 0,
							this._progress.update(e)
					}
				}, {
					key: "onTouchProgressEnd",
					value: function(t, e, i) {
						this._player.sendEventLog("xds", "d", i),
							this.setTimeoutHideDash(),
							this._player.seek(e)
					}
				}, {
					key: "onSeeking",
					value: function(t, e) {
						this._player.sendEventLog("xcs", "c"),
							this.seek(t, e)
					}
				}, {
					key: "initAd",
					value: function(t) {
						0 !== t.totalTime && this._adPannel.setAdInfo(t)
					}
				}, {
					key: "onAdPlay",
					value: function() {
						this.ifadplay || this.togglePlayerStatus(6),
							this.ifadplay = !0
					}
				}, {
					key: "onAdPause",
					value: function() {
						this.ifadplay = !1,
							this.togglePlayerStatus(7)
					}
				}, {
					key: "onAdTimeUpdate",
					value: function(t, e) {
						this.hideLoading(),
							this._adPannel.update(t, e)
					}
				}, {
					key: "onAdEnd",
					value: function() {
						this.ifadplay && (this.ifadplay = !1,
							this._adPannel.reset(),
							this.showDash())
					}
				}, {
					key: "onLoading",
					value: function() {
						this.showLoading()
					}
				}, {
					key: "onCanplay",
					value: function() {
						this.hideLoading()
					}
				}]),
					t
			}();
			e.default = _
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(3)
				, d = n(l)
				, u = function() {
				function t(e, i) {
					a(this, t),
						this.dom = e,
						this.minDom = i,
						this.btn = {
							curTimeBtn: o.default.get(".td-h5__player__console__time-play", this.dom)[0],
							totalTimeBtn: o.default.get(".td-h5__player__console__time-total", this.dom)[0],
							track: o.default.get(".td-h5__player__console__progress", this.dom)[0],
							loaded: o.default.get(".td-h5__player__console__progress__load", this.dom)[0],
							played: o.default.get(".td-h5__player__console__progress__play", this.dom)[0],
							seekBtn: o.default.get(".td-h5__player__console__progress__btn-seek", this.dom)[0],
							minLoaded: o.default.get(".td-h5__player__progress-mini__load", this.minDom)[0],
							minPlayed: o.default.get(".td-h5__player__progress-mini__play", this.minDom)[0]
						},
						this.e = {
							seek: this.seek.bind(this),
							touchstart: this.onTouchStart.bind(this),
							touchend: this.onTouchEnd.bind(this),
							touchmove: this.onTouchMove.bind(this)
						},
						this._emitter = new d.default
				}
				
				return r(t, [{
					key: "init",
					value: function(t, e, i) {
						console.log("progress.js init"),
							this.totalTime = t,
							this.currentTime = e,
							this.loadTime = i;
						var n = 100 * (e / t)
							, a = 100 * (i / t);
						this.btn.played.style.width = n + "%",
							this.btn.loaded.style.width = a + "%",
						this.btn.minLoaded && (this.btn.minPlayed.style.width = n + "%",
							this.btn.minLoaded.style.width = a + "%"),
							this.btn.totalTimeBtn.innerHTML = o.default.getTimeModel(t),
							this.btn.curTimeBtn.innerHTML = o.default.getTimeModel(e),
							this.changeTrackWidth(),
							this._bindEvent()
					}
				}, {
					key: "_bindEvent",
					value: function() {
						this.ifEvent || (this.ifEvent = !0,
							o.default.addEventListenerHander(this.btn.track, "touchend", this.e.seek),
							o.default.addEventListenerHander(this.btn.seekBtn, "touchstart", this.e.touchstart))
					}
				}, {
					key: "changeTrackWidth",
					value: function() {
						this._trackWidth = this.btn.track.offsetWidth,
							this._left = this.btn.track.offsetLeft
					}
				}, {
					key: "changeStatus",
					value: function(t) {
						this.hide = t
					}
				}, {
					key: "update",
					value: function(t, e) {
						if (t || 0 === t) {
							t = t > this.totalTime ? this.totalTime : t,
								this.currentTime = t;
							var i = t / this.totalTime;
							this.btn.played.style.width = 100 * i + "%",
							this.btn.minPlayed && (this.btn.minPlayed.style.width = 100 * (t / this.totalTime) + "%"),
								this.btn.curTimeBtn.innerHTML = o.default.getTimeModel(t)
						}
						e && (100 * (e / this.totalTime),
							this.btn.loaded.style.width = load_per + "%",
						this.btn.minLoaded && (this.btn.minLoaded.style.width = load_per + "%"))
					}
				}, {
					key: "seek",
					value: function(t) {
						var e = t.offsetX || t.changedTouches[0].clientX - this._left;
						console.log("x = " + e + "   e.changedTouches[0].clientX:" + t.changedTouches[0].clientX);
						var i = e / this.btn.track.offsetWidth
							, n = i * this.totalTime;
						0 > n && (n = 0),
						n === this.totalTime && (n = this.totalTime),
							this.update(n),
							this._emitter.emit("seeking", t, n)
					}
				}, {
					key: "onTouchStart",
					value: function(t) {
						if (!this.hide) {
							if (this.changeTrackWidth(),
								1 != t.targetTouches.length || this.isTouching)
								return !1;
							this.startX = t.targetTouches[0].clientX,
								t.preventDefault(),
								this.isTouching = !0,
								this.startTime = this.currentTime,
								o.default.addEventListenerHander(this.btn.seekBtn, "touchmove", this.e.touchmove),
								o.default.addEventListenerHander(this.btn.seekBtn, "touchend", this.e.touchend)
						}
					}
				}, {
					key: "onTouchMove",
					value: function(t) {
						if (!this.hide) {
							if (this.isTouching = !0,
								1 != t.targetTouches.length)
								return !1;
							t.preventDefault(),
								t.stopPropagation();
							var e = t.targetTouches[0].clientX - this.startX
								, i = e / this._trackWidth
								, n = this.startTime + i * this.totalTime
								, a = {
								st: n,
								dt: n - this.currentTime
							};
							return this._emitter.emit("touchprogress", a),
								this.currentTime = Math.min(Math.max(n, 0), this.totalTime),
								this.update(this.currentTime),
								!1
						}
					}
				}, {
					key: "onTouchEnd",
					value: function(t) {
						if (!this.hide) {
							if (this.isTouching = !1,
								t.changedTouches.length > 1)
								return !1;
							var e = {
								tb: parseInt(100 * this.startTime) / 100,
								to: parseInt(100 * this.currentTime) / 100
							};
							t.preventDefault(),
								t.stopPropagation(),
								Math.min(Math.max(this.currentTime, 0), this.totalTime - 5),
								this._emitter.emit("touchprogressend", t, this.currentTime, e),
								o.default.removeEventListenerHander(this.btn.seekBtn, "touchmove", this.e.touchmove),
								o.default.removeEventListenerHander(this.btn.seekBtn, "touchend", this.e.touchend)
						}
					}
				}]),
					t
			}();
			e.default = u
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			function r(t, e) {
				if (!t)
					throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !e || "object" != typeof e && "function" != typeof e ? t : e
			}
			
			function s(t, e) {
				if ("function" != typeof e && null !== e)
					throw new TypeError("Super expression must either be null or a function, not " + typeof e);
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				}),
				e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var o = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, l = i(18)
				, d = i(1);
			n(d);
			var u = i(13)
				, h = n(u)
				, c = function(t) {
				function e(t, i, n) {
					a(this, e);
					var s = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
					s.TAG = "H5PhonePlayer",
						s.playerCon = n,
						s.h5_firstFlag = !0,
						s.ad_firstFlag = !0;
					var o = {
						limitPlay: i.limitPlay
					};
					return s._control = new h.default(s.playerCon, s, o),
						s._control.onLoading(),
						s
				}
				
				return s(e, t),
					o(e, [{
						key: "upsDataReady",
						value: function() {
							var t = this.getVideoInfo();
							this._control.init(t)
						}
					}, {
						key: "upsDataError",
						value: function(t) {
							this._control.hideLoading(),
								this._control.onError(t)
						}
					}, {
						key: "upsDataFail",
						value: function(t) {
							this._control.hideLoading();
							var e = t && t.note ? t.note : "加载出错了，点击重试";
							this._control.showError(e, !0)
						}
					}, {
						key: "onPlay",
						value: function() {
							console.log("onPlay"),
								this._control.onPlay()
						}
					}, {
						key: "onPause",
						value: function() {
							console.log("onPause"),
								this._control.onPause()
						}
					}, {
						key: "onError",
						value: function(t) {
							this.sendEventLog("xve", "e"),
								this._control.onError(t)
						}
					}, {
						key: "onAbort",
						value: function() {
							console.log("onAbort")
						}
					}, {
						key: "onStalled",
						value: function() {
							this.isPause || (console.log("onStalled"),
								this._control.onLoading())
						}
					}, {
						key: "onSuspend",
						value: function() {
							this.isPause || (console.log("onSuspend loading"),
								this._control.onLoading())
						}
					}, {
						key: "onWaiting",
						value: function() {
							this._control.onLoading()
						}
					}, {
						key: "onCanplay",
						value: function() {
							this._control.onCanplay()
						}
					}, {
						key: "onTimeupdate",
						value: function(t, e) {
							this._control.onTimeUpdate(e)
						}
					}, {
						key: "onEnded",
						value: function(t) {
							this._control.onEnded(t),
							this.config.events && this.config.events.onPlayEnd && this.config.events.onPlayEnd()
						}
					}, {
						key: "onAdTimeUpdate",
						value: function(t, e, i, n) {
							this._control.onAdTimeUpdate(e, n)
						}
					}, {
						key: "onAdStartPlay",
						value: function(t, e) {
							this.ad_firstFlag && "front" === e && (this.ad_firstFlag = !1,
							this.config.events && this.config.events.onAdPlayStart && this.config.events.onAdPlayStart()),
								this._control.onAdPlay()
						}
					}, {
						key: "onAdPause",
						value: function() {
							this._control.onAdPause()
						}
					}, {
						key: "onAdEnd",
						value: function() {
							this._control.onAdEnd()
						}
					}, {
						key: "onAdError",
						value: function() {
						}
					}, {
						key: "adDataOk",
						value: function(t, e) {
							this._control.initAd(t, e)
						}
					}, {
						key: "adDataError",
						value: function() {
						}
					}, {
						key: "switchFullScreen",
						value: function() {
							this._control && this._control.switchFullScreen()
						}
					}]),
					e
			}(l.YoukuH5PlayerCore);
			e.default = c
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(4)
				, o = n(s)
				, l = i(1)
				, d = n(l)
				, u = i(3)
				, h = n(u)
				, c = i(2)
				, p = n(c)
				, f = i(8)
				, m = n(f)
				, _ = function() {
				function t(e) {
					a(this, t),
						this.TAG = "ADPlayer",
						this.config = e,
						this.supportType = e.supportType || "mp4",
						this.addata = null,
						this.curNum = 0,
						this.remainTime = 0,
						this.currentTime = 0,
						this._pastTime = 0,
						this._firstTag = !0,
						this._isEnd = !0,
						this.posiTime = 0,
						this.e = {
							onPlay: this._onPlay.bind(this),
							onEnd: this._onEnd.bind(this),
							onUnitEnd: this._onUnitEnd.bind(this),
							onPause: this._onPause.bind(this),
							onTimeupdate: this._onTimeupdate.bind(this),
							onUnitTimeUpdate: this._onUnitTimeUpdate.bind(this),
							onCanPlay: this._onCanPlay.bind(this),
							onStalled: this._onStalled.bind(this),
							onError: this._onError.bind(this),
							onProgress: this._onProgress.bind(this)
						},
						this.tryNum = 1,
						this._emitter = new h.default,
						this._mediaElement = null,
						this._timer = null,
						this._adreport = new m.default
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this.addata = null,
							this.curNum = 0,
							this.remainTime = 0,
							this.currentTime = 0,
							this._pastTime = 0,
							this._firstTag = !0,
							this._isEnd = !0,
						this._timer && (clearInterval(this._timer),
							this._timer = null)
					}
				}, {
					key: "attachMediaElement",
					value: function(t) {
						this._mediaElement = t,
							this._mediaElement.poster = "",
							d.default.addEventListenerHander(this._mediaElement, "play", this.e.onPlay),
							"m3u8" === this.supportType ? (d.default.addEventListenerHander(this._mediaElement, "timeupdate", this.e.onUnitTimeUpdate),
								d.default.addEventListenerHander(this._mediaElement, "ended", this.e.onUnitEnd)) : (d.default.addEventListenerHander(this._mediaElement, "ended", this.e.onEnd),
								d.default.addEventListenerHander(this._mediaElement, "timeupdate", this.e.onTimeupdate)),
							d.default.addEventListenerHander(this._mediaElement, "canplay", this.e.onCanPlay),
							d.default.addEventListenerHander(this._mediaElement, "stalled", this.e.onStalled),
							d.default.addEventListenerHander(this._mediaElement, "error", this.e.onError),
							d.default.addEventListenerHander(this._mediaElement, "progress", this.e.onProgress),
							d.default.addEventListenerHander(this._mediaElement, "pause", this.e.onPause)
					}
				}, {
					key: "dettachMediaElement",
					value: function() {
						return this._mediaElement ? (this._mediaElement.removeEventListener("timeupdate", this.e.onTimeupdate),
							this._mediaElement.removeEventListener("ended", this.e.onEnd),
							d.default.removeEventListenerHander(this._mediaElement, "play", this.e.onPlay),
							d.default.removeEventListenerHander(this._mediaElement, "ended", this.e.onEnd),
							d.default.removeEventListenerHander(this._mediaElement, "timeupdate", this.e.onTimeupdate),
							d.default.removeEventListenerHander(this._mediaElement, "canplay", this.e.onCanPlay),
							d.default.removeEventListenerHander(this._mediaElement, "stalled", this.e.onStalled),
							d.default.removeEventListenerHander(this._mediaElement, "error", this.e.onError),
							d.default.removeEventListenerHander(this._mediaElement, "progress", this.e.onProgress),
							d.default.removeEventListenerHander(this._mediaElement, "pause", this.e.onPause),
							"m3u8" === this.supportType ? (this._mediaElement.pause(),
								void 0) : (this._mediaElement && (this._mediaElement.src = "",
								this._mediaElement.removeAttribute("src"),
								this._mediaElement = null),
								void 0)) : void 0
					}
				}, {
					key: "on",
					value: function(t, e) {
						this._emitter.addListener(t, e)
					}
				}, {
					key: "off",
					value: function(t, e) {
						this._emitter.removeListener(t, e)
					}
				}, {
					key: "setAdData",
					value: function(t, e) {
						p.default.i(this.TAG, "setAdData:"),
							this.addata = t,
							this._adreport.setData(t),
							this.remainTime = this.addata.totalTime,
							this.m3u8url = e,
							this.load()
					}
				}, {
					key: "startTimer",
					value: function() {
						if (!this._timer) {
							var t = this;
							this._lastTime = 0,
								this._timer = setInterval(function() {
									return t._isEnd ? (clearInterval(t._timer),
										void 0) : (t._lastTime === t._mediaElement.currentTime && (p.default.i(t.TAG, "stall try again"),
										this._mediaElement.load(),
										this._mediaElement.play()),
										t._lastTime = t._mediaElement.currentTime,
										void 0)
								}, 3e3)
						}
					}
				}, {
					key: "load",
					value: function() {
						if (p.default.i(this.TAG, "load"),
								!this._mediaElement)
							throw new IllegalStateException("HTMLMediaElement must be attached before load()!");
						if (!this.addata)
							throw new IllegalStateException("adPlayer must be set adData and adtype");
						var t = this.addata.VAL.length;
						return 0 === t ? (p.default.d(this.TAG, "the length of addata is 0"),
							this.destroy(),
							void 0) : (this.currentTime = 0,
							this._pastTime = 0,
							this.curNum = 0,
							this._isEnd = !1,
							"m3u8" === this.supportType ? (this.src = this.m3u8url,
								this.posiTime = this._mediaElement.currentTime || 0) : this.src = this.addata.VAL[this.curNum].RS,
						this._mediaElement.readyState > 0 && (this._mediaElement.currentTime = 0),
							void 0)
					}
				}, {
					key: "play",
					value: function() {
						if (p.default.i(this.TAG, "this._mediaElement.paused:" + this._mediaElement.paused + " this._isEnd:" + this._isEnd + " this._firstTag:" + this._firstTag),
								!this._isEnd) {
							if (!this._mediaElement)
								return p.default.e("please attachMediaElement for adPlayer"),
									void 0;
							if (this._firstTag) {
								("m3u8" !== this.supportType || "m3u8" === this.supportType && "" === this._mediaElement.src) && (this._mediaElement.src = this.src),
									this._mediaElement.style.display = "block",
									this._mediaElement.play();
								var t = 0
									, e = this;
								this._mediaElement.addEventListener("canplay", function() {
									1 !== t && (t = 1,
										p.default.i(e.TAG, "canplay time=" + e.currentTime),
										this.play())
								})
							}
							this._mediaElement.paused && this._mediaElement.play()
						}
					}
				}, {
					key: "setSrc",
					value: function() {
						("m3u8" !== this.supportType || "m3u8" === this.supportType && "" === this._mediaElement.src) && (this._mediaElement.src = this.src)
					}
				}, {
					key: "pause",
					value: function() {
						return this._isEnd ? void 0 : this._mediaElement ? (this._mediaElement.pause(),
							void 0) : (p.default.e("please attachMediaElement for adPlayer"),
							void 0)
					}
				}, {
					key: "skip",
					value: function(t) {
						if (!(this._isEnd || 0 > t || 0 !== t && !t))
							if (t < this.addata.VAL.length - 1) {
								this.curNum = t + 1,
									this._pastTime = 0;
								for (var e = 0; e < this.curNum; e++)
									this._pastTime += this.addata.VAL[e].AL;
								if (this.currentTime = this._pastTime,
									"m3u8" === this.supportType)
									this._seek(this._pastTime);
								else {
									this._mediaElement.src = this.addata.VAL[this.curNum].RS,
										this._mediaElement.play();
									var i = !1
										, n = this;
									d.default.addEventListenerHander(this._mediaElement, "canplay", function() {
										i || (n._mediaElement.play(),
											i = !0)
									})
								}
							} else
								this.curNum = this.addata.VAL.length - 1,
								"m3u8" === this.supportType && this._seek(this.addata.totalTime),
									this._pastTime += this.addata.VAL[this.curNum].AL,
									this.currentTime = this.addata.totalTime,
									"m3u8" === this.supportType ? this._onUnitTimeUpdate(null) : (this._mediaElement.pause(),
										this._ifEmitPause = !0,
										this._emitter.emit(o.default.AD_TIMEUPDATE, null, this.currentTime, this.curNum),
										this._onEnd(null))
					}
				}, {
					key: "_seek",
					value: function(t) {
						if (Math.abs(this._mediaElement.currentTime - t) < 1)
							return !1;
						try {
							this._mediaElement.currentTime = t
						} catch (e) {
							var i = !1
								, n = this;
							d.default.addEventListenerHander(this._mediaElement, "canplay", function() {
								i || (i = !0,
									n._mediaElement.currentTime = t)
							})
						}
						this._mediaElement.play()
					}
				}, {
					key: "_onEnd",
					value: function(t) {
						this._isEnd || (p.default.i(this.TAG, "_adEnd:||this.curNum:" + this.curNum + "this.currentTime:" + this.currentTime),
							this._pastTime += this.addata.VAL[this.curNum].AL,
							this._adreport.sendSUE(this.curNum),
							this.curNum++,
							this.curNum < this.addata.VAL.length ? (this._adreport.sendSUS(this.curNum),
								this._adreport.changeNum(this.curNum),
								this._mediaElement.pause(),
								this._ifEmitPause = !0,
								this._mediaElement.src = this.addata.VAL[this.curNum].RS,
								this._mediaElement.play()) : (p.default.i(this.TAG, "_adEnd:||this._isEnd:" + this._isEnd),
							this._isEnd || (this._isEnd = !0,
								this.destroy(),
								this._emitter.emit(o.default.AD_END, t))))
					}
				}, {
					key: "_onUnitEnd",
					value: function(t) {
						this._isEnd || (p.default.i(this.TAG, "_onUnitEnd:||this._isEnd:" + this._isEnd + "   this._mediaElement.currentTime:" + this._mediaElement.currentTime),
							this._isEnd = !0,
							this._mediaElement.pause(),
							this._ifEmitPause = !0,
							this.destroy(),
							this._emitter.emit(o.default.AD_END, t, this._mediaElement.currentTime))
					}
				}, {
					key: "_onTimeupdate",
					value: function(t) {
						if (!this._isEnd && this._mediaElement) {
							var e = this._mediaElement.currentTime;
							this.currentTime = this._pastTime + e,
								this.remainTime = this.addata.totalTime - this.currentTime,
								this._emitter.emit(o.default.AD_TIMEUPDATE, t, this.currentTime, this.curNum)
						}
					}
				}, {
					key: "_onUnitTimeUpdate",
					value: function(t) {
						this._isEnd || this._mediaElement && (this.currentTime = this._mediaElement.currentTime,
							this.currentTime >= this.addata.totalTime ? (this._adreport.sendSUE(this.curNum),
								this._onUnitEnd(t)) : (this.currentTime > this._pastTime + this.addata.VAL[this.curNum].AL && (this._pastTime += this.addata.VAL[this.curNum].AL,
								this._adreport.sendSUE(this.curNum),
								this.curNum++,
								this._adreport.sendSUS(this.curNum),
								this._adreport.changeNum(this.curNum)),
								this._emitter.emit(o.default.AD_TIMEUPDATE, t, this.currentTime, this.curNum)))
					}
				}, {
					key: "_onPlay",
					value: function(t) {
						this._isEnd || (this._firstTag && this._adreport.sendSUS(this.curNum),
							this._firstTag = !1,
							this._emitter.emit(o.default.AD_PLAY, t))
					}
				}, {
					key: "_onPause",
					value: function(t) {
						return this._isEnd ? (p.default.d(this.TAG, "_onPause:" + this._ifEmitPause),
							this._ifEmitPause = !1,
							void 0) : (p.default.i(this.TAG, "_onPause::this._isEnd:" + this._isEnd),
							this._emitter.emit(o.default.AD_PAUSE, t),
							void 0)
					}
				}, {
					key: "_onError",
					value: function(t) {
						if (!this._isEnd) {
							if ("m3u8" === this.supportType)
								return this.tryNum > 0 ? (this.tryNum--,
									this._mediaElement.src = this.m3u8url,
									this._mediaElement.currentTime = this.currentTime,
									this._mediaElement.play()) : (this._isEnd = !0,
									this._emitter.emit(o.default.AD_ERROR, t)),
									void 0;
							if (this.curNum < this.addata.VAL.length - 1)
								return this.skip(this.curNum),
									void 0;
							this._isEnd = !0,
								this._emitter.emit(o.default.AD_ERROR, t)
						}
					}
				}, {
					key: "_onCanPlay",
					value: function(t) {
						p.default.i(this.TAG, "_onCanPlay"),
						this._isEnd || this._emitter.emit(o.default.AD_CANPLAY, t)
					}
				}, {
					key: "_onProgress",
					value: function() {
					}
				}, {
					key: "_onStalled",
					value: function() {
					}
				}, {
					key: "_onSeeking",
					value: function() {
					}
				}]),
					t
			}();
			e.default = _
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(7)
				, o = i(1)
				, l = n(o)
				, d = i(2)
				, u = n(d)
				, h = i(16)
				, c = n(h)
				, p = i(3)
				, f = n(p)
				, m = i(4)
				, _ = n(m)
				, v = function() {
				function t(e, i, n) {
					a(this, t),
						this.TAG = "ADplugin",
						this.param = {},
						this.adpoint = [],
						this.param.aw = "w",
						this.param.vs = "1.0",
						this.param.pver = "1",
						this.param.tict = 0,
						this.param.vr = 0,
						this.param.wintype = "xplayer_m3u8",
					(n || i) && this.init(n, i),
						this.param.site = location.origin.indexOf("tudou.com") > -1 || "0505" === this.ccode ? "-1" : "1",
						this._mediaElement = e,
						this.status = 0,
						this.contentNum = 0,
						this.netflag = !1,
						this.startplay = !1,
						this.content_addata = null,
						this.stand_addata = null,
						this.front_addata = null,
						this.end_addata = null,
						this.frontAdTime = 0,
						this.endAdTime = 0,
						this.addata = null,
						this._vtvc = [],
						this._defaultData = {
							VAL: []
						},
						this.e = {
							adPlayError: this._adError.bind(this),
							adPlay: this._adPlay.bind(this),
							adTimeUpdate: this._adtimeUpdate.bind(this),
							adPlayEnd: this._adplayEnd.bind(this),
							adPlayPause: this._adplayPause.bind(this),
							adCanPlay: this._adcanplay.bind(this),
							adPlayLoading: this._adplayLoading.bind(this),
							adReady: this._adReady.bind(this)
						},
						this._emitter = new f.default,
						this._adplayer = new c.default({
							supportType: this.supportType
						}),
						this._adplayer.attachMediaElement(this._mediaElement),
						this._addAdplayerEmit()
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this.adpoint = [],
							this.status = 0,
							this.contentNum = 0,
							this.netflag = !1,
							this.startplay = !1,
							this.content_addata = null,
							this.stand_addata = null,
							this.front_addata = null,
							this.end_addata = null,
							this.frontAdTime = 0,
							this.endAdTime = 0,
							this.addata = null,
							this.unitedAd = !1,
							this._adplayer.destroy()
					}
				}, {
					key: "_reset",
					value: function() {
						this.status = 0,
							this.startplay = !1,
							this.adType = "",
							this.netflag = !1,
							this.addata = null,
							this._ispause = !1
					}
				}, {
					key: "init",
					value: function(t, e) {
						if (e) {
							if (e.m3u8_url && (this.m3u8url = e.m3u8_url),
								e.supportType && (this.supportType = e.supportType),
								e.ccode && (this.ccode = e.ccode),
									e.param)
								for (var i in e.param)
									this.param[i] = e.param[i];
							if (e.adConfig)
								for (var n in e.adConfig)
									this.param[n] = e.adConfig[n]
						}
						if (t) {
							this.videoId = t.encodeId,
								this.param.isvert = l.default.getScreenState(),
								this.param.wintype = "xplayer_m3u8",
								this.param.vl = t.trial ? parseInt(t.trial.time) - 1 : parseInt(t.video.seconds),
								this.param.ct = t.video.category_letter_id,
								this.param.sid = t.ups.psid;
							for (var a = t.video.subcategories || [], r = [], s = 0, o = a.length; o > s; s++)
								r.push(a[s].id);
							this.param.cs = r.join("|");
							var d = t.video.type.join(",");
							this.param.paid = d.indexOf("fee") > -1 || d.indexOf("channel_vip") > -1 || t.fee || t.show && t.show.pay ? 1 : 0,
								this.param.s = t.show ? t.show.id : 0,
								this.param.v = t.videoId,
								this.param.vip = t.user && t.user.vip ? 1 : 0;
							var u = t.video.tags || [];
							this.param.k = encodeURIComponent(u.join("|")),
								this.param.u = t.video.userid || "",
								this.param.td = t.video.source ? t.video.source : 0,
								this.param.ti = encodeURIComponent(t.video.title),
								this.param.vr = 0,
							t.trial && (this.param.tt = t.trial.type);
							var h = t.dvd && t.dvd.point || [];
							this._setAdPoint(h),
								"m3u8" === this.supportType ? (this.requestFrontAd(),
									this.requestEndAd()) : this.requestFrontAd()
						}
					}
				}, {
					key: "_removeAdplayerEmit",
					value: function() {
						this._adplayer.off(_.default.AD_PLAY, this.e.adPlay),
							this._adplayer.off(_.default.AD_PAUSE, this.e.adPlayPause),
							this._adplayer.off(_.default.AD_END, this.e.adPlayEnd),
							this._adplayer.off(_.default.AD_TIMEUPDATE, this.e.adTimeUpdate),
							this._adplayer.off(_.default.AD_ERROR, this.e.adPlayError),
							this._adplayer.off(_.default.AD_CANPLAY, this.e.adCanPlay),
							this._adplayer.off(_.default.AD_LOADING, this.e.adPlayLoading)
					}
				}, {
					key: "_addAdplayerEmit",
					value: function() {
						this._adplayer.on(_.default.AD_PLAY, this.e.adPlay),
							this._adplayer.on(_.default.AD_PAUSE, this.e.adPlayPause),
							this._adplayer.on(_.default.AD_END, this.e.adPlayEnd),
							this._adplayer.on(_.default.AD_TIMEUPDATE, this.e.adTimeUpdate),
							this._adplayer.on(_.default.AD_ERROR, this.e.adPlayError),
							this._adplayer.on(_.default.AD_CANPLAY, this.e.adCanPlay),
							this._adplayer.on(_.default.AD_LOADING, this.e.adPlayLoading)
					}
				}, {
					key: "on",
					value: function(t, e) {
						this._emitter.addListener(t, e)
					}
				}, {
					key: "off",
					value: function(t, e) {
						this._emitter.removeListener(t, e)
					}
				}, {
					key: "play",
					value: function() {
						if (u.default.i(this.TAG, "play|||this.startplay:" + this.startplay),
								!this.addata)
							return this._adplayEnd(null),
								void 0;
						if (this.startplay)
							this._adplayer.play();
						else {
							if (0 === this.addata.VAL.length)
								return u.default.d(this.TAG, "play|||this.addata.VAL.length:" + this.addata.VAL.length),
									this._adplayEnd(null),
									void 0;
							this.ifReady || this._initAdPlayer(this.addata),
								this.loadVTVC(this.addata.vtvc),
								u.default.i(this.TAG, "play|||this._adplayer:"),
								this._adplayer.play()
						}
						this._ispause = !1
					}
				}, {
					key: "autoPlay",
					value: function() {
						return l.default.show(this._mediaElement),
							0 === this.addata.VAL.length ? (u.default.d(this.TAG, "play|||this.addata.VAL.length:" + this.addata.VAL.length),
								this._adplayEnd(null),
								void 0) : (this._adplayer.setSrc(),
								void 0)
					}
				}, {
					key: "pause",
					value: function() {
						this.addata && this.startplay && (this._adplayer.pause(),
							this._ispause = !0)
					}
				}, {
					key: "skip",
					value: function(t) {
						this._adplayer.skip(t)
					}
				}, {
					key: "ifPlayAd",
					value: function(t) {
						if (0 === this._midpoints.length)
							return !1;
						if (this.contentNum < this._midpoints.length) {
							var e = parseInt(this._midpoints[this.contentNum].start) / 1e3;
							if (5 >= e - t && !this.netflag && !this.content_addata)
								return this.requestContentAd(),
									!1;
							if (t >= e)
								return !0
						}
						return !1
					}
				}, {
					key: "_initAdPlayer",
					value: function() {
						return this.ifReady = !0,
							0 === this.addata.VAL.length ? (this._adReady(null),
								void 0) : (this._adplayer.setAdData(this.addata, this.m3u8url),
								this._adReady(null),
								void 0)
					}
				}, {
					key: "_setAdPoint",
					value: function(t) {
						for (var e = [], i = 0, n = 0, a = 0, r = t.length; r > a; a++)
							("standard" === t[a].ctype || "contentad" === t[a].ctype) && (t[a].num = "standard" === t[a].ctype ? i++ : n++,
								e.push(t[a]));
						this._midpoints = e
					}
				}, {
					key: "_isNeedAd",
					value: function() {
						return !0
					}
				}, {
					key: "_splitVTVC",
					value: function(t) {
						var e = 0
							, i = (t.VAL || [],
							[])
							, n = []
							, a = []
							, r = {};
						for (var s in t)
							"VAL" != s && (r[s] = t[s]);
						r.VAL = [];
						for (var o = t.VAL, l = 0; l < o.length; l++)
							2 !== parseInt(o[l].VT) ? null != o[l].RS && "" != o[l].RS.trim() && null != o[l].VID && null != o[l].VQT && (r.VAL.push(o[l]),
								a.push(o[l].RS),
								n.push(parseInt(o[l].AL)),
								e += o[l].AL) : (o[l].pos_ = l - 1 - i.length,
								i.push(o[l]));
						return r.urls = a,
							r.seconds = n,
							r.vtvc = i,
							r.totalTime = e,
							r
					}
				}, {
					key: "buildM3u8",
					value: function(t, e) {
						t && (this.m3u8url = t);
						var i = this.front_addata && this.front_addata.VAL && !e ? this.front_addata.VAL : []
							, n = this.end_addata && this.end_addata.VAL ? this.end_addata.VAL : [];
						if (0 === i.length && 0 === n.length)
							return this.m3u8url;
						var a = this.m3u8url.split("?")
							, r = a[0];
						a = a[1].split("&");
						for (var s = 0, o = -1, d = "", u = "", h = 0; h < a.length; h++) {
							var c = a[h].split("=");
							c.length > 0 && "vid" === c[0] && (s = h,
								u = c[1]),
							c.length > 0 && "type" === c[0] && (d = c[1],
								o = h)
						}
						d || (d = "mp4");
						for (var p = [], f = 0, m = i.length, _ = 0; m > _; _++) {
							var v = i[_];
							v.RS;
							var g = v.VID
								, y = v.VQT;
							p["a" + (_ + 1)] = g + "_" + y
						}
						f = i.length + 1,
							p.v = this.videoId + "_" + d;
						for (var E = n.length, T = 0; E > T; T++) {
							var A = n[T];
							A.RS;
							var b = A.VID
								, P = A.VQT;
							p["a" + (f + T)] = b + "_" + P
						}
						return a[s] = "ids=" + encodeURIComponent(l.default.toJSON(p)),
							a[o] = "",
							this.m3u8url = r + "?" + a.join("&"),
							this.m3u8url
					}
				}, {
					key: "parseFrontAd",
					value: function(t) {
						if (!this.front_addata) {
							if (u.default.i(this.TAG, "parseFrontAd"),
									this.adType = s.AD_MAP.FRONT,
									this.addata = this.front_addata,
									this.front_addata = this._splitVTVC(t),
									this.frontAdTime = this.front_addata.totalTime,
									this.netflag = !1,
									this._emitter.emit(_.default.AD_DATA_OK, this.front_addata, this.adType),
								"m3u8" === this.supportType)
								return this.parseUnited(),
									void 0;
							this.addata = this.front_addata,
								this._initAdPlayer()
						}
					}
				}, {
					key: "parseEndAd",
					value: function(t) {
						return u.default.i(this.TAG, "parseEndAd"),
							this.netflag = !1,
							this.adType = s.AD_MAP.END,
							this.end_addata = this._splitVTVC(t),
							"m3u8" === this.supportType ? (this.parseUnited(),
								void 0) : (this.addata = this.end_addata,
								this._emitter.emit(_.default.AD_DATA_OK, this.end_addata, this.adType),
								this._initAdPlayer(this.addata),
								u.default.i(this.TAG, "parseEndAd(data)"),
								this.play(),
								void 0)
					}
				}, {
					key: "parseContentAd",
					value: function(t) {
						this.netflag = !1,
							this.content_addata = this._splitVTVC(t),
							this._emitter.emit(_.default.AD_DATA_OK, this.content_addata, this.adType),
							this.addata = this.content_addata
					}
				}, {
					key: "parsePauseAd",
					value: function(t) {
						u.default.i(this.TAG, "parsePauseAd"),
							this._emitter.emit(_.default.AD_DATA_OK, t, s.AD_MAP.PAUSE)
					}
				}, {
					key: "parseUnited",
					value: function() {
						this.unitedAd || this.front_addata && this.end_addata && (this.unitedAd = !0,
							u.default.i(this.TAG, "parseUnited"),
							this.endAdTime = this.end_addata.totalTime,
							this.m3u8url = this.buildM3u8(this.m3u8url, !1),
							this.addata = this.front_addata,
							this.adType = s.AD_MAP.FRONT,
							this._initAdPlayer(this.addata))
					}
				}, {
					key: "adDataTimeout",
					value: function(t) {
						u.default.i(this.TAG, "adDataTimeout:" + t),
							t === s.AD_MAP.FRONT ? this.parseFrontAd(this._defaultData) : t === s.AD_MAP.END && this.parseEndAd(this._defaultData),
							this._emitter.emit(_.default.AD_DATA_ERROR, this.adType)
					}
				}, {
					key: "adDataError",
					value: function(t) {
						u.default.e(this.TAG, "fronOutAdError:" + t),
							t === s.AD_MAP.FRONT ? this.parseFrontAd(this._defaultData) : t === s.AD_MAP.END && this.parseEndAd(this._defaultData),
							this._emitter.emit(_.default.AD_DATA_ERROR, this.adType)
					}
				}, {
					key: "changeParam",
					value: function(t) {
						for (var e in t)
							this.param[e] = t[e]
					}
				}, {
					key: "requestFrontAd",
					value: function(t) {
						var e = this;
						u.default.i(this.TAG, "requestFrontAd：ifPlay：" + t),
							this.adType = s.AD_MAP.FRONT;
						var i = {};
						i.p = 7;
						var n = l.default.protocol + s.YoukuAdApiM.FRONT_AD_API + "?" + l.default.urlParameter(this.param) + "&" + l.default.urlParameter(i);
						this.netflag = !0,
							l.default.getJsonp(n, function(i) {
								e.parseFrontAd(i, t)
							}, function() {
								e.adDataError(s.AD_MAP.FRONT)
							}, function() {
								e.adDataTimeout(s.AD_MAP.FRONT)
							})
					}
				}, {
					key: "requestContentAd",
					value: function(t) {
						var e = this;
						u.default.i(this.TAG, "requestContentAd");
						var i = {};
						i.p = 8,
							i.ps = this._midpoints[this.contentNum],
							this._midpoints[this.contentNum],
							i.pt = this._midpoints[this.contentNum].start / 1e3;
						var n = l.default.protocol + s.YoukuAdApiM.CONTENT_AD_API + "?" + l.default.urlParameter(this.param) + "&" + l.default.urlParameter(i);
						this.netflag = !0,
							l.default.getJsonp(n, function(i) {
								e.parseContentAd(i, t)
							}, function() {
								e.adDataError(s.AD_MAP.CONT)
							}, function() {
								e.adDataTimeout(s.AD_MAP.CONT)
							})
					}
				}, {
					key: "requestStandardAd",
					value: function() {
						var t = {};
						t.p = 9
					}
				}, {
					key: "requestEndAd",
					value: function(t) {
						var e = this;
						u.default.i(this.TAG, "requestEndAd:ifPlay" + t);
						var i = {};
						i.p = 9,
							i.ctu = 1;
						var n = l.default.protocol + s.YoukuAdApiM.END_AD_API + "?" + l.default.urlParameter(this.param) + "&" + l.default.urlParameter(i);
						this.netflag = !0,
							l.default.getJsonp(n, function(i) {
								e.parseEndAd(i, t)
							}, function() {
								e.adDataError(s.AD_MAP.END)
							}, function() {
								e.adDataTimeout(s.AD_MAP.END)
							})
					}
				}, {
					key: "requestPauseAd",
					value: function() {
						var t = this;
						u.default.i(this.TAG + " requestPauseAd");
						var e = {
								p: 10
							}
							,
							i = "" + l.default.protocol + s.YoukuAdApiM.PAUSE_AD_API + "?" + l.default.urlParameter(this.param) + "&" + l.default.urlParameter(e);
						l.default.getJsonp(i, function(e) {
							t.parsePauseAd(e)
						}, function() {
							t.adDataError(s.AD_MAP.PAUSE)
						}, function() {
							t.adDataTimeout(s.AD_MAP.PAUSE)
						})
					}
				}, {
					key: "loadVTVC",
					value: function(t) {
						if (t)
							for (var e = 0; e < t.length; e++)
								l.default.loadfile(t[e].VC, "js")
					}
				}, {
					key: "sendCUM",
					value: function() {
						this._adplayer._adreport && this._adplayer._adreport.sendCUM()
					}
				}, {
					key: "playFrontAD",
					value: function() {
						u.default.i(this.TAG, "playFrontAD():"),
							this.adType = s.AD_MAP.FRONT,
							this.front_addata ? (this.addata = this.front_addata,
								this._initAdPlayer(this.addata),
								this.play()) : "m3u8" === this.supportType ? (this.requestFrontAd(),
								this.requestEndAd()) : this.requestFrontAd(!0)
					}
				}, {
					key: "playEndAD",
					value: function() {
						this.adType = s.AD_MAP.END,
							"m3u8" === this.supportType ? (this.addata = this.end_addata,
								this._emitter.emit(_.default.AD_DATA_OK, this.end_addata, this.adType),
								this._initAdPlayer(this.addata, !0),
								this.play()) : this.requestEndAd(!0)
					}
				}, {
					key: "playContentAd",
					value: function() {
						this.adType = s.AD_MAP.CONT
					}
				}, {
					key: "_adReady",
					value: function(t) {
						u.default.i(this.TAG, "_adReady|adtype:" + this.adType),
							this._emitter.emit(_.default.AD_READY, t, this.adType)
					}
				}, {
					key: "_adError",
					value: function(t) {
						u.default.i(this.TAG, "_adError|adtype"),
							this._emitter.emit(_.default.AD_ERROR, t, this.adType)
					}
				}, {
					key: "_adPlay",
					value: function(t) {
						this.startplay = !0,
							u.default.i(this.TAG, "_adPlay|adtype" + this.adType),
							this._emitter.emit(_.default.AD_PLAY, t, this.adType)
					}
				}, {
					key: "_adtimeUpdate",
					value: function(t, e, i) {
						this._currentTime = e,
							this._emitter.emit(_.default.AD_TIMEUPDATE, t, e, this.adType, i)
					}
				}, {
					key: "_adplayEnd",
					value: function(t, e) {
						u.default.i(this.TAG, "_adplayEnd|adtype|" + this.adType),
							this.startplay = !1,
						(this.adType === s.AD_MAP.CONT || this.adType === s.AD_MAP.STA) && this.contentNum++,
						this.adType === s.AD_MAP.FRONT && (this.frontAdTime = e ? e : this.frontAdTime,
							u.default.i(this.TAG, "_adplayEnd(e):this..frontAdTime" + this.frontAdTime)),
							this.addata = null,
							this._emitter.emit(_.default.AD_END, t, this.adType),
							this._reset()
					}
				}, {
					key: "_adplayPause",
					value: function(t) {
						u.default.i(this.TAG, "_adplayPause|adtype" + this.adType),
							this._emitter.emit(_.default.AD_PAUSE, t, this.adType)
					}
				}, {
					key: "_adplayLoading",
					value: function(t) {
						u.default.i(this.TAG, "_adplayLoading|adtype" + this.adType),
							this._emitter.emit(_.default.AD_LOADING, t, this.adType)
					}
				}, {
					key: "_adcanplay",
					value: function(t) {
						u.default.i(this.TAG, "_adcanplay|adtype" + this.adType),
							this._emitter.emit(_.default.AD_CANPLAY, t, this.adType)
					}
				}]),
					t
			}();
			e.default = v
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			}),
				e.EventEmitter = e.util = e.Log = e.Browser = e.YoukuH5PlayerCore = void 0;
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(21)
				, o = n(s)
				, l = i(10)
				, d = n(l)
				, u = i(2)
				, h = n(u)
				, c = i(1)
				, p = n(c)
				, f = i(26);
			n(f);
			var m = i(22)
				, _ = n(m)
				, v = i(17)
				, g = n(v)
				, y = i(20)
				, E = n(y)
				, T = i(19)
				, A = n(T)
				, b = i(9)
				, P = i(4)
				, k = n(P)
				, S = i(7)
				, w = i(3)
				, I = n(w)
				, D = i(6)
				, L = i(24)
				, O = n(L)
				, x = i(5)
				, C = i(8)
				, N = n(C)
				, R = function() {
				function t(e, i) {
					if (a(this, t),
							this.TAG = "YoukuH5PlayerCore",
						!e || !i.videoId)
						return console.error("the param is error,please check!!!"),
							void 0;
					if ("string" == typeof e && p.default.getById(e))
						this.containerId = e,
							this.container = p.default.getById(e),
							this.mediaElementId = "xplayer_" + e;
					else if (e instanceof HTMLElement) {
						this.container = e;
						var n = (new Date).getTime() + "";
						this.mediaElementId = "xplayer" + n
					} else
						h.default.e("the value of container id error,please check!!!");
					this.config = i,
					this.config.ccode || (this.config.ccode = "0501"),
					this.config.client_id || (this.config.client_id = "youkumobileplaypage"),
						this.control = this.config.control ? this.config.control : {},
						this.supportType = this._getSupportType(),
						this.winType = this.config.winType ? this.config.winType : d.default.isMobile ? "xplayer_m3u8" : "xplayer_h5",
						this.isThirdParty = this._isThirdParty(),
					this.control.lang || (this.control.lang = "guoyu"),
					this.control.hd || (this.control.hd = "mp4hd"),
						this.error = !1,
						this._firstTag = !0,
						this._isAdPlaying = !1,
						this.currentTime = 0,
						this._frontAd = !1,
						this._replay = !1,
						this.isPause = !0,
						this.cna = p.default.getCna();
					var r = {};
					if (r.vid = i.videoId,
							r.ccode = i.ccode,
							r.client_ip = "0.0.0.0",
							this.config.param)
						for (var s in this.config.param) {
							if (!this.config.param[s])
								return;
							r[s] = this.config.param[s]
						}
					r.client_ts = parseInt((new Date).getTime() / 1e3),
						r.utid = this.cna;
					var l = null;
					this.isThirdParty && (l = {},
					this.config.password && (this.custumPassword = this.config.password,
						l.password = this.config.password),
						l.client_id = this.config.client_id,
						l.video_id = this.config.videoId,
						l.embsig = this.config.embsig,
						l.refer = encodeURIComponent(window.location.href)),
						this._upsInfo = new o.default(r, l),
						this._videoInfo = new _.default(this.config.ccode),
						this._player = "m3u8" === this.supportType ? new A.default({}) : new E.default({}),
						this._emitter = new I.default,
						this._createVideo();
					var u = {
						supportType: "mp4",
						sid: "",
						client_id: this.config.client_id,
						ccode: this.config.ccode,
						vvlogconfig: this.config.logconfig,
						cna: this.cna
					};
					this._reporter = new O.default(this.mediaElement, null, u, this),
						this._e = {
							onPlay: this._onPlay.bind(this),
							onPause: this._onPause.bind(this),
							onEnded: this._onEnded.bind(this),
							onCanPlay: this._onCanplay.bind(this),
							onTimeUpdate: this._onTimeupdate.bind(this),
							onError: this._onError.bind(this),
							onLoadedData: this._onLoadeddata.bind(this),
							onLoadedMetaData: this._onLoadedmetaData.bind(this),
							onAbort: this._onAbort.bind(this),
							onStalled: this._onStalled.bind(this),
							onSuspend: this._onSuspend.bind(this),
							onWaiting: this._onWaiting.bind(this),
							onVolumeChange: this._onVolumeChange.bind(this),
							onPlaying: this._onPlaying.bind(this),
							onSeeked: this._onSeeked.bind(this),
							onSeeking: this._onSeeking.bind(this),
							onDurationChange: this._onDurationChange.bind(this),
							onProgress: this._onProgress.bind(this),
							onRateChange: this._onRateChange.bind(this),
							onLoadStart: this._onLoadStart.bind(this)
						},
						this._adEvent = {
							onAdStartPlay: this._onAdStartPlay.bind(this),
							onAdEnd: this._onAdEnd.bind(this),
							onAdPause: this._onAdPause.bind(this),
							onAdTimeUpdate: this._onAdTimeUpdate.bind(this),
							onAdError: this._onAdError.bind(this),
							onAdLoading: this._onAdLoading.bind(this),
							onAdCanPlay: this._onAdCanPlay.bind(this),
							onAdTimeout: this._onAdTimeout.bind(this),
							adDataOk: this._adDataOk.bind(this),
							adDataError: this._adDataError.bind(this),
							onAdReady: this._onAdReady.bind(this)
						},
						this.currentState = x.YKP.PLAYER_STATE.INIT,
						this._adplugin = new g.default(this.mediaElement, {
							supportType: this.supportType,
							ccode: this.config.ccode
						}),
						this._attachAdEvents(),
						this.load(null, l)
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this.error = !1,
							this._firstTag = !0,
							this._isAdPlaying = !1,
							this.currentTime = 0,
							this._frontAd = !1,
							this._replay = !1,
							this._originalData = null,
							this.totalTime = 0,
							this.isPause = !0,
							this.vv59 = !1,
							this._player.destroy(),
							this._videoInfo.destroy(),
							this._adplugin.destroy(),
							this._reporter.destroy()
					}
				}, {
					key: "_createVideo",
					value: function(t, e) {
						if (!this.mediaElement) {
							var i = document.createElement("video");
							i.id = this.mediaElementId,
								i.setAttribute("webkit-playsinline", !0),
								i.setAttribute("playsinline", !0),
								i.style.width = "100%",
								i.style.height = "100%",
								i.style.display = "none",
								i.style.position = "relative",
							this.control.autoplay && (i.autoplay = "autoplay"),
							t && (i.width = "string" == typeof t && t.indexOf("px") > 0 ? t : t + "px"),
							e && (t.height = "string" == typeof e && e.indexOf("px") > 0 ? e : e + "px"),
								this.container.appendChild(i),
								this.mediaElement = i
						}
					}
				}, {
					key: "_attachPlayerEvents",
					value: function() {
						if (!this.ifEvent && (this.ifEvent = !0,
							this._player && this._e))
							for (var t in D.VIDEO_EVENTS)
								this._player.on(D.VIDEO_EVENTS[t], this._e[D.VIDEO_EVENTS[t]])
					}
				}, {
					key: "_dettachPlayerEvents",
					value: function() {
						if (this._player && this._e)
							for (var t in D.VIDEO_EVENTS)
								this._player.off(D.VIDEO_EVENTS[t], this._e[D.VIDEO_EVENTS[t]])
					}
				}, {
					key: "_attachAdEvents",
					value: function() {
						this._adplugin && this._adEvent && (this._adplugin.on(k.default.AD_DATA_OK, this._adEvent.adDataOk),
							this._adplugin.on(k.default.AD_DATA_ERROR, this._adEvent.adDataError),
							this._adplugin.on(k.default.AD_PLAY, this._adEvent.onAdStartPlay),
							this._adplugin.on(k.default.AD_PAUSE, this._adEvent.onAdPause),
							this._adplugin.on(k.default.AD_END, this._adEvent.onAdEnd),
							this._adplugin.on(k.default.AD_TIMEUPDATE, this._adEvent.onAdTimeUpdate),
							this._adplugin.on(k.default.AD_ERROR, this._adEvent.onAdError),
							this._adplugin.on(k.default.AD_CANPLAY, this._adEvent.onAdCanPlay),
							this._adplugin.on(k.default.AD_LOADING, this._adEvent.onAdLoading),
							this._adplugin.on(k.default.AD_TIMEOUT, this._adEvent.onAdTimeout),
							this._adplugin.on(k.default.AD_READY, this._adEvent.onAdReady))
					}
				}, {
					key: "_dettachAdEvents",
					value: function() {
						this._adplugin && this._adEvent && (this._adplugin.off(k.default.AD_DATA_OK, this._adEvent.adDataOk),
							this._adplugin.off(k.default.AD_DATA_ERROR, this._adEvent.adDataError),
							this._adplugin.off(k.default.AD_PLAY, this._adEvent.onAdStartPlay),
							this._adplugin.off(k.default.AD_PAUSE, this._adEvent.onAdPause),
							this._adplugin.off(k.default.AD_END, this._adEvent.onAdEnd),
							this._adplugin.off(k.default.AD_TIMEUPDATE, this._adEvent.onAdTimeUpdate),
							this._adplugin.off(k.default.AD_ERROR, this._adEvent.onAdError),
							this._adplugin.off(k.default.AD_CANPLAY, this._adEvent.onAdCanPlay),
							this._adplugin.off(k.default.AD_LOADING, this._adEvent.onAdLoading),
							this._adplugin.off(k.default.AD_TIMEOUT, this._adEvent.onAdTimeout),
							this._adplugin.off(k.default.AD_READY, this._adEvent.onAdReady))
					}
				}, {
					key: "_isThirdParty",
					value: function() {
						return this.config.client_id && 16 == (this.config.client_id + "").length ? (this.winType = "BDskin",
							!0) : !1
					}
				}, {
					key: "_getSupportType",
					value: function() {
						if (this.control && "mp4" === this.control.playerType)
							return "mp4";
						var t = navigator.userAgent.toLowerCase();
						return t.indexOf("ucbrowser") > -1 || this.control && "m3u8" === this.control.playerType || d.default.ios && d.default.isMobile || "mac" === d.default.device && d.default.safari ? "m3u8" : "mp4"
					}
				}, {
					key: "_upsdataSuccess",
					value: function(t, e) {
						this.error = !1,
							this.thirdData = e;
						var i = null;
						if (this.custumPassword && (this.password = this.custumPassword,
								i = this.config.client_id),
								t.error) {
							var n = t.error.code
								, a = ["-2002", "-2003", "-3001", "-3002", "-3006", "-3007", "-3008"];
							a.join(",").indexOf(n) > -1 ? (this._originalData = t,
								this._videoInfo.init(t, this.password, i),
								this._initControlInfo()) : (this.sendErrorLog("0H0203", n),
								this.currentState = x.YKP.PLAYER_STATE.ERROR),
								this.error = !0,
								this._upsDataError(t.error)
						} else {
							this._originalData = t,
								this._videoInfo.init(t, this.password, i),
								this._initControlInfo(),
								this.totalTime = this._videoInfo.video ? Number(this._videoInfo.video.seconds) : 0;
							var r = this._videoInfo.getStreamData(this.control.lang, this.control.hd);
							this.totalTime = r.seconds_video > this.totalTime ? r.seconds_video : this.totalTime,
								this.headAdTime = r.headTime,
								this.tailAdTime = r.tailTime,
								this._initAdPlugin(),
								this._reporter.init(this._videoInfo),
								h.default.i(this.TAG, "get ups data from upsInfo vid is:" + t.video.id)
						}
						this.upsDataSuccess(t),
							this.upsDataReady(t)
					}
				}, {
					key: "_initAdPlugin",
					value: function() {
						var t = {};
						t.fu = this.control.fullscreen,
							t.vr = 0,
							t.rst = d.default.isMobile && "ios" === d.default.os ? "m3u8" : "3gphd",
							t.dq = b.VIDEOHD_MAP[this.control.hd],
							t.os = d.default.os,
							t.bt = d.default.device,
							t.bd = d.default.brand,
							t.tict = 0,
							t.fu = this.control.fullscreen ? 1 : 0,
							t.d = this.config.param && this.config.param.playlist_id ? this.config.param.playlist_id : 0,
						this.isThirdParty && (t.partnerid = this.config.client_id,
							t.atm = this.thirdData && this.thirdData.atm ? this.thirdData.atm : "");
						var e = {};
						e.param = t,
						this.config.adConfig && (e.adConfig = this.config.adConfig),
							e.supportType = this.supportType,
							e.lang = this.control.lang,
							e.hd = this.control.hd,
							e.m3u8_url = this._videoInfo.stream[this.control.lang][this.control.hd].m3u8_url,
							this._adplugin.init(this._videoInfo, e)
					}
				}, {
					key: "_realStartPlay",
					value: function(t) {
						if (h.default.i(this.TAG, "_realStartPlay" + t + " "),
								this._firstTag) {
							var e = {};
							this._player.attachMediaElement(this.mediaElement),
								this._attachPlayerEvents();
							var i = this._videoInfo.stream[this.control.lang][this.control.hd];
							if (this.totalTime = i.seconds_video > this.totalTime ? i.seconds_video : this.totalTime,
									e.totalTime = this._videoInfo.trial ? this._videoInfo.trial.time : this.totalTime,
								"m3u8" === this.supportType) {
								var n = i.m3u8_url;
								e.m3u8Url = this._adError ? n : this._adplugin.buildM3u8(n, !1),
									e.frontAdTime = this._adplugin.frontAdTime
							} else
								e.segs = i.segs;
							this._player.load(e),
								this.currentState = x.YKP.PLAYER_STATE.PLAYING,
							this.isThirdParty && this._upsInfo.sendThirdToken(),
							this.vv59 || (this._reporter.addPlayerDurationReport(59),
								this.vv59 = !0),
							this.control.autoplay || this._player.play()
						} else
							this.sendEventLog("xpl", "c"),
								this._player.play();
						this.currentState = x.YKP.PLAYER_STATE.PLAYING
					}
				}, {
					key: "_initControlInfo",
					value: function() {
						if (this._videoInfo.langcodes) {
							var t = this.control
								, e = this._videoInfo.langcodes.join(",") + ","
								, i = t.lang;
							this.control.lang = !t.lang || e.indexOf(i + ",") < 0 ? this._videoInfo.langcodes[0] : t.lang,
								this.control.hd = t.hd || "mp4hd";
							var n = this._videoInfo.hdList[this.control.lang].hdcodes
								, a = n.join(",") + ",";
							a.indexOf(this.control.hd + ",") < 0 && (this.control.hd = n.join(",").indexOf("3gphd") > -1 ? "3gphd" : n[0]),
								this.control.autoplay = t.autoplay || !1,
								this.control.fullscreen = t.fullscreen || !1
						}
					}
				}, {
					key: "_upsTimeout",
					value: function() {
						this.currentState = x.YKP.PLAYER_STATE.ERROR,
							h.default.i(this.TAG, "get ups data timeout,please try again"),
							this.sendErrorLog("0H0201");
						var t = {
							code: "0001",
							note: "数据获取失败，请检查网络之后重试"
						};
						this.upsDataFail(t)
					}
				}, {
					key: "_upsDataError",
					value: function(t) {
						this.currentState = x.YKP.PLAYER_STATE.ERROR,
							h.default.d(this.TAG, "_upsDataError:" + JSON.stringify(t)),
							this.upsDataError(t)
					}
				}, {
					key: "_upsDataFail",
					value: function(t) {
						h.default.d(this.TAG, t),
							this.currentState = x.YKP.PLAYER_STATE.ERROR,
						t && "0000" !== !t.code || this.sendErrorLog("0H0202", 404),
							t = t ? t : {
								code: "0002",
								note: "数据获取失败，请检查网络之后重试"
							},
							this.upsDataFail(t),
							h.default.d(this.TAG, "_upsDataFail:get upsinfo fail,the service is 404 or 503")
					}
				}, {
					key: "_onPlay",
					value: function() {
						h.default.d(this.TAG, "_onPlay" + this._player.currentTime),
						this._firstTag && (this._firstTag = !1,
							this._reporter.addPlayerDurationReport(60),
							this._reporter.sendTSLog(60),
							this._reporter.sendUPSLog(3)),
							this.isPause = !1,
							this.onPlay()
					}
				}, {
					key: "_onPause",
					value: function() {
						h.default.d(this.TAG, "_onPause:"),
							this.isPause = !0,
						0 === p.default.getScreenState() && this._adplugin.requestPauseAd(),
							this.onPause()
					}
				}, {
					key: "_onEnded",
					value: function() {
						this.isEnd || (this.currentState = x.YKP.PLAYER_STATE.END,
							this.isEnd = !0,
							this._reporter.addPlayerDurationReport(61),
							this._reporter.sendTSLog(61),
							this.getTrialInfo() || this._replay || this._endAd ? (h.default.d(this.TAG, "onEnded"),
								this.onEnded()) : (h.default.d(this.TAG, "playEndAD"),
								this._adplugin.playEndAD()))
					}
				}, {
					key: "_onCanplay",
					value: function(t) {
						h.default.d(this.TAG, "_onCanplay" + this._player.currentTime),
							this.onCanplay(t)
					}
				}, {
					key: "_onTimeupdate",
					value: function(t, e) {
						e <= this.totalTime && (this.currentTime = e,
							this.onTimeupdate(t, e))
					}
				}, {
					key: "_onError",
					value: function(t) {
						h.default.d(this.TAG, "_onError"),
							this.error = !0,
							this.currentState = x.YKP.PLAYER_STATE.ERROR,
							"m3u8" === this.supportType ? this.sendErrorLog("0H0401") : this.sendErrorLog("0H0301"),
							this.onError(t)
					}
				}, {
					key: "_onLoadeddata",
					value: function(t) {
						this.onLoadeddata(t),
							h.default.d(this.TAG, "_onLoadeddata")
					}
				}, {
					key: "_onLoadedmetaData",
					value: function(t) {
						this.onLoadedmetaData(t),
							h.default.d(this.TAG, "_onLoadedmetaData")
					}
				}, {
					key: "_onLoadStart",
					value: function(t) {
						this.onLoadStart(t),
							h.default.d(this.TAG, "_onLoadStart")
					}
				}, {
					key: "_onAbort",
					value: function(t) {
						this.onAbort(t),
							h.default.d(this.TAG, "_onAbort")
					}
				}, {
					key: "_onStalled",
					value: function() {
						this.onStalled(),
							h.default.d(this.TAG, "_onStalled")
					}
				}, {
					key: "_onSuspend",
					value: function() {
						this.onSuspend(),
							h.default.d(this.TAG, "_onSuspend")
					}
				}, {
					key: "_onWaiting",
					value: function(t) {
						this.onWaiting(t),
							h.default.d(this.TAG, "_onWaiting")
					}
				}, {
					key: "_onVolumeChange",
					value: function(t) {
						this.onVolumeChange(t),
							h.default.d(this.TAG, "_onVolumeChange")
					}
				}, {
					key: "_onPlaying",
					value: function(t) {
						this.onPlaying(t),
							this.currentState = x.YKP.PLAYER_STATE.PLAYING,
							h.default.d(this.TAG, "_onPlaying")
					}
				}, {
					key: "_onSeeked",
					value: function(t) {
						this.onSeeked(t),
							h.default.d(this.TAG, "_onSeeked")
					}
				}, {
					key: "_onSeeking",
					value: function(t) {
						this.onSeeking(t),
							h.default.d(this.TAG, "_onSeeking")
					}
				}, {
					key: "_onDurationChange",
					value: function(t) {
						this.onDurationChange(t),
							h.default.d(this.TAG, "_onDurationChange")
					}
				}, {
					key: "_onProgress",
					value: function(t) {
						this.onProgress(t)
					}
				}, {
					key: "_onRateChange",
					value: function(t) {
						this.onRateChange(t),
							h.default.d(this.TAG, "_onRateChange")
					}
				}, {
					key: "_onAdTimeUpdate",
					value: function(t, e, i, n) {
						this.onAdTimeUpdate(t, e, i, n)
					}
				}, {
					key: "_onAdStartPlay",
					value: function(t, e) {
						this.isPause = !1,
							this._player.adStatus = !0,
							this.currentState = x.YKP.PLAYER_STATE.ADPLAY,
						this._isAdPlaying || (this._isAdPlaying = !0,
							this._reporter.sendUPSLog(1)),
						"front" !== e || this.vv59 || (this._reporter.addPlayerDurationReport(59),
							this.vv59 = !0),
							this.onAdStartPlay(t, e)
					}
				}, {
					key: "_onAdEnd",
					value: function(t, e) {
						h.default.i(this.TAG, "_onAdEnd::" + e + "|||" + t),
							this.onAdEnd(t, e),
							this._isAdPlaying = !1,
							this._reporter.sendUPSLog(2),
							"front" === e ? (this._frontAd = !0,
								this._realStartPlay(!0)) : "end" === e && (this._endAd = !0,
								this._isAdPlaying = !1,
								this.currentState = x.YKP.PLAYER_STATE.END,
								this.onEnded()),
							this._player.adStatus = !1
					}
				}, {
					key: "_onAdPause",
					value: function(t, e) {
						h.default.d(this.TAG, "  _onAdPause:"),
							this.currentState = x.YKP.PLAYER_STATE.ADPAUSE,
							this.isPause = !0,
							this.onAdPause(t, e)
					}
				}, {
					key: "_onAdError",
					value: function(t, e) {
						h.default.d(this.TAG, "_onAdError"),
							"m3u8" === this.supportType ? this.sendErrorLog("0H0401") : this.sendErrorLog("0H0301"),
							this._adError = !0,
							this._onAdEnd(t, e),
							this.onAdError(t, e)
					}
				}, {
					key: "_onAdTimeout",
					value: function(t, e) {
						this.onAdTimeout(t, e)
					}
				}, {
					key: "_onAdLoading",
					value: function(t, e) {
						this.onAdLoading(t, e)
					}
				}, {
					key: "_onAdCanPlay",
					value: function(t, e) {
						h.default.i(this.TAG, "_onAdCanPlay"),
							this.onAdCanPlay(t, e)
					}
				}, {
					key: "_onAdReady",
					value: function(t, e) {
						"front" === e && !this.error && this.control.autoplay && this._adplugin.autoPlay(),
							this.onAdReady(t, e)
					}
				}, {
					key: "_adDataOk",
					value: function(t, e) {
						S.AD_MAP.PAUSE === e ? t.VAL.length && this.pauseAdDataOk(t) : ("front" === e && this._reporter.initAdInfo(t),
							this.adDataOk(t, e))
					}
				}, {
					key: "_adDataError",
					value: function(t) {
						h.default.i(this.TAG, "this._curNum++;"),
							this._onAdEnd(null, t),
							this.adDataError()
					}
				}, {
					key: "getVideoInfo",
					value: function() {
						return this._videoInfo.getVideoInfo()
					}
				}, {
					key: "getUserInfo",
					value: function() {
						return this._videoInfo.getUserInfo()
					}
				}, {
					key: "getVideoList",
					value: function() {
						return this._videoInfo.getVideoList()
					}
				}, {
					key: "getShow",
					value: function() {
						return this._videoInfo.getShow()
					}
				}, {
					key: "getUps",
					value: function() {
						return this._videoInfo.ups
					}
				}, {
					key: "getCurStreamLogo",
					value: function() {
						var t = this._videoInfo.getStreamLogo();
						return t && t[this.control.lang] && null !== t[this.control.lang][this.control.hd] ? t[this.control.lang][this.control.hd] : null
					}
				}, {
					key: "getTrialInfo",
					value: function() {
						return this._videoInfo.getTrialInfo()
					}
				}, {
					key: "getAlbum",
					value: function() {
						return this._videoInfo.getAlbum()
					}
				}, {
					key: "getUploader",
					value: function() {
						return this._videoInfo.getUploader()
					}
				}, {
					key: "getPreviewInfo",
					value: function() {
						return this._videoInfo.getPreviewInfo()
					}
				}, {
					key: "getCloudOptions",
					value: function() {
						return this._videoInfo.getCloudOptions()
					}
				}, {
					key: "getTicketInfo",
					value: function() {
						return this._videoInfo.ticket
					}
				}, {
					key: "getPayInfo",
					value: function() {
						return this._videoInfo.getPayInfo()
					}
				}, {
					key: "getVideolike",
					value: function() {
						return this._videoInfo.getVideolike()
					}
				}, {
					key: "getLanguageList",
					value: function() {
						return this._videoInfo.languageList
					}
				}, {
					key: "getHdList",
					value: function(t) {
						return this._videoInfo.hdList ? t && this._videoInfo.langcodes.join(",").indexOf(t) > -1 ? this._videoInfo.hdList[t].hditems : this._videoInfo.hdList[this.control.lang].hditems : null
					}
				}, {
					key: "getVipPayInfo",
					value: function() {
						return this._videoInfo.getVipPayInfo()
					}
				}, {
					key: "getZpdPayInfo",
					value: function() {
						return this._videoInfo.getZpdPayInfo()
					}
				}, {
					key: "getController",
					value: function() {
						return this._videoInfo.getController()
					}
				}, {
					key: "getError",
					value: function() {
						return this._videoInfo.error
					}
				}, {
					key: "getCurrentTime",
					value: function() {
						return this.currentTime
					}
				}, {
					key: "ifShowLogo",
					value: function() {
						var t = this._videoInfo.getStreamLogo();
						if (t && t[this.control.lang] && t[this.control.lang][this.control.hd]) {
							var e = 1 === t[this.control.lang][this.control.hd] ? !1 : !0;
							return e
						}
						return !0
					}
				}, {
					key: "launchFullscreen",
					value: function() {
						this.control.fullscreen = !0
					}
				}, {
					key: "exitFullscreen",
					value: function() {
						this.control.fullscreen = !1
					}
				}, {
					key: "getAdInfo",
					value: function() {
						return this._adplugin.addata
					}
				}, {
					key: "skipAd",
					value: function(t) {
						this._adplugin.skip(t)
					}
				}, {
					key: "load",
					value: function(t, e) {
						this._endAd = !1;
						var i = t ? t : {};
						if (t)
							for (var n in t)
								i[n] = t[n];
						this._upsInfo.start(this._upsdataSuccess.bind(this), this._upsDataFail.bind(this), this._upsTimeout.bind(this), i, e)
					}
				}, {
					key: "play",
					value: function() {
						if (h.default.d(this.TAG, "play::" + this.currentState + "  _isAdPlaying:" + this._isAdPlaying),
								!this.error) {
							if (this.currentState === x.YKP.PLAYER_STATE.END)
								return this.isEnd = !1,
									this.replay(),
									void 0;
							this._firstTag && !this._isAdPlaying && this.sendEventLog("xPs", "c"),
								this._isAdPlaying || this.currentState === x.YKP.PLAYER_STATE.INIT ? this._adplugin.play() : this._realStartPlay(!0)
						}
					}
				}, {
					key: "pause",
					value: function() {
						h.default.d(this.TAG, "play::" + this.currentState + " isEnd:" + this.isEnd),
						this.error || this.isEnd || (this._isAdPlaying ? (this.currentState = x.YKP.PLAYER_STATE.ADPAUSE,
							this._adplugin.pause()) : (this.sendEventLog("xPa", "c"),
							this._player.pause(),
							this.currentState = x.YKP.PLAYER_STATE.PAUSE))
					}
				}, {
					key: "replay",
					value: function() {
						if (h.default.i(this.TAG, "replay"),
								!this.error) {
							if (this._firstTag)
								return !1;
							if (this.isEnd = !1,
									this.error = !1,
									this._firstTag = !0,
									this._isAdPlaying = !1,
									this.currentTime = 0,
									this._frontAd = !0,
									this._replay = !0,
								"m3u8" === this.supportType) {
								var t = this._videoInfo.stream[this.control.lang][this.control.hd].m3u8_url;
								this._player.m3u8Url = t
							}
							return this._player.replay(),
								this.sendEventLog("Rp", "c"),
								this._reporter.tsInit(),
								this._reporter.addPlayerDurationReport(62),
								!0
						}
					}
				}, {
					key: "changeByVid",
					value: function(t, e, i) {
						if (this._adError = !1,
								this.isEnd = !1,
								this.vv59 = !1,
								this._endAd = !1,
								this.currentState = x.YKP.PLAYER_STATE.INIT,
								!t)
							return h.default.e(this.TAG, "changeByVid the param vid is undefined"),
								void 0;
						this.pause(),
						this._isAdPlaying && this.onAdEnd(),
							this.destroy();
						var n = {};
						if (n.vid = t,
							i && i.control && (this.control = i.control),
							i && i.param)
							for (var a in i.param)
								n[a] = i.param[a];
						var r = null;
						i && this.isThirdParty ? (r = {},
							this.custumPassword = i.password,
							r.password = i.password,
							r.embsig = i.embsig,
							r.refer = i.refer) : this.custumPassword = null,
							this.config.videoId = t,
							this._upsInfo.start(function(t) {
								this._upsdataSuccess(t),
								e && e(t)
							}
								.bind(this), this._upsDataFail.bind(this), this._upsTimeout.bind(this), n, r)
					}
				}, {
					key: "reLoad",
					value: function(t) {
						this.isEnd = !1,
							this.vv59 = !1,
							this._adError = !1,
							this._reporter.tsInit(),
							this._firstTag = !0,
							this.currentState = x.YKP.PLAYER_STATE.INIT;
						var e = {};
						t ? (e.password = t,
							this.password = t) : (this._reporter.changeParam({
							isRetry: 1
						}),
							this.password = null),
							this.load(e)
					}
				}, {
					key: "seek",
					value: function(t) {
						this.error || (0 === t || t) && (h.default.i(this.TAG, "seek(_time):" + this._isAdPlaying),
						this._isAdPlaying || this._player.seek(t))
					}
				}, {
					key: "getVideoAttr",
					value: function(t) {
						return this.mediaElement ? this.mediaElement[t] : null
					}
				}, {
					key: "setVideoAttr",
					value: function(t, e) {
						this.mediaElement && (this.mediaElement[t] = e)
					}
				}, {
					key: "changeLanguage",
					value: function(t, e) {
						if (t === this.control.lang)
							return h.default.i(this.TAG, " this.control.lang:" + this.control.lang + "  langCode:" + t + "  this.currentState:" + this.currentState),
								!1;
						if (this.currentState === x.YKP.PLAYER_STATE.ERROR || this.currentState === x.YKP.PLAYER_STATE.INIT || this.currentState === x.YKP.PLAYER_STATE.ADPLAY || this.currentState === x.YKP.PLAYER_STATE.ADPAUSE)
							return this.control.lang = t,
							e && e(this.control),
								!0;
						var i = {};
						if (this._videoInfo.stream[t] && this._videoInfo.stream[t][this.control.hd]) {
							if ("m3u8" === this.supportType) {
								var n = this._videoInfo.stream[t][this.control.hd].m3u8_url;
								i.m3u8Url = this._adplugin.buildM3u8(n, !0),
									i.frontAdTime = 0
							} else
								i.segs = this._videoInfo.stream[t][this.control.hd].segs;
							return this._player.load(i),
								this.control.lang = t,
							e && e(this.control),
								!0
						}
						return !1
					}
				}, {
					key: "changeHd",
					value: function(t, e) {
						var i = {};
						if (t === this.control.hd)
							return h.default.i(this.TAG, " this.control.hd:" + this.control.hd + "  hdCode:" + t + "  this.currentState:" + this.currentState),
								!1;
						if (h.default.i(this.TAG, " changeHd:" + t),
							this.currentState === x.YKP.PLAYER_STATE.ERROR || this.currentState === x.YKP.PLAYER_STATE.INIT || this.currentState === x.YKP.PLAYER_STATE.ADPLAY || this.currentState === x.YKP.PLAYER_STATE.ADPAUSE) {
							var n = this._videoInfo.hdList[this.control.lang].hdcodes;
							return n.join(",").indexOf(t) > -1 ? (this.control.hd = t,
							e && e(this.control),
								!0) : !1
						}
						if (this._videoInfo.stream[this.control.lang] && this._videoInfo.stream[this.control.lang][t]) {
							if ("m3u8" === this.supportType) {
								var a = this._videoInfo.stream[this.control.lang][t].m3u8_url;
								i.m3u8Url = this._adplugin.buildM3u8(a, !0),
									i.frontAdTime = 0
							} else
								i.segs = this._videoInfo.stream[this.control.lang][t].segs;
							return this.control.hd = t,
								this._player.pause(),
								this._player.load(i),
							e && e(this.control),
								!0
						}
						return !1
					}
				}, {
					key: "changeMuted",
					value: function(t) {
						return t > 1 && (t = 1),
							t > 0 ? (this.mediaElement.muted = !1,
								this.mediaElement.volume = t) : (this.mediaElement.muted = !0,
								this.mediaElement.volume = 0),
							this.mediaElement.volume
					}
				}, {
					key: "sendEventLog",
					value: function(t, e, i, n) {
						this._reporter.sendUserActionReport(t, e, i, n)
					}
				}, {
					key: "sendAdClickLog",
					value: function(t) {
						this._adplugin.sendCUM(t)
					}
				}, {
					key: "sendPauseAdCUM",
					value: function(t) {
						N.default.sendPauseAdCUM(t)
					}
				}, {
					key: "sendPauseAdSUS",
					value: function(t) {
						N.default.sendPauseAdSUS(t)
					}
				}, {
					key: "sendErrorLog",
					value: function(t, e) {
						this.viewErrorCode = this._reporter.createViewCode();
						var i = {};
						i.errorType = t;
						var n = this.mediaElement.src || "";
						n.indexOf("m3u8") > -1 ? (i.m3u8Url = n,
							i.cdnUrl = "") : (i.cdnUrl = n,
							i.m3u8Url = ""),
							i.upsUrl = encodeURIComponent(this._upsInfo.upsUrl),
							i.errorCode = e || "",
							i.currentTime = this.currentTime,
							this._reporter.sendErrorLog(this.viewErrorCode, i)
					}
				}, {
					key: "sendGoldLog",
					value: function(t, e, i, n) {
						this._reporter.sendGoldLog(t, e, i, n)
					}
				}, {
					key: "upsDataError",
					value: function() {
						h.default.i(this.TAG, "extupsDataError")
					}
				}, {
					key: "upsDataFail",
					value: function() {
						h.default.i(this.TAG, "extupsDataFail")
					}
				}, {
					key: "upsDataReady",
					value: function() {
						h.default.i(this.TAG, "extupsDataReady")
					}
				}, {
					key: "upsDataSuccess",
					value: function() {
						h.default.i(this.TAG, "upsDataSuccess")
					}
				}, {
					key: "onPlay",
					value: function() {
					}
				}, {
					key: "onPause",
					value: function() {
					}
				}, {
					key: "onEnded",
					value: function() {
					}
				}, {
					key: "onPlaying",
					value: function() {
					}
				}, {
					key: "onError",
					value: function() {
					}
				}, {
					key: "onCanplay",
					value: function() {
					}
				}, {
					key: "onTimeupdate",
					value: function() {
					}
				}, {
					key: "onLoadStart",
					value: function() {
					}
				}, {
					key: "onLoadeddata",
					value: function() {
					}
				}, {
					key: "onLoadedmetaData",
					value: function() {
					}
				}, {
					key: "onAbort",
					value: function() {
					}
				}, {
					key: "onStalled",
					value: function() {
					}
				}, {
					key: "onSuspend",
					value: function() {
					}
				}, {
					key: "onWaiting",
					value: function() {
					}
				}, {
					key: "onVolumeChange",
					value: function() {
					}
				}, {
					key: "onSeeking",
					value: function() {
					}
				}, {
					key: "onSeeked",
					value: function() {
					}
				}, {
					key: "onDurationChange",
					value: function() {
					}
				}, {
					key: "onProgress",
					value: function() {
					}
				}, {
					key: "onRateChange",
					value: function() {
					}
				}, {
					key: "adDataOk",
					value: function(t, e) {
						h.default.i(this.TAG, "adDataOk|||" + e)
					}
				}, {
					key: "pauseAdDataOk",
					value: function() {
					}
				}, {
					key: "adDataError",
					value: function(t) {
						h.default.i(this.TAG, "adDataError:" + t)
					}
				}, {
					key: "onAdTimeUpdate",
					value: function() {
					}
				}, {
					key: "onAdStartPlay",
					value: function(t, e) {
						h.default.i(this.TAG, "onAdStartPlay:" + e)
					}
				}, {
					key: "onAdEnd",
					value: function(t, e) {
						h.default.i(this.TAG, "onAdEnd:" + e)
					}
				}, {
					key: "onAdPause",
					value: function(t, e) {
						h.default.i(this.TAG, "onAdPause:" + e)
					}
				}, {
					key: "onAdError",
					value: function(t, e) {
						h.default.i(this.TAG, "onAdError:" + e)
					}
				}, {
					key: "onAdLoading",
					value: function() {
					}
				}, {
					key: "onAdCanPlay",
					value: function() {
					}
				}, {
					key: "onAdReady",
					value: function() {
					}
				}, {
					key: "onAdTimeout",
					value: function() {
					}
				}]),
					t
			}();
			e.YoukuH5PlayerCore = R,
				e.Browser = d.default,
				e.Log = h.default,
				e.util = p.default,
				e.EventEmitter = I.default
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(6)
				, o = i(3)
				, l = n(o)
				, d = i(2)
				, u = n(d)
				, h = i(1)
				, c = n(h)
				, p = function() {
				function t(e) {
					a(this, t),
						this.TAG = "M3U8Player",
						this._currentTime = 0,
						this.m3u8Url = e.m3u8Url || [],
						this._tryTime = e.tryTime || -1,
						this._totalTime = e.totalTime || 0,
						this._firstflag = !0,
						this._frontAdTime = 0,
						this._endAdTime = 0,
						this._emitter = new l.default,
						this.adStatus = !0,
						this._ifEmitPause = !1,
						this._e = {
							onPlay: this._onPlay.bind(this),
							onPause: this._onPause.bind(this),
							onEnded: this._onEnd.bind(this),
							onCanPlay: this._onCanplay.bind(this),
							onTimeUpdate: this._onTimeupdate.bind(this),
							onError: this._onError.bind(this),
							onLoadeddata: this._onLoadeddata.bind(this),
							onLoadedmetaData: this._onLoadedmetaData.bind(this),
							onAbort: this._onAbort.bind(this),
							onStalled: this._onStalled.bind(this),
							onSuspend: this._onSuspend.bind(this),
							onWaiting: this._onWaiting.bind(this),
							onVolumeChange: this._onVolumeChange.bind(this),
							onPlaying: this._onPlaying.bind(this),
							onSeeked: this._onSeeked.bind(this),
							onSeeking: this._onSeeking.bind(this),
							onDurationChange: this._onDurationChange.bind(this),
							onProgress: this._onProgress.bind(this),
							onRateChange: this._onRateChange.bind(this),
							onLoadStart: this._onLoadStart.bind(this)
						}
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this._currentTime = 0,
							this._segs = [],
							this._tryTime = -1,
							this._totalTime = 0,
							this._firstflag = !0,
						this._mediaElement && this._mediaElement.pause(),
							this._ifEmitPause = !1,
							this.dettachMediaElement()
					}
				}, {
					key: "on",
					value: function(t, e) {
						this._emitter.addListener(t, e)
					}
				}, {
					key: "off",
					value: function(t, e) {
						this._emitter.removeListener(t, e)
					}
				}, {
					key: "attachMediaElement",
					value: function(t) {
						if (!this.ifEvent) {
							this.ifEvent = !0,
								this._mediaElement = t,
								this._mediaElement.poster = "";
							for (var e in s.VIDEO_EVENTS)
								c.default.addEventListenerHander(this._mediaElement, e, this._e[s.VIDEO_EVENTS[e]])
						}
					}
				}, {
					key: "dettachMediaElement",
					value: function() {
						if (this.ifEvent = !1,
								this._mediaElement) {
							for (var t in s.VIDEO_EVENTS)
								c.default.removeEventListenerHander(this._mediaElement, t, this._e[s.VIDEO_EVENTS[t]]);
							this._mediaElement && (this._mediaElement.src = "",
								this._mediaElement.removeAttribute("src"),
								this._mediaElement = null)
						}
					}
				}, {
					key: "load",
					value: function(t) {
						t.m3u8Url && (this.m3u8Url = t.m3u8Url),
						t.time && (this._currentTime = t.time),
						t.totalTime && (this._totalTime = t.totalTime),
							this._frontAdTime = t.frontAdTime ? t.frontAdTime : 0,
						t.endAdTime && (this._endAdTime = _mediaElement.endAdTime),
						this._firstflag && (this._currentTime = 0),
							this._ifEmitPause = !0,
						this._firstflag && "" !== this._mediaElement.src || (this._mediaElement.src = this.m3u8Url),
							u.default.i(this.TAG, "m3u8Url:" + this._mediaElement.src + " _currentTime:" + this._currentTime + "   _frontAdTime:" + this._frontAdTime),
						this._currentTime > 0 && (this.firstTime = this._currentTime + this._frontAdTime,
							this.seek(this._currentTime)),
						0 === this._currentTime && this._frontAdTime > 0 && this._onCanplay(null)
					}
				}, {
					key: "play",
					value: function() {
						this.m3u8Url && this._mediaElement && (this._mediaElement.style.display = "block",
						this._mediaElement.src || (this._mediaElement.src = this.m3u8Url,
							this._mediaElement.play()),
							this._mediaElement.play())
					}
				}, {
					key: "pause",
					value: function() {
						this.m3u8Url && this._mediaElement && (this._mediaElement.paused || this._mediaElement.pause())
					}
				}, {
					key: "replay",
					value: function() {
						this.m3u8Url && this._mediaElement && (this._mediaElement.src = this.m3u8Url,
							this._currentTime = 0,
							this._firstflag = !0,
							this._frontAdTime = 0,
							this._mediaElement.currentTime = 0 + this._frontAdTime,
							this._mediaElement.play())
					}
				}, {
					key: "seek",
					value: function(t) {
						if (this.m3u8Url && this._mediaElement && this._mediaElement.src && !(0 > t)) {
							0 === t && (t = .2),
							t >= this._totalTime && (t = this._totalTime - 1 > 0 ? this._totalTime - 1 : this._totalTime),
								t += this._frontAdTime,
								u.default.i(this.TAG, "Seek:" + t + "   _mediaElement.currentTime:" + this._mediaElement.currentTime + " _frontAdTime:" + this._frontAdTime);
							try {
								this._mediaElement.currentTime = t
							} catch (e) {
								var i = this
									, n = 0;
								this._mediaElement.addEventListener("canplay", function() {
									1 !== n && (n = 1,
										i._mediaElement.currentTime = t,
										i._mediaElement.play())
								})
							}
						}
					}
				}, {
					key: "_setCurrentTime",
					value: function(t) {
						try {
							this._mediaElement.currentTime = t
						} catch (e) {
							var i = !1;
							c.default.addEventListenerHander("canplay", function() {
								i || (i = !0,
									this._mediaElement.currentTime = t)
							})
						}
					}
				}, {
					key: "_onPlay",
					value: function(t) {
						this._ifEmitPause = !1,
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || (this._firstflag && (this._firstflag = !1),
							this._emitter.emit(s.VIDEO_EVENTS.play, t))
					}
				}, {
					key: "_onPause",
					value: function(t) {
						return this.adStatus || this._mediaElement.currentTime < this._frontAdTime ? void 0 : this._ifEmitPause ? (u.default.d(this.TAG, "_onPause:_ifEmitPause" + this._ifEmitPause),
							this._ifEmitPause = !1,
							void 0) : (this._emitter.emit(s.VIDEO_EVENTS.pause, t),
							void 0)
					}
				}, {
					key: "_onEnd",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || (u.default.i(this.TAG, "_onEnd(e)" + this._mediaElement.currentTime),
							this._emitter.emit(s.VIDEO_EVENTS.ended, t))
					}
				}, {
					key: "_onCanplay",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || (this.firstTime > 0 && (u.default.i(this.TAG + "  _onCanplay(e):this.firstTime:" + this.firstTime),
							this._mediaElement.currentTime = this.firstTime,
							this._mediaElement.play(),
							this.firstTime = 0),
							this._emitter.emit(s.VIDEO_EVENTS.canplay, t))
					}
				}, {
					key: "_onTimeupdate",
					value: function(t) {
						return this.adStatus || this._mediaElement.currentTime < this._frontAdTime ? void 0 : (this._currentTime = this._mediaElement.currentTime - this._frontAdTime,
							this._currentTime >= this._totalTime ? (this._mediaElement.pause(),
								this._ifEmitPause = !0,
								u.default.i(this.TAG, "trytime is out"),
								this._onEnd(t),
								void 0) : (this._emitter.emit(s.VIDEO_EVENTS.timeupdate, t, this._currentTime),
								void 0))
					}
				}, {
					key: "_onError",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.error, t)
					}
				}, {
					key: "_onLoadeddata",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.loadeddata, t)
					}
				}, {
					key: "_onLoadedmetaData",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.loadedmetadata, t)
					}
				}, {
					key: "_onLoadStart",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.loadstart, t)
					}
				}, {
					key: "_onAbort",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.abort, t)
					}
				}, {
					key: "_onStalled",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.stalled, t)
					}
				}, {
					key: "_onSuspend",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.suspend, t)
					}
				}, {
					key: "_onWaiting",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.waiting, t)
					}
				}, {
					key: "_onVolumeChange",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.volumechange, t)
					}
				}, {
					key: "_onPlaying",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.playing, t)
					}
				}, {
					key: "_onSeeked",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.seeked, t)
					}
				}, {
					key: "_onSeeking",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.seeking, t)
					}
				}, {
					key: "_onDurationChange",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || (this._currentTime = this._mediaElement.currentTime - this._frontAdTime,
							this._emitter.emit(s.VIDEO_EVENTS.durationchange, t))
					}
				}, {
					key: "_onProgress",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.progress, t)
					}
				}, {
					key: "_onRateChange",
					value: function(t) {
						this.adStatus || this._mediaElement.currentTime < this._frontAdTime || this._emitter.emit(s.VIDEO_EVENTS.ratechange, t)
					}
				}]),
					t
			}();
			e.default = p
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(6)
				, o = i(3)
				, l = n(o)
				, d = i(2)
				, u = n(d)
				, h = i(1)
				, c = n(h)
				, p = function() {
				function t(e) {
					a(this, t),
						this.TAG = "MP4Player",
						this._curNum = 0,
						this._isPause = !0,
						this._pastTime = 0,
						this._currentTime = 0,
						this._segs = e.segs || [],
						this._tryTime = e.tryTime || -1,
						this._totalTime = e.totalTime || 0,
						this._firstflag = !0,
						this._retryNum = 2,
						this._emitter = new l.default,
						this._e = {
							onPlay: this._onPlay.bind(this),
							onPause: this._onPause.bind(this),
							onEnded: this._onEnd.bind(this),
							onCanPlay: this._onCanplay.bind(this),
							onTimeUpdate: this._onTimeupdate.bind(this),
							onError: this._onError.bind(this),
							onLoadeddata: this._onLoadeddata.bind(this),
							onLoadedmetaData: this._onLoadedmetaData.bind(this),
							onAbort: this._onAbort.bind(this),
							onStalled: this._onStalled.bind(this),
							onSuspend: this._onSuspend.bind(this),
							onWaiting: this._onWaiting.bind(this),
							onVolumeChange: this._onVolumeChange.bind(this),
							onPlaying: this._onPlaying.bind(this),
							onSeeked: this._onSeeked.bind(this),
							onSeeking: this._onSeeking.bind(this),
							onDurationChange: this._onDurationChange.bind(this),
							onProgress: this._onProgress.bind(this),
							onRateChange: this._onRateChange.bind(this),
							onLoadStart: this._onLoadStart.bind(this)
						}
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this._curNum = 0,
							this._isPause = !0,
							this._pastTime = 0,
							this._currentTime = 0,
							this._segs = [],
							this._tryTime = -1,
							this._totalTime = 0,
							this._firstflag = !0,
							this.dettachMediaElement()
					}
				}, {
					key: "resetStatus",
					value: function() {
						u.default.i(this.TAG, "resetStatus"),
							this._curNum = 0,
							this._isPause = !0,
							this._pastTime = 0,
							this._currentTime = 0,
							this._firstflag = !0
					}
				}, {
					key: "on",
					value: function(t, e) {
						this._emitter.addListener(t, e)
					}
				}, {
					key: "off",
					value: function(t, e) {
						this._emitter.removeListener(t, e)
					}
				}, {
					key: "attachMediaElement",
					value: function(t) {
						if (!this.ifEvent) {
							this.ifEvent = !0,
								this._mediaElement = t,
								this._mediaElement.poster = "";
							for (var e in s.VIDEO_EVENTS)
								c.default.addEventListenerHander(this._mediaElement, e, this._e[s.VIDEO_EVENTS[e]])
						}
					}
				}, {
					key: "dettachMediaElement",
					value: function() {
						if (this._mediaElement) {
							this.ifEvent = !1;
							for (var t in s.VIDEO_EVENTS)
								c.default.removeEventListenerHander(this._mediaElement, t, this._e[s.VIDEO_EVENTS[t]]);
							this._mediaElement && (this._mediaElement.src = "",
								this._mediaElement.removeAttribute("src"),
								this._mediaElement = null)
						}
					}
				}, {
					key: "load",
					value: function(t) {
						if (t)
							if (t.segs && (this._segs = t.segs),
								t.time && (this._currentTime = t.time),
									t.totalTime)
								this._totalTime = t.totalTime;
							else {
								this._totalTime = 0;
								for (var e = 0, i = this._segs.length; i > e; e++)
									this._totalTime += this._segs[e].seconds_video
							}
						this._mediaElement.style.display = "block",
						this._firstflag && (this._curNum = 0,
							this._currentTime = 0),
							this._mediaElement.src = this._segs[this._curNum].cdn_url,
							this._mediaElement.play(),
						this._currentTime > 0 && this.seek(this._currentTime)
					}
				}, {
					key: "play",
					value: function(t) {
						this._segs && 0 !== this._segs.length && (t && (this._mediaElement.src = this._segs[this._curNum].cdn_url,
							this._mediaElement.currentTime = this._currentTime - this._pastTime),
							this._isPause = !1,
							this._mediaElement.play())
					}
				}, {
					key: "pause",
					value: function() {
						this._segs && 0 !== this._segs.length && (this._isPause = !0,
							this._mediaElement.pause())
					}
				}, {
					key: "seek",
					value: function(t) {
						if (!this.adStatus && (u.default.i(this.TAG, "seek(time):" + t),
							this._segs && 0 !== this._segs.length)) {
							t >= this._totalTime && (t = this._totalTime >= 1 ? this._totalTime - 1 : this._totalTime),
							0 > t && (t = 0);
							var e = 0
								, i = this._segs.length;
							return 1 === i ? (e = 0,
								this._curNum = 0,
								this._mediaElement.currentTime = t,
								this._mediaElement.play(),
								this._setCurrentTime(t),
								void 0) : (this._seekMultiSeg(t),
								void 0)
						}
					}
				}, {
					key: "replay",
					value: function() {
						this._curNum = 0,
							this._isPause = !0,
							this._pastTime = 0,
							this._currentTime = 0,
							this._firstflag = !0,
							this._mediaElement.src = this._segs[this._curNum].cdn_url,
							this._mediaElement.currentTime = this._currentTime - this._pastTime,
							this._isPause = !1,
							this._mediaElement.play()
					}
				}, {
					key: "_seekMultiSeg",
					value: function(t) {
						var e = 0
							, i = void 0;
						if (i = 0 === t ? 0 : this._getCurNumBy(t),
								0 === i ? (e = t,
									this._pastTime = 0) : (this._pastTime = this._segs[i - 1].totalSegs_seconds_video,
									e = t - this._pastTime),
								u.default.i(this.TAG, "_num:" + i + " _pastTime:" + this._pastTime + "  _vtTime:" + e),
							i === this._curNum)
							this._mediaElement.currentTime = e,
								this._setCurrentTime(e),
								this._mediaElement.play();
						else {
							var n = this._segs[i].cdn_url;
							this.vkey = c.default.getURlKey("vkey", n),
								this.fileid = this._segs[i].fileid,
								this._curNum = i,
								n ? (this._mediaElement.pause(),
									this._mediaElement.src = n,
									this._mediaElement.currentTime = e,
									this._setCurrentTime(e),
									this._mediaElement.play()) : this._mediaElement.pause()
						}
					}
				}, {
					key: "_setCurrentTime",
					value: function(t) {
						try {
							this._mediaElement.currentTime = t
						} catch (e) {
							var i = !0
								, n = this;
							c.default.addEventListenerHander(this._mediaElement, "canplay", function() {
								i && (i = !1,
									n._mediaElement.currentTime = t,
									n._mediaElement.play())
							})
						}
					}
				}, {
					key: "_getCurNumBy",
					value: function(t) {
						var e = Math.floor(this._segs.length / 2);
						if (1 === this._segs.length)
							return 0;
						t < this._segs[e].totalSegs_seconds_video && (e = 0);
						for (var i = this._segs.length; i > e && !(t < this._segs[e].totalSegs_seconds_video); e++)
							;
						return e
					}
				}, {
					key: "_onPlay",
					value: function(t) {
						this.adStatus || (this._firstflag && (this._firstflag = !1),
							this._emitter.emit(s.VIDEO_EVENTS.play, t))
					}
				}, {
					key: "_onPause",
					value: function(t) {
						return this.adStatus ? void 0 : this._ifEmitPause ? (this._ifEmitPause = !1,
							void 0) : (this._emitter.emit(s.VIDEO_EVENTS.pause, t),
							void 0)
					}
				}, {
					key: "_onEnd",
					value: function(t) {
						if (!this.adStatus)
							if (this._curNum++,
								this._curNum < this._segs.length) {
								this._pastTime += this._segs[this._curNum - 1].seconds_video,
									this._mediaElement.pause(),
									this._ifEmitPause = !0;
								var e = this._segs[this._curNum].cdn_url;
								this._mediaElement.src = e,
									this.vkey = c.default.getURlKey("vkey", e),
									this.fileid = this._segs[this._curNum].fileid;
								var i = !0
									, n = this;
								c.default.addEventListenerHander(this._mediaElement, "canplay", function() {
									i && (u.default.d("MP4Player", "canplay:" + n._mediaElement.paused),
										n._mediaElement.play(),
										i = !1)
								}),
									this._mediaElement.play()
							} else
								u.default.i(this.TAG, "_onEnd" + this._curNum),
									this._emitter.emit(s.VIDEO_EVENTS.ended, t)
					}
				}, {
					key: "_onCanplay",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.canplay, t)
					}
				}, {
					key: "_onTimeupdate",
					value: function(t) {
						return this.adStatus ? void 0 : (this._currentTime = this._mediaElement.currentTime + this._pastTime,
							this._currentTime >= this._totalTime ? (u.default.i(this.TAG, "trytime is out"),
								this._mediaElement.pause(),
								this._ifEmitPause = !0,
								u.default.i(this.TAG, "_onEnd" + this._curNum),
								this._emitter.emit(s.VIDEO_EVENTS.ended, t),
								void 0) : (this._emitter.emit(s.VIDEO_EVENTS.timeupdate, t, this._currentTime),
								void 0))
					}
				}, {
					key: "_onError",
					value: function(t) {
						this.adStatus || (this._retryNum > 0 ? (this._mediaElement.src = this._segs[this._curNum].cdn_url,
							this.seek(this._currentTime),
							this._retryNum--) : this._emitter.emit(s.VIDEO_EVENTS.error, t))
					}
				}, {
					key: "_onLoadeddata",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.loadeddata, t)
					}
				}, {
					key: "_onLoadedmetaData",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.loadedmetadata, t)
					}
				}, {
					key: "_onLoadStart",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.loadstart, t)
					}
				}, {
					key: "_onAbort",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.abort, t)
					}
				}, {
					key: "_onStalled",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.stalled, t)
					}
				}, {
					key: "_onSuspend",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.suspend, t)
					}
				}, {
					key: "_onWaiting",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.waiting, t)
					}
				}, {
					key: "_onVolumeChange",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.volumechange, t)
					}
				}, {
					key: "_onPlaying",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.playing, t)
					}
				}, {
					key: "_onSeeked",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.seeked, t)
					}
				}, {
					key: "_onSeeking",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.seeking, t)
					}
				}, {
					key: "_onDurationChange",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.durationchange, t)
					}
				}, {
					key: "_onProgress",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.progress, t)
					}
				}, {
					key: "_onRateChange",
					value: function(t) {
						this.adStatus || this._emitter.emit(s.VIDEO_EVENTS.ratechange, t)
					}
				}]),
					t
			}();
			e.default = p
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(2)
				, d = n(l);
			i(5);
			var u = Object.freeze({
				UPS_API_URL: "https://ups.youku.com/ups/get.json",
				UPS_API_URL_TEST: "http://ups-beta.youku.com/ups/get.json",
				OPEN_API_URL: "https://api.youku.com/players/custom.json",
				OPEN_API_URL_TOKEN: "https://api.youku.com/players/consume.json"
			})
				, h = function() {
				function t(e, i) {
					a(this, t),
						this.TAG = "UPSInfo",
						this.tryCount = 2,
						this.param = e,
						this.iserror = 0,
						this.issuccess = 0,
						this.callback = null,
						this.error = null,
						this.timeout = null,
						this.utidErrorNum = 0,
						this.customParam = i,
						this.customData = null,
						this.customContol = {
							success: !1
						}
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this.issuccess = 0,
							this.iserror = 0,
							this.customData = null,
							this.customContol = {
								success: !1
							}
					}
				}, {
					key: "_initData",
					value: function(t) {
						d.default.i(this.TAG, "get ups info success"),
							this.issuccess++,
							this.callback(t.data, this.customData)
					}
				}, {
					key: "_requestError",
					value: function() {
						if (console.error(this.TAG, "_requestError" + this.iserror),
								!this.issuccess)
							if (this.iserror++,
								this.iserror < this.tryCount && !this.issuccess) {
								this.param.client_ts = (new Date).getTime();
								var t = this._buildUpsUrl();
								this.upsUrl = t,
									o.default.getJsonp(t, function(t) {
										this._initData(t)
									}
										.bind(this), function() {
										this._requestError()
									}
										.bind(this), function() {
										this.timeout()
									}
										.bind(this), 15e3)
							} else
								this.iserror = 0,
									this.error()
					}
				}, {
					key: "_getOpenAPI",
					value: function() {
						var t = {};
						t.refer = this.customParam.refer,
							t.client_id = this.customParam.client_id,
							t.video_id = this.param.vid,
							t.version = "1.0",
							t.type = "h5",
							t.embsig = this.customParam.embsig || "";
						var e = u.OPEN_API_URL + "?" + o.default.urlParameter(t);
						o.default.getJsonp(e, function(t) {
							this._parseCustom(t)
						}
							.bind(this), function() {
							this._customFail()
						}
							.bind(this), function() {
							this._customFail()
						}
							.bind(this))
					}
				}, {
					key: "_parseCustom",
					value: function(t) {
						d.default.d(this.TAG, "_parseCustom(data)"),
							this.customData = t,
							this.customData && this.customParam.password && this.customData.passless && 1 === parseInt(this.customData.passless) ? (this.param.client_id = this.customParam.client_id,
								this.param.password = this.customParam.password) : this.param.client_id ? delete this.param.client_id : "",
							this._getUpsData()
					}
				}, {
					key: "_customFail",
					value: function() {
						this.customData = null,
							this._getUpsData(),
							d.default.d(this.TAG, "_customFail()")
					}
				}, {
					key: "sendThirdToken",
					value: function() {
						if (this.customData) {
							var t = this.customData.token
								, e = u.OPEN_API_URL_TOKEN + "?token=" + t;
							o.default.getJsonp(e, function(t) {
								this._thirdTokenSuccess(t)
							}
								.bind(this), function() {
								this._thirdTokenFail()
							}
								.bind(this), function() {
								this._thirdTokenFail()
							}
								.bind(this), 1e4)
						}
					}
				}, {
					key: "_thirdTokenSuccess",
					value: function(t) {
						d.default.d(this.TAG, "_thirdTokenSuccess(data):" + JSON.stringify(t))
					}
				}, {
					key: "_thirdTokenFail",
					value: function() {
						d.default.d(this.TAG, "_thirdTokenFail()")
					}
				}, {
					key: "_buildUpsUrl",
					value: function() {
						var t = u.UPS_API_URL + "?" + o.default.urlParameter(this.param);
						t += "&utid=" + encodeURIComponent(this.utid),
						this.customData && this.customParam.password && 1 === this.customData.status && 1 === this.customData.passless && (t += "&client_id=" + this.customParam.client_id),
						this.customData && this.customData.stealsign && (t += "&r=" + encodeURIComponent(this.customData.stealsign));
						var e = o.default.getUCStr(this.param.vid, this.param.ccode);
						return t += e
					}
				}, {
					key: "_getUpsData",
					value: function() {
						if (this.param.client_ts = parseInt((new Date).getTime() / 1e3),
								this.utid = this.param.utid ? this.param.utid : o.default.getCna(),
								delete this.param.utid,
								this.utid) {
							this.utidErrorNum = 0;
							var t = this._buildUpsUrl();
							this.upsUrl = t,
								o.default.getJsonp(t, function(t) {
									this._initData(t)
								}
									.bind(this), function() {
									this._requestError()
								}
									.bind(this), function() {
									this.timeout()
								}
									.bind(this), 15e3)
						} else {
							if (this.utidErrorNum > 5)
								return this.error({
									note: "请允许cookie存储",
									code: "0000"
								}),
									o.default.sendlog("//gm.mmstat.com/youkuplayer.fdl.nocna?t=" + (new Date).getTime()),
									this.utidErrorNum = 0,
									void 0;
							d.default.e(this.TAG, "utid为空：" + this.utidErrorNum),
								this.utidErrorNum++;
							var e = this;
							this.tryTimer = setTimeout(function() {
								d.default.i(this.TAG, "再次请求ups"),
									e.utid = o.default.getCna(),
									e.start(),
									clearTimeout(this.tryTimer)
							}, 500)
						}
					}
				}, {
					key: "start",
					value: function(t, e, i, n, a) {
						if (this.error = e ? e : this.error,
								this.callback = t ? t : this.callback,
								this.timeout = i ? i : function() {
								}
								,
								n)
							for (var r in n)
								this.param[r] = n[r];
						if (a)
							for (var r in a)
								this.customParam[r] = a[r];
						a ? this._getOpenAPI() : (this.customParam && this.customParam.password && delete this.customParam.password,
							this._getUpsData())
					}
				}]),
					t
			}();
			e.default = h
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(2)
				, d = n(l)
				, u = i(9)
				, h = {
				ups: "ups",
				video: "video",
				stream: "stream",
				show: "show",
				fee: "fee",
				dvd: "dvd",
				videos: "videos",
				trial: "trial",
				user: "user",
				vip: "vip",
				ticket: "ticket",
				cloud: "cloud",
				uploader: "uploader",
				preview: "preview",
				album: "album",
				token: "token",
				controller: "controller",
				network: "network",
				playlog: "playlog",
				videolike: "videolike",
				pay: "pay",
				vipPayInfo: "vip_pay_info",
				zpdPayInfo: "zpd_pay_info",
				error: "error"
			}
				, c = function() {
				function t(e) {
					a(this, t),
						this.TAG = "VideoInfo",
						this.ups = null,
						this.security = null,
						this.stream = {},
						this.ccode = e
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						for (var t in h)
							this[t] = null
					}
				}, {
					key: "init",
					value: function(t, e, i) {
						if (this.destroy(),
							t.ups || d.default.e(this.TAG, "the data.ups is undefined,please check data"),
								this.password = e,
								this.client_id = i,
								this._copyData(t),
								this.totalTime = this.video.seconds,
								this.video.title = o.default.htmlEncodeAll(this.video.title),
							this.show && (this.show.title = o.default.htmlEncodeAll(this.show.title)),
								this.encodeId = this.video.encodeid,
								this.videoId = this.video.id,
							this.stream && !(this.stream.length < 1)) {
							var n = {
								lang: "默认",
								langcode: this.stream[0].audio_lang,
								vid: this.encodeid
							}
								, a = [];
							a.push(n),
								this.languageList = this.dvd && this.dvd.audiolang ? this.dvd.audiolang : a;
							for (var r = [], s = 0, l = this.languageList.length; l > s; s++)
								r.push(this.languageList[s].langcode);
							this.langcodes = r,
								this.logo = {},
								this._createStream(this.stream, r),
								this._createHdList()
						}
					}
				}, {
					key: "_copyData",
					value: function(t) {
						for (var e in h)
							this[e] = t[h[e]]
					}
				}, {
					key: "_getPreviewInfo",
					value: function(t) {
						this.preview.point = t.point,
							this.preview.head = t.head,
							this.preview.tail = t.tail,
							this.preview.notsharing = t.notsharing,
							this.preview.threed = t.threed
					}
				}, {
					key: "_createStream",
					value: function(t, e) {
						if (0 === t.length)
							return [];
						var i = {};
						t[0].audio_lang,
							this.logo = {};
						for (var n = 0, a = e.length; a > n; n++) {
							var r = e[n];
							i[r] = {},
								this.logo[r] = {};
							for (var s = 0, o = t.length; o > s; s++) {
								for (var l = t[s], d = l.segs, u = 0, h = 0, c = 0, p = d.length; p > c; c++)
									d[c].seconds_audio = parseInt(d[c].total_milliseconds_audio) / 1e3,
										d[c].seconds_video = parseInt(d[c].total_milliseconds_video) / 1e3,
										u += parseInt(d[c].total_milliseconds_audio),
										h += parseInt(d[c].total_milliseconds_video),
										d[c].totalSegs_seconds_audio = u / 1e3,
										d[c].totalSegs_seconds_video = h / 1e3;
								var f = void 0;
								t[s].audio_lang === r && (l.seconds_audio = l.milliseconds_audio / 1e3,
									l.seconds_video = l.milliseconds_video / 1e3,
									i[r][t[s].stream_type] ? (f = i[r][t[s].stream_type],
										f.seconds_video += l.seconds_video,
										f.seconds_audio += l.seconds_audio,
										f.size += l.size,
										f.segs = this._splicSegs(f.segs, l.segs),
									"tail" === l.channel_type && (f.tailTime = l.seconds_video)) : (f = l,
										f.headTime = "head" === f.channel_type ? l.seconds_video : 0,
										f.tailTime = 0,
										f.m3u8_url = this._checkM3u8(l.m3u8_url),
										this.logo[r][t[s].stream_type] = l.logo && "none" !== l.logo ? 1 : 0),
									i[r][t[s].stream_type] = f)
							}
						}
						this.stream = i
					}
				}, {
					key: "_splicSegs",
					value: function(t, e) {
						for (var i = t[t.length - 1], n = i.totalSegs_seconds_audio, a = i.totalSegs_seconds_video, r = i.total_milliseconds_video, s = i.total_milliseconds_audio, o = 0, l = e.length; l > o; o++) {
							var d = e[o];
							d.totalSegs_seconds_audio += n,
								d.totalSegs_seconds_video += a,
								d.total_milliseconds_audio += s,
								d.total_milliseconds_video += r,
								t.push(d)
						}
						return t
					}
				}, {
					key: "_checkM3u8",
					value: function(t) {
						this.password && t.indexOf("&password=") < 0 && (t += "&password=" + this.password),
						this.client_id && "youkumobileplaypage" !== this.client_id && t.indexOf("&client_id") < 0 && (t += "&client_id=" + this.client_id);
						var e = o.default.getUCStr(this.encodeId, this.ccode) || "";
						return t.indexOf("xk=") < 0 && e && (t += e),
							t
					}
				}, {
					key: "_checkKUrl",
					value: function(t) {
						return t
					}
				}, {
					key: "_createHdList",
					value: function() {
						for (var t = {}, e = 0, i = this.langcodes.length; i > e; e++) {
							var n = this.stream[this.langcodes[e]];
							t[this.langcodes[e]] = {},
								t[this.langcodes[e]].hditems = [],
								t[this.langcodes[e]].hdcodes = [];
							for (var a in u.SHOWHD_MAP)
								if (n[a]) {
									var r = {
										hdcode: a,
										hdname: u.SHOWHD_MAP[a]
									};
									t[this.langcodes[e]].hditems.push(r),
										t[this.langcodes[e]].hdcodes.push(a)
								}
						}
						this.hdList = t,
							this.hdcodes = this.hdList[this.langcodes[0]].hdcodes
					}
				}, {
					key: "getVideoInfo",
					value: function() {
						return this.video ? this.video : null
					}
				}, {
					key: "getVideoList",
					value: function() {
						if (!this.videos)
							return null;
						var t = {};
						return t.list = this.videos.list || [],
							t.next = this.videos.next || null,
							t.previous = this.videos.previous || null,
							t
					}
				}, {
					key: "getShow",
					value: function() {
						return this.show ? this.show : null
					}
				}, {
					key: "getStreamLogo",
					value: function() {
						return this.logo ? this.logo : null
					}
				}, {
					key: "getTrialInfo",
					value: function() {
						return this.trial ? this.trial : null
					}
				}, {
					key: "getPreviewInfo",
					value: function() {
						if (!this.dvd && !this.preview)
							return null;
						var t = {};
						return this.preview && (t.thumb = this.preview.thumb,
							t.timespan = this.preview.timespan),
						this.dvd && (t.head = this.dvd.head ? parseInt(this.dvd.head) / 1e3 : 0,
							t.tail = this.dvd.tail ? parseInt(this.dvd.tail) / 1e3 : 0,
							t.point = this.dvd.point),
							t
					}
				}, {
					key: "getCloudOptions",
					value: function() {
						if (!this.cloud && !this.playlog)
							return null;
						var t = {};
						return this.playlog && (t.lastpoint = this.playlog.lastpoint),
						this.cloud && (t.subtitle = this.cloud.player_var_subtitle,
							t.skip = this.cloud.player_skip_titles_credits,
							t.lang = this.cloud.player_language),
							t
					}
				}, {
					key: "getUserInfo",
					value: function() {
						var t = {};
						return this.user && (t.uid = this.user.uid,
							t.vip = this.user.vip,
							t.ip = this.user.ip),
						this.vip && (t.ad = this.vip.ad,
							t.acc_support = this.vip.acc_support,
							t.acc_pen = this.vip.acc_open,
							t.hd3 = this.vip.hd3,
							t.note = this.vip.note,
							t.reason = this.vip.reason,
							t.link = this.vip.link),
							t
					}
				}, {
					key: "getPayInfo",
					value: function() {
						if (!this.pay && !this.fee)
							return null;
						var t = {};
						return this.pay && (t.can_play = this.pay.can_play,
							t.h5_caseurl = this.pay.h5_caseurl,
							t.price = this.pay.price,
							t.discount_price = this.pay.discount_price,
							t.duration = this.pay.duration),
						this.fee && (t.ad = this.fee.ad,
							t.paidType = this.fee.paid_type,
							t.ownChannelId = this.fee.own_channel_id,
							t.paid = this.fee.paid,
							t.videoType = this.fee.video_type),
							t
					}
				}, {
					key: "getVipPayInfo",
					value: function() {
						return this.vipPayInfo ? this.vipPayInfo : null
					}
				}, {
					key: "getZpdPayInfo",
					value: function() {
						return this.zpdPayInfo ? void 0 : this.zpdPayInfo
					}
				}, {
					key: "getFee",
					value: function() {
						return this.fee ? this.fee : null
					}
				}, {
					key: "getUploader",
					value: function() {
						return this.uploader
					}
				}, {
					key: "getVideolike",
					value: function() {
						return this.videolike
					}
				}, {
					key: "getController",
					value: function() {
						return this.controller ? this.controller : null
					}
				}, {
					key: "getAlbum",
					value: function() {
						return this.album ? this.album : null
					}
				}, {
					key: "getStreamData",
					value: function(t, e) {
						return this.stream && this.stream[t] && this.stream[t][e] ? this.stream[t][e] : null
					}
				}]),
					t
			}();
			e.default = c
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				ALI: {
					TSLOG: "//yt.mmstat.com/yt/vp.vtslog",
					DURATIONLOG: "//yt.mmstat.com/yt/vp.vdoview",
					EVENTLOG: "//yt.mmstat.com/yt/vp.event"
				},
				YOUKU: {
					TSLOG: "//p-log.ykimg.com/tslog",
					DURATIONLOG: "//stat.youku.com/player/addPlayerDurationReport",
					EVENTLOG: "//p-log.ykimg.com/event"
				},
				TUDOU: {
					TSLOG: "//gm.mmstat.com/yt/newtudou.web.ts",
					DURATIONLOG: "//gm.mmstat.com/yt/newtudou.web.vv",
					EVENTLOG: "//gm.mmstat.com/yt/newtudou.web.event"
				}
			}
				, n = {
				guoyu: {
					num: 1,
					name: "国语"
				},
				yue: {
					num: 2,
					name: "粤语"
				},
				chuan: {
					num: 3,
					name: "川话"
				},
				tai: {
					num: 4,
					name: "台湾"
				},
				min: {
					num: 5,
					name: "闽南"
				},
				en: {
					num: 6,
					name: "英语"
				},
				ja: {
					num: 7,
					name: "日语"
				},
				kr: {
					num: 8,
					name: "韩语"
				},
				"in": {
					num: 9,
					name: "印度"
				},
				fr: {
					num: 11,
					name: "法语"
				},
				de: {
					num: 12,
					name: "德语"
				},
				it: {
					num: 13,
					name: "意语"
				},
				es: {
					num: 14,
					name: "西语"
				},
				th: {
					num: 16,
					name: "泰语"
				},
				baby: {
					num: 1,
					name: "萌童"
				},
				man: {
					num: 1,
					name: "暖男"
				}
			};
			e.REPORT_API = i,
				e.LANGMAP = n
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			function a(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function")
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var r = function() {
				function t(t, e) {
					for (var i = 0; i < e.length; i++) {
						var n = e[i];
						n.enumerable = n.enumerable || !1,
							n.configurable = !0,
						"value" in n && (n.writable = !0),
							Object.defineProperty(t, n.key, n)
					}
				}
				
				return function(e, i, n) {
					return i && t(e.prototype, i),
					n && t(e, n),
						e
				}
			}()
				, s = i(1)
				, o = n(s)
				, l = i(10)
				, d = n(l)
				, u = i(23)
				, h = i(5)
				, c = i(2)
				, p = n(c)
				, f = i(25)
				, m = n(f)
				, _ = function() {
				function t(e, i, n, r) {
					a(this, t),
						this.TAG = "Reporter",
						this.cna = n.cna ? n.cna : o.default.getCna(),
						this.client_id = n.client_id,
						this.ccode = n.ccode || "0501",
						this.supportType = n.supportType || "mp4",
						this.winType = 30,
						this._player = r,
						this._isThirdParty = this._player.isThirdParty,
						this._mediaElement = e,
						this._videoInfo = i,
						this.totalTime = this._videoInfo && this._videoInfo.totalTime ? this._videoInfo.totalTime : 0,
						this.pubParam = {},
						this._initParam(),
						this.mtype = this._getMType(),
						this.tsSn = 0,
						this.tstimer = null,
						this.drtimer = null,
						this._adInfo = {},
						this.isRetry = 0,
						this.tsClb = 0,
						this.dClb = 0,
						this.dimension = {
							w: this._mediaElement.offsetWidth,
							h: this._mediaElement.offsetHeight
						},
						this.screenDim = {
							w: screen.availWidth,
							h: screen.availHeight
						},
						this._vvlogconfig = n.vvlogconfig || {};
					try {
						this.vvlogext = n._vvlogconfig.vvlogext ? n._vvlogconfig.vvlogext : UrchinAplus._yVvlogInfo()
					} catch (s) {
						this.vvlogext = ""
					}
				}
				
				return r(t, [{
					key: "destroy",
					value: function() {
						this._videoInfo = null,
							this.tsSn = 0,
							clearTimeout(this.tstimer),
							this.tstimer = null,
							clearInterval(this.drtimer),
							this.drtimer = null
					}
				}, {
					key: "init",
					value: function(t, e) {
						this._videoInfo = t,
							this.sid = e,
							this.tsSn = 0,
							this.cna = this.cna ? this.cna : o.default.getCna(),
							this.totalTime = this._videoInfo.totalTime || 0,
							this._initParam()
					}
				}, {
					key: "changeParam",
					value: function(t) {
						if (t)
							for (var e in t)
								this[e] = t[e]
					}
				}, {
					key: "sendTSLog",
					value: function(t) {
						var e = 5;
						this.tsSn >= 24 ? e = 20 : this.tsSn >= 12 && (e = 10);
						var i = this;
						if (this.tstimer = setTimeout(function() {
								i.sendTSLog(60)
							}, 1e3 * e),
							(61 === t || this._player.error) && (p.default.i(this.TAG, "播放结束times：" + t),
								clearTimeout(this.tstimer),
								this.tstimer = null),
							this._player.currentState === h.YKP.PLAYER_STATE.PLAYING && !this._mediaElement.paused) {
							if (0 == this.tsSn)
								return this.tsSn++,
									void 0;
							var n = {};
							n.vvid = this.pubParam.psid,
								n.vid = this.pubParam.videoId,
								n.cf = this._getHDFlag(this._player.control.hd),
								n.cpt = Math.round(this._player.currentTime),
								n.full = this._player.control.fullscreen ? 1 : 0,
								n.lang = this._getLanguage(),
								n.pc = 60 == t ? 0 : 1;
							var a = this._getCurLoadedBytes();
							n.clb = a - this.tsClb >= 0 ? a - this.tsClb : a,
								this.tsClb = a,
								n.iku = "n",
								n.pt = this._getPlayTime(),
								n.sn = this.tsSn,
								n.hi = e,
								n.ext = this._getExtString(t),
								n.cna = this.cna,
								n.uid = this.pubParam.uid,
								n.url = encodeURIComponent(window.location.href);
							var r = n.vvid + n.vid + n.cpt + n.pt + n.sn;
							n.r = this._signTS(r),
							this._isThirdParty && (n.clientid = this.client_id,
								n.type = "h5");
							var s = "";
							s = "0505" === this.ccode ? u.REPORT_API.TUDOU.TSLOG + "?" : u.REPORT_API.ALI.TSLOG + "?",
								s += o.default.urlParameter(n),
								o.default.sendlog(s),
								this.tsSn++
						}
					}
				}, {
					key: "tsInit",
					value: function() {
						this.tsSn = null,
							this.tsClb = 0,
							this.dClb = 0,
						this.drtimer && (clearInterval(this.drtimer),
							this.drtimer = null)
					}
				}, {
					key: "initAdInfo",
					value: function(t) {
						this._adInfo || (this._adInfo = {}),
							this._adInfo.REQID = t.REQID,
							this._adInfo.is_pread = 1
					}
				}, {
					key: "addPlayerDurationReport",
					value: function(t) {
						if (this._videoInfo) {
							p.default.i(this.TAG, "start addPlayerDurationReport ,the times is:" + t);
							var e = {};
							if (59 === t ? (e.is_pread = this._adInfo.is_pread || 0,
									e.REQID = this._adInfo.REQID || "NULL") : (e.is_pread = 0,
									e.REQID = "NULL"),
									62 === t ? (this._adInfo.REQID = "NULL",
										this._adInfo.is_pread = 0,
										e.replay = 1) : e.replay = 0,
									e.isRetry = this.isRetry,
								null == this.drtimer && 60 == t) {
								var i = this;
								e.rs = 1,
									e.is_pread = this._adInfo.is_pread || 0,
									e.REQID = this._adInfo.REQID || "NULL",
									this.drtimer = setInterval(function() {
										i._player.currentState !== h.YKP.PLAYER_STATE.PLAYING || i._mediaElement.paused || i.addPlayerDurationReport(60)
									}, 6e4)
							}
							61 == t && (clearInterval(this.drtimer),
								this.drtimer = null),
								e.viewUserId = this.pubParam.uid,
							this._vvlogconfig && this._vvlogconfig.pvid && (e.pvid = this._vvlogconfig.pvid),
								e.ct = this.pubParam.cateId,
								e.url = encodeURIComponent(window.location.href),
								e.referUrl = encodeURIComponent(document.referrer) || "",
								e.sid = this.pubParam.psid,
								e.videoid = this.pubParam.videoId,
								e.cs = this.pubParam.subcates,
								e.showid_v2 = this.pubParam.showId,
								e.Copyright = this.pubParam.Copyright,
								e.oct = this.pubParam.showChannelId || "",
								e.ocs = this.pubParam.ocs || "",
								e.winType = this.winType,
								e.videoOwnerId = this.pubParam.userid,
								e.totalsec = this.pubParam.totalsec,
								e.hd = this._getHDFlag(this._player.control.hd),
								e.langid = this._getLanguage(),
								e.format = this.pubParam.format,
								e.currentPlayTime = parseInt(this._player.currentTime || 0),
								e.frame = this.pubParam.frame,
								e.number = t,
								e.mtype = this.mtype,
								e.fullflag = this._player.control.fullscreen ? 1 : 0,
								e.ikuflag = "n",
								e.playComplete = 0,
							61 == t && (e.playComplete = 1),
								e.continuationPlay = this.pubParam.continous,
								e.pid = this.client_id || "",
								e.timestamp = (new Date).getTime(),
								e.unCookie = o.default.cookie.isCookie ? 1 : 0,
								e.ctype = this.ccode,
								e.oip = this.pubParam.ip,
								e.hwclass = 1,
								e.devicename = "pc",
								e.isp = this.pubParam.dma_code,
								e.isvip = this.pubParam.isvip,
								e.paystate = this.pubParam.paystate,
								e.playstate = this.pubParam.playstate,
								e.cna = this.cna,
								e.show_videotype = this.pubParam.show_videotype,
								e.show_topHdVideo = this.pubParam.videoId;
							var n = this._getCurLoadedBytes();
							e.currentLoadedBytes = n - this.dClb >= 0 ? n - this.dClb : n,
								this.dClb = n,
								this.pubParam.emb ? e.emb = this.pubParam.emb : "",
								e.Type = this.pubParam.Type,
							1 === this.pubParam.Type && (e.fid = this.pubParam.playListId,
								e.fct = this.pubParam.playListChannelId,
								e.fcs = this.pubParam.fcs,
								e.folderOwnerId = this.pubParam.folderOwnerId,
								e.fob = this.pubParam.fob,
								e.fpo = this.pubParam.fpo),
								e.stg = this.pubParam.stage;
							var a = "";
							a = "0505" === this.ccode ? u.REPORT_API.TUDOU.DURATIONLOG + "?" : u.REPORT_API.ALI.DURATIONLOG + "?",
								a += o.default.urlParameter(e);
							try {
								this.vvlogext || (this.vvlogext = UrchinAplus._yVvlogInfo() || ""),
									a = a + "&" + o.default.urlParameter(this.vvlogext)
							} catch (r) {}
							o.default.sendlog(a)
						}
					}
				}, {
					key: "sendUserActionReport",
					value: function(t, e, i, n) {
						var a = {
							t: 1002,
							e: t,
							v: e || "ac"
						};
						a.d = o.default.encode64(this.mtype);
						var r = {
							v: "h5player",
							vid: this.pubParam.videoId,
							uid: this.pubParam.uid,
							ssid: this.pubParam.psid,
							sid: this.pubParam.showId,
							ct: this.pubParam.cateId,
							cs: this.pubParam.subcates,
							tc: parseInt(this._player.currentTime) || 0,
							w: this._mediaElement.offsetWidth,
							h: this._mediaElement.offsetHeight
						};
						r.f = this._player.control.fullscreen ? "on" : "off",
							r.q = this._getQuality(),
							r.ver = "1.0.0";
						for (var s in i)
							r[s] = i[s];
						if (a.x = o.default.encode64(o.default.urlParameter(r)),
								a.cna = this.cna,
								o.default.urlParameter(a),
							"xenfs" == t || "xexfs" == t) {
							this._giveupReTag = !0;
							var l = this;
							setTimeout(function() {
								l._giveupReTag = !1
							}, 800)
						}
						try {
							this.vvlogext || (this.vvlogext = UrchinAplus._yVvlogInfo() || ""),
							this.vvlogext && (a.pc_i = this.vvlogext.pc_i,
								a.pc_u = this.vvlogext.pc_u)
						} catch (d) {}
						a.url = n ? n : "",
							"0505" === this.ccode ? o.default.sendlog(u.REPORT_API.TUDOU.EVENTLOG + "?" + o.default.urlParameter(a)) : o.default.sendlog(u.REPORT_API.ALI.EVENTLOG + "?" + o.default.urlParameter(a))
					}
				}, {
					key: "checkPlayerResize",
					value: function(t, e) {
						if (this._giveupReTag === !0)
							return debug.log("give up xre after enfs or exfs"),
								void 0;
						var i = this._mediaElement;
						this._resizeList = this._resizeList || [],
							this._resizeList.push({
								str: e,
								time: (new Date).getTime(),
								w: i.offsetWidth,
								h: i.offsetHeight
							});
						var n = this;
						setTimeout(function() {
							if (0 != n._resizeList.length) {
								for (var e = n._resizeList[0].time, i = 0; i < n._resizeList.length; i++) {
									var a = n._resizeList[i].w
										, r = n._resizeList[i].h
										, s = n._resizeList[i].time;
									(a != n.dimension.w || r != n.dimension.h) && (n.dimension.w = a,
										n.dimension.h = r,
									(s - e > 800 || i == n._resizeList.length - 1) && o.default.sendlog(t + n._resizeList[i].str))
								}
								n._resizeList = []
							}
						}, 1e3)
					}
				}, {
					key: "addPlayerStaticReport",
					value: function() {
						p.default.i(this.TAG, "start addPlayerStaticReport");
						var t = "//stat.youku.com/player/addPlayerStaticReport"
							, e = {};
						e.videoid = this.pubParam.videoId,
						this._videoInfo.token && (e.t = this._videoInfo.token.vv),
							e.totalsec = this.totalTime,
							e.ikuflag = "n_" + this.pubParam.showflag,
							e.url = escape(this._getParentUrl() ? this._getParentUrl() : window.location.href),
							e.fullflag = this._player.control.fullscreen,
							e.source = "video",
							e.referer = (this._vvlogconfig || "").rurl,
							e.sid = this.pubParam.psid,
							e.uid = this.pubParam.uid,
							e.h = m.default.hcbt(e.t),
							e.totalseg = this.pubParam.pieceLength;
						var i = o.default.urlParameter(e);
						o.default.sendlog(t + "?" + i)
					}
				}, {
					key: "sendUPSLog",
					value: function(t) {
						var e = {};
						e.psid = this.pubParam.psid,
							e.ups_client_netip = this.pubParam.ip,
							e.vid = this.pubParam.videoId,
							e.title = encodeURI(this.pubParam.title),
							e.ccode = this.ccode,
							e.uid = this.pubParam.uid || null,
							e.user_agent = encodeURI(navigator.userAgent),
							e.vip = this.pubParam.isvip,
							e.log_type = t;
						var i = o.default.urlParameter(e);
						this.sendGoldLog("/yt/youkuplayer.fdl.h5send", "EXP", i, "H1482418994")
					}
				}, {
					key: "sendErrorLog",
					value: function(t, e) {
						var i = {};
						i.track_view_code = t,
							i.utid = this.cna,
							i.ccode = this.ccode,
							i.ups_url = e.upsUrl,
							i.cdn_url = e.cdnUrl,
							i.m3u8_url = e.m3u8Url ? e.m3u8Url : "",
							i.error_type = e.errorType,
							i.error_code = e.errorCode || "",
							i.error_position = e.currentTime ? e.currentTime : 0,
							i.user_timestamp = (new Date).getTime(),
							i.userid = this.pubParam.userid ? this.pubParam.userid : "",
							i.vip = this.pubParam.isvip ? this.pubParam.isvip : 0,
							i.player_version = "H5";
						var n = o.default.urlParameter(i);
						this.sendGoldLog("/yt/youkuplayer.fdl.error", "EXP", n, "H1481495508")
					}
				}, {
					key: "sendGoldLog",
					value: function(t, e, i, n) {
						try {
							goldlog.record(t, e, i, n)
						} catch (a) {
							p.default.w(this.TAG, "goldLog:goldlog.record is error||url:" + t + "||param:" + i + "||logCode:" + n)
						}
					}
				}, {
					key: "createViewCode",
					value: function() {
						var t = "H"
							, e = (new Date).getTime() + "";
						return t += Math.round(1e10 * Math.random()),
							t += e.substr(7, 12)
					}
				}, {
					key: "_initParam",
					value: function() {
						if (this._videoInfo) {
							this._videoInfo.user ? (this.pubParam.uid = this._videoInfo.user.uid ? this._videoInfo.user.uid : 0,
								this.pubParam.isvip = this._videoInfo.user.vip ? 1 : 0) : (this.pubParam.uid = 0,
								this.pubParam.isvip = 0),
								this.pubParam.frame = this._vvlogconfig && this._vvlogconfig.frame ? 1 : 0,
								this.pubParam.continous = this._vvlogconfig && this._vvlogconfig.continous ? 1 : 0,
								this.pubParam.ip = this._videoInfo.ups.ups_client_netip,
								this.pubParam.psid = this._videoInfo.ups.psid,
								this.pubParam.videoId = this._videoInfo.video.id,
								this.pubParam.paystate = this._getPayState(this._videoInfo.show),
								this.pubParam.playstate = this._videoInfo.trial ? 2 : 1,
								this.pubParam.cateId = this._videoInfo.video.category_id || "",
								this.pubParam.subcates = this._getSubCategories(this._videoInfo.video.subcategories),
								this.pubParam.userid = this._videoInfo.video.userid ? this._videoInfo.video.userid : "",
								this.pubParam.title = this._videoInfo.video.title,
								this.pubParam.totalsec = this._videoInfo.video.seconds;
							var t = this._videoInfo.hdcodes.join(",");
							if (this.pubParam.format = t.indexOf("hd3") > -1 ? 3 : t.indexOf("hd2") > -1 ? 2 : t.indexOf("mp4hd,") ? 1 : 0,
									this._videoInfo.show ? (this.pubParam.showflag = "1",
										this.pubParam.showId = this._videoInfo.show.id || "",
										this.pubParam.Copyright = this._videoInfo.show.copyright || 0,
										this.pubParam.stage = this._videoInfo.show.stage ? this._videoInfo.show.stage : 0,
										this.pubParam.show_videotype = this._videoInfo.show.video_type,
										this.pubParam.showChannelId = this.pubParam.cateId,
										this.pubParam.ocs = this.pubParam.subcates) : (this.pubParam.showId = "",
										this.pubParam.showflag = "0",
										this.pubParam.Copyright = 0,
										this.pubParam.stage = 0,
										this.pubParam.show_videotype = 1),
									this.pubParam.Type = 0,
									this._videoInfo.album) {
								var e = this._videoInfo.album;
								this.pubParam.Type = 1,
									this.pubParam.playListId = e.id,
									this.pubParam.folderOwnerId = e.owner_id,
									this.pubParam.fob = this._vvlogconfig && this._vvlogconfig.order ? this._vvlogconfig.order : 1,
									this.pubParam.fpo = 0,
								player._videoInfo.videos && (this.pubParam.fpo = player._videoInfo.videos.next ? parseInt(player._videoInfo.videos.next.seq) - 1 : player._videoInfo.videos.previous ? parseInt(player._videoInfo.videos.previous.seq) : 0),
									this.pubParam.fcs = this.pubParam.subcates,
									this.pubParam.playListChannelId = this.pubParam.cateId,
									this.pubParam.stage = e.total
							}
							this._isThirdParty && (this.pubParam.emb = this._getEmb(this.pubParam.ip, this.pubParam.videoId)),
								this.pubParam.dma_code = this._videoInfo.network ? this._videoInfo.network.dma_code : "",
								this.pieceLength = "m3u8" === this.supportType ? 1 : this._videoInfo.stream[this._player.control.lang][this._player.control.hd].length
						}
					}
				}, {
					key: "_getParentUrl",
					value: function() {
						var t = null;
						if (parent !== window)
							try {
								t = parent.location.href
							} catch (e) {
								t = document.referrer
							}
						return t
					}
				}, {
					key: "_getMType",
					value: function() {
						return d.default.android ? d.default.isAndroid4 ? "adr4" : "adr" : d.default.isIphone ? "iph" : d.default.isIpad ? "ipa" : d.default.isIpod ? "ipo" : "oth"
					}
				}, {
					key: "_getQuality",
					value: function() {
						if ("m3u8" != this.supportType)
							return "m";
						var t = this._player.control.hd;
						return -1 !== t.indexOf("mp4hd") ? "m" : -1 !== t.indexOf("flvhd") ? "f" : -1 !== t.indexOf("mp4hd2") ? "h" : void 0
					}
				}, {
					key: "_signTS",
					value: function(t) {
						if (null == t)
							return 0;
						var e, i = 0, n = t.length;
						for (e = 0; n > e; e++)
							i = 43 * i + t.charCodeAt(e),
								i %= 1e10;
						return i
					}
				}, {
					key: "_getHDFlag",
					value: function(t) {
						var e = {
							flv: 0,
							flvhd: 0,
							"3gphd": 0,
							mp4hd: 1,
							mp4hd2: 2,
							mp4hd3: 3
						};
						return e[t] ? e[t] : 1
					}
				}, {
					key: "_getLanguage",
					value: function(t) {
						return t || (t = this._player.control.lang),
							u.LANGMAP[t] ? u.LANGMAP[t].num : 1
					}
				}, {
					key: "_getPlayTime",
					value: function() {
						var t = 0;
						return t = this.tsSn > 24 ? 180 + 20 * (this.tsSn - 24) : this.tsSn > 12 ? 60 + 10 * (this.tsSn - 12) : 5 * this.tsSn
					}
				}, {
					key: "_getExtString",
					value: function(t) {
						var e = {};
						e.iku = "n",
							e.full = this._player.control.fullscreen ? 1 : 0,
							e.lang = this._getLanguage(),
							e.num = t,
							e.ctp = 0,
							e.pc = 60 == t ? 0 : 1,
							e.clb = 0,
							e.ctype = this.ccode,
							e.ev = "1",
							e.isvip = this.pubParam.isvip,
							e.paystate = this.pubParam.paystate,
							e.playstate = this.pubParam.playstate;
						var i = this.cna;
						return e.cna = i ? i : "",
							escape(o.default.urlParameter(e))
					}
				}, {
					key: "_getPayState",
					value: function(t) {
						var e = 0;
						if (!t || !t.pay_type)
							return 0;
						var i = t.pay_type.join("");
						return i.indexOf("vod") > -1 ? e = 1 : i.indexOf("mon") > -1 ? e = 2 : e
					}
				}, {
					key: "_getSubCategories",
					value: function(t) {
						if (!t)
							return "";
						for (var e = "", i = 0; i < t.length; i++)
							e += t[i].id + "|";
						return e.substring(0, e.length - 1)
					}
				}, {
					key: "_getCurLoadedBytes",
					value: function() {
						var t = this._player.mediaElement
							, e = t.buffered
							, i = e.length
							, n = 0;
						try {
							for (var a = this._videoInfo.stream[this._player.control.lang][this._player.control.hd].size, r = this.pubParam.totalsec, s = 0; i > s; s++) {
								var o = e.end(s) - e.start(s);
								n += o / r * a
							}
						} catch (l) {}
						return parseInt(n)
					}
				}, {
					key: "_getEmb",
					value: function(t, e) {
						var i = location.host
							, n = location.pathname
							, a = [];
						a.push(t),
							a.push(e),
							a.push(i),
							a.push(n);
						var r = a.join(" ");
						return o.default.encode64(r)
					}
				}]),
					t
			}();
			e.default = _
		}
		, function(t, e) {
			function i(t) {
				function e(t, e) {
					var i = t << e | t >>> 32 - e;
					return i
				}
				
				function i(t) {
					var e, i, n = "";
					for (e = 7; e >= 0; e--)
						i = 15 & t >>> 4 * e,
							n += i.toString(16);
					return n
				}
				
				function n(t) {
					t = t.replace(/\r\n/g, "\n");
					for (var e = "", i = 0; i < t.length; i++) {
						var n = t.charCodeAt(i);
						128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(192 | n >> 6),
							e += String.fromCharCode(128 | 63 & n)) : (e += String.fromCharCode(224 | n >> 12),
							e += String.fromCharCode(128 | 63 & n >> 6),
							e += String.fromCharCode(128 | 63 & n))
					}
					return e
				}
				
				var a, r, s, o, l, d, u, h, c, p = new Array(80), f = 1732584193, m = 4023233417, _ = 2562383102, v = 271733878,
					g = 3285377520;
				t = n(t);
				var y = t.length
					, E = new Array;
				for (r = 0; y - 3 > r; r += 4)
					s = t.charCodeAt(r) << 24 | t.charCodeAt(r + 1) << 16 | t.charCodeAt(r + 2) << 8 | t.charCodeAt(r + 3),
						E.push(s);
				switch (y % 4) {
					case 0:
						r = 2147483648;
						break;
					case 1:
						r = 8388608 | t.charCodeAt(y - 1) << 24;
						break;
					case 2:
						r = 32768 | (t.charCodeAt(y - 2) << 24 | t.charCodeAt(y - 1) << 16);
						break;
					case 3:
						r = 128 | (t.charCodeAt(y - 3) << 24 | t.charCodeAt(y - 2) << 16 | t.charCodeAt(y - 1) << 8)
				}
				for (E.push(r); 14 != E.length % 16;)
					E.push(0);
				for (E.push(y >>> 29),
					     E.push(4294967295 & y << 3),
					     a = 0; a < E.length; a += 16) {
					for (r = 0; 16 > r; r++)
						p[r] = E[a + r];
					for (r = 16; 79 >= r; r++)
						p[r] = e(p[r - 3] ^ p[r - 8] ^ p[r - 14] ^ p[r - 16], 1);
					for (o = f,
						     l = m,
						     d = _,
						     u = v,
						     h = g,
						     r = 0; 19 >= r; r++)
						c = 4294967295 & e(o, 5) + (l & d | ~l & u) + h + p[r] + 1518500249,
							h = u,
							u = d,
							d = e(l, 30),
							l = o,
							o = c;
					for (r = 20; 39 >= r; r++)
						c = 4294967295 & e(o, 5) + (l ^ d ^ u) + h + p[r] + 1859775393,
							h = u,
							u = d,
							d = e(l, 30),
							l = o,
							o = c;
					for (r = 40; 59 >= r; r++)
						c = 4294967295 & e(o, 5) + (l & d | l & u | d & u) + h + p[r] + 2400959708,
							h = u,
							u = d,
							d = e(l, 30),
							l = o,
							o = c;
					for (r = 60; 79 >= r; r++)
						c = 4294967295 & e(o, 5) + (l ^ d ^ u) + h + p[r] + 3395469782,
							h = u,
							u = d,
							d = e(l, 30),
							l = o,
							o = c;
					f = 4294967295 & f + o,
						m = 4294967295 & m + l,
						_ = 4294967295 & _ + d,
						v = 4294967295 & v + u,
						g = 4294967295 & g + h
				}
				var c = i(f) + i(m) + i(_) + i(v) + i(g);
				return c.toLowerCase()
			}
			
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var n = {
				hcbt: function(t) {
					var e = "";
					return e = this.genH(t)
				},
				genH: function(t) {
					for (var e = !1, n = void 0, a = ""; !e;) {
						a = this.randomString(20);
						var r = t + a;
						n = i(r),
						"00" == n.substring(0, 2) && (e = !0)
					}
					return a
				},
				randomString: function(t) {
					for (var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", i = "", n = 0; t > n; n++) {
						var a = Math.floor(Math.random() * e.length);
						i += e.substring(a, a + 1)
					}
					return i
				}
			};
			e.default = n
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				hexcase: 0,
				b64pad: "",
				chrsz: 8,
				hex_md5: function(t) {
					return this.binl2hex(this.core_md5(this.str2binl(t), t.length * this.chrsz))
				},
				b64_md5: function(t) {
					return this.binl2b64(this.core_md5(this.str2binl(t), t.length * this.chrsz))
				},
				hex_hmac_md5: function(t, e) {
					return this.binl2hex(this.core_hmac_md5(t, e))
				},
				b64_hmac_md5: function(t, e) {
					return this.binl2b64(this.core_hmac_md5(t, e))
				},
				calcMD5: function(t) {
					return this.binl2hex(this.core_md5(this.str2binl(t), t.length * this.chrsz))
				},
				md5_vm_test: function() {
					return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc")
				},
				core_md5: function(t, e) {
					t[e >> 5] |= 128 << e % 32,
						t[(e + 64 >>> 9 << 4) + 14] = e;
					for (var i = 1732584193, n = -271733879, a = -1732584194, r = 271733878, s = 0; s < t.length; s += 16) {
						var o = i
							, l = n
							, d = a
							, u = r;
						i = this.md5_ff(i, n, a, r, t[s + 0], 7, -680876936),
							r = this.md5_ff(r, i, n, a, t[s + 1], 12, -389564586),
							a = this.md5_ff(a, r, i, n, t[s + 2], 17, 606105819),
							n = this.md5_ff(n, a, r, i, t[s + 3], 22, -1044525330),
							i = this.md5_ff(i, n, a, r, t[s + 4], 7, -176418897),
							r = this.md5_ff(r, i, n, a, t[s + 5], 12, 1200080426),
							a = this.md5_ff(a, r, i, n, t[s + 6], 17, -1473231341),
							n = this.md5_ff(n, a, r, i, t[s + 7], 22, -45705983),
							i = this.md5_ff(i, n, a, r, t[s + 8], 7, 1770035416),
							r = this.md5_ff(r, i, n, a, t[s + 9], 12, -1958414417),
							a = this.md5_ff(a, r, i, n, t[s + 10], 17, -42063),
							n = this.md5_ff(n, a, r, i, t[s + 11], 22, -1990404162),
							i = this.md5_ff(i, n, a, r, t[s + 12], 7, 1804603682),
							r = this.md5_ff(r, i, n, a, t[s + 13], 12, -40341101),
							a = this.md5_ff(a, r, i, n, t[s + 14], 17, -1502002290),
							n = this.md5_ff(n, a, r, i, t[s + 15], 22, 1236535329),
							i = this.md5_gg(i, n, a, r, t[s + 1], 5, -165796510),
							r = this.md5_gg(r, i, n, a, t[s + 6], 9, -1069501632),
							a = this.md5_gg(a, r, i, n, t[s + 11], 14, 643717713),
							n = this.md5_gg(n, a, r, i, t[s + 0], 20, -373897302),
							i = this.md5_gg(i, n, a, r, t[s + 5], 5, -701558691),
							r = this.md5_gg(r, i, n, a, t[s + 10], 9, 38016083),
							a = this.md5_gg(a, r, i, n, t[s + 15], 14, -660478335),
							n = this.md5_gg(n, a, r, i, t[s + 4], 20, -405537848),
							i = this.md5_gg(i, n, a, r, t[s + 9], 5, 568446438),
							r = this.md5_gg(r, i, n, a, t[s + 14], 9, -1019803690),
							a = this.md5_gg(a, r, i, n, t[s + 3], 14, -187363961),
							n = this.md5_gg(n, a, r, i, t[s + 8], 20, 1163531501),
							i = this.md5_gg(i, n, a, r, t[s + 13], 5, -1444681467),
							r = this.md5_gg(r, i, n, a, t[s + 2], 9, -51403784),
							a = this.md5_gg(a, r, i, n, t[s + 7], 14, 1735328473),
							n = this.md5_gg(n, a, r, i, t[s + 12], 20, -1926607734),
							i = this.md5_hh(i, n, a, r, t[s + 5], 4, -378558),
							r = this.md5_hh(r, i, n, a, t[s + 8], 11, -2022574463),
							a = this.md5_hh(a, r, i, n, t[s + 11], 16, 1839030562),
							n = this.md5_hh(n, a, r, i, t[s + 14], 23, -35309556),
							i = this.md5_hh(i, n, a, r, t[s + 1], 4, -1530992060),
							r = this.md5_hh(r, i, n, a, t[s + 4], 11, 1272893353),
							a = this.md5_hh(a, r, i, n, t[s + 7], 16, -155497632),
							n = this.md5_hh(n, a, r, i, t[s + 10], 23, -1094730640),
							i = this.md5_hh(i, n, a, r, t[s + 13], 4, 681279174),
							r = this.md5_hh(r, i, n, a, t[s + 0], 11, -358537222),
							a = this.md5_hh(a, r, i, n, t[s + 3], 16, -722521979),
							n = this.md5_hh(n, a, r, i, t[s + 6], 23, 76029189),
							i = this.md5_hh(i, n, a, r, t[s + 9], 4, -640364487),
							r = this.md5_hh(r, i, n, a, t[s + 12], 11, -421815835),
							a = this.md5_hh(a, r, i, n, t[s + 15], 16, 530742520),
							n = this.md5_hh(n, a, r, i, t[s + 2], 23, -995338651),
							i = this.md5_ii(i, n, a, r, t[s + 0], 6, -198630844),
							r = this.md5_ii(r, i, n, a, t[s + 7], 10, 1126891415),
							a = this.md5_ii(a, r, i, n, t[s + 14], 15, -1416354905),
							n = this.md5_ii(n, a, r, i, t[s + 5], 21, -57434055),
							i = this.md5_ii(i, n, a, r, t[s + 12], 6, 1700485571),
							r = this.md5_ii(r, i, n, a, t[s + 3], 10, -1894986606),
							a = this.md5_ii(a, r, i, n, t[s + 10], 15, -1051523),
							n = this.md5_ii(n, a, r, i, t[s + 1], 21, -2054922799),
							i = this.md5_ii(i, n, a, r, t[s + 8], 6, 1873313359),
							r = this.md5_ii(r, i, n, a, t[s + 15], 10, -30611744),
							a = this.md5_ii(a, r, i, n, t[s + 6], 15, -1560198380),
							n = this.md5_ii(n, a, r, i, t[s + 13], 21, 1309151649),
							i = this.md5_ii(i, n, a, r, t[s + 4], 6, -145523070),
							r = this.md5_ii(r, i, n, a, t[s + 11], 10, -1120210379),
							a = this.md5_ii(a, r, i, n, t[s + 2], 15, 718787259),
							n = this.md5_ii(n, a, r, i, t[s + 9], 21, -343485551),
							i = this.safe_add(i, o),
							n = this.safe_add(n, l),
							a = this.safe_add(a, d),
							r = this.safe_add(r, u)
					}
					return Array(i, n, a, r)
				},
				md5_cmn: function(t, e, i, n, a, r) {
					return this.safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(n, r)), a), i)
				},
				md5_ff: function(t, e, i, n, a, r, s) {
					return this.md5_cmn(e & i | ~e & n, t, e, a, r, s)
				},
				md5_gg: function(t, e, i, n, a, r, s) {
					return this.md5_cmn(e & n | i & ~n, t, e, a, r, s)
				},
				md5_hh: function(t, e, i, n, a, r, s) {
					return this.md5_cmn(e ^ i ^ n, t, e, a, r, s)
				},
				md5_ii: function(t, e, i, n, a, r, s) {
					return this.md5_cmn(i ^ (e | ~n), t, e, a, r, s)
				},
				core_hmac_md5: function(t, e) {
					var i = this.str2binl(t);
					i.length > 16 && (i = core_md5(i, t.length * this.chrsz));
					for (var n = Array(16), a = Array(16), r = 0; 16 > r; r++)
						n[r] = 909522486 ^ i[r],
							a[r] = 1549556828 ^ i[r];
					var s = this.core_md5(n.concat(this.str2binl(e)), 512 + e.length * this.chrsz);
					return this.core_md5(a.concat(s), 640)
				},
				safe_add: function(t, e) {
					var i = (65535 & t) + (65535 & e)
						, n = (t >> 16) + (e >> 16) + (i >> 16);
					return n << 16 | 65535 & i
				},
				bit_rol: function(t, e) {
					return t << e | t >>> 32 - e
				},
				str2binl: function(t) {
					for (var e = Array(), i = (1 << this.chrsz) - 1, n = 0; n < t.length * this.chrsz; n += this.chrsz)
						e[n >> 5] |= (t.charCodeAt(n / this.chrsz) & i) << n % 32;
					return e
				},
				binl2hex: function(t) {
					for (var e = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++)
						i += e.charAt(15 & t[n >> 2] >> 8 * (n % 4) + 4) + e.charAt(15 & t[n >> 2] >> 8 * (n % 4));
					return i
				},
				binl2b64: function(t) {
					for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", n = 0; n < 4 * t.length; n += 3)
						for (var a = (255 & t[n >> 2] >> 8 * (n % 4)) << 16 | (255 & t[n + 1 >> 2] >> 8 * ((n + 1) % 4)) << 8 | 255 & t[n + 2 >> 2] >> 8 * ((n + 2) % 4), r = 0; 4 > r; r++)
							i += 8 * n + 6 * r > 32 * t.length ? this.b64pad : e.charAt(63 & a >> 6 * (3 - r));
					return i
				}
			};
			e.default = i
		}
		, function(t, e) {
			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			var i = {
				version: "1.1.7",
				date: "2017.06.20",
				key: "h5CoreVersion"
			};
			e.default = i
		}
		, function(t, e, i) {
			function n(t) {
				return t && t.__esModule ? t : {
					"default": t
				}
			}
			
			var a = i(1)
				, r = n(a)
				, s = i(15)
				, o = n(s);
			window.YKPlayer = {},
				YKPlayer.createPlayer = function(t, e) {
					var i = r.default.get("#" + t)
						, n = i.getElementsByClassName("td-h5__player__video")[0]
						, a = new o.default(n, e, i);
					return a
				}
		}
	]),
	define("h5/vendor/tudouplayer", function() {
	}),
	function(t) {
		function e(t) {
			return !isNaN(parseFloat(t)) && isFinite(t)
		}
		
		function i(t) {
			return decodeURIComponent(t.replace(/\+/g, " "))
		}
		
		function n(t, n) {
			var a = n || window.location.toString();
			if (!t)
				return a;
			t = t.toString(),
				"//" === a.substring(0, 2) ? a = "http:" + a : 1 === a.split("://").length && (a = "http://" + a),
				n = a.split("/");
			var r = {
				auth: ""
			}
				, s = n[2].split("@");
			1 === s.length ? s = s[0].split(":") : (r.auth = s[0],
				s = s[1].split(":")),
				r.protocol = n[0],
				r.hostname = s[0],
				r.port = s[1] || ("https" === r.protocol.split(":")[0].toLowerCase() ? "443" : "80"),
				r.pathname = (n.length > 3 ? "/" : "") + n.slice(3, n.length).join("/").split("?")[0].split("#")[0];
			var o = r.pathname;
			"/" === o.charAt(o.length - 1) && (o = o.substring(0, o.length - 1));
			var l = r.hostname
				, d = l.split(".")
				, u = o.split("/");
			if ("hostname" === t)
				return l;
			if ("domain" === t)
				return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(l) ? l : d.slice(-2).join(".");
			if ("sub" === t)
				return d.slice(0, d.length - 2).join(".");
			if ("port" === t)
				return r.port;
			if ("protocol" === t)
				return r.protocol.split(":")[0];
			if ("auth" === t)
				return r.auth;
			if ("user" === t)
				return r.auth.split(":")[0];
			if ("pass" === t)
				return r.auth.split(":")[1] || "";
			if ("path" === t)
				return r.pathname;
			if ("." === t.charAt(0)) {
				if (t = t.substring(1),
						e(t))
					return t = parseInt(t, 10),
					d[0 > t ? d.length + t : t - 1] || ""
			} else {
				if (e(t))
					return t = parseInt(t, 10),
					u[0 > t ? u.length + t : t] || "";
				if ("file" === t)
					return u.slice(-1)[0];
				if ("filename" === t)
					return u.slice(-1)[0].split(".")[0];
				if ("fileext" === t)
					return u.slice(-1)[0].split(".")[1] || "";
				if ("?" === t.charAt(0) || "#" === t.charAt(0)) {
					var h = a
						, c = null;
					if ("?" === t.charAt(0) ? h = (h.split("?")[1] || "").split("#")[0] : "#" === t.charAt(0) && (h = h.split("#")[1] || ""),
							!t.charAt(1))
						return h ? i(h) : h;
					t = t.substring(1),
						h = h.split("&");
					for (var p = 0, f = h.length; f > p; p++)
						if (c = h[p].split("="),
							c[0] === t)
							return (c[1] ? i(c[1]) : c[1]) || "";
					return null
				}
			}
			return ""
		}
		
		t.extend({
			url: function(t, e) {
				return n(t, e)
			}
		})
	}(jQuery),
	define("lib/plugin/url", function() {
	}),
(window.jQuery || window.Zepto) && function(t) {
	t.fn.Swipe = function(e) {
		return this.each(function() {
			t(this).data("Swipe", new Swipe(t(this)[0], e))
		})
	}
}(window.jQuery || window.Zepto),
	define("h5/vendor/swipe", function() {
	}),
	define("h5/play/h5player", ["lib/util/cookie", "lib/gallery/jsmart", "h5/tpljs/playerrel", "h5/vendor/tudouplayer", "lib/plugin/url", "h5/vendor/swipe"], function(t, e, i) {
		var n = $.url("?adfrom");
		$.url("?pub");
		var a = "sem" === n || "tdrelated" === n ? !0 : !1
			, r = 30;
		"sem" === n && (r = 10);
		var s = window.navigator.userAgent.toLowerCase().match(/youku/i)
			, o = "316869" === window.playGlobal.showid && s ? !0 : !1
			, l = {
			videoId: "",
			ccode: "0505",
			client_id: "youkumobileplaypage",
			control: {
				laguange: "",
				hd: "mp4hd",
				autoplay: o
			},
			logconfig: {},
			adConfig: {},
			password: "",
			wintype: "",
			type: "",
			limitPlay: {
				ifLimitPlay: a,
				limitTime: r
			}
		}
			, d = {
			init: function() {
				return this.node = $('[data-js="player-box"]'),
					this.node.length ? (this.shid = parseInt(this.node.attr("data-shid")) ? this.node.attr("data-shid") : "",
						this.fid = this.node.attr("data-fid") ? this.node.attr("data-fid") : "",
						l.videoId = window.playGlobal.viden,
						l.control.playerType = window.playGlobal.userid && 112482077 === window.playGlobal.userid ? "mp4" : "",
						this.player = YKPlayer.createPlayer("player", l),
						this.video = this.node.find("video")[0],
						this.orientation(),
						this.initRel(),
						this.bind(),
						void 0) : !1
			},
			bind: function() {
				var e = this
					, i = t.get("__ysuid")
					, n = l.videoId
					, a = this.shid ? this.shid : ""
					, r = this.fid ? this.fid : "";
				this.node.on("click", ".td-h5__player__playinit", function() {
					function t(t) {
						var e = new Image;
						e.src = t,
							e.onload = function() {
							}
					}
					
					var e = "//apis.tudou.com/proxy/playlog/v1/add?uid=" + i + "&idType=guid&vid=" + n;
					a && (e = e + "&shid=" + a),
					r && (e = e + "&fid=" + r),
						e += "&point=0&hwclass=4&devicename=phone",
						t(e)
				}),
					window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
						e.orientation()
					}, !1)
			},
			fullScreen: function(t) {
				var e = "webkit";
				return t[e + "EnterFullScreen"] ? e + "EnterFullScreen" : t[e + "RequestFullScreen"] ? e + "RequestFullScreen" : !1
			},
			autoFullScreen: function(t) {
				var e = navigator.userAgent.toLowerCase();
				"android" === String(e.match(/android/i));
				var i = t
					, n = document
					, a = this.fullscreen(n.createElement("video"));
				return a ? (i.addEventListener("pause", function() {
					this.play()
				}, !1),
					i.addEventListener("webkitfullscreenchange", function() {
						n.webkitIsFullScreen || this.pause()
					}, !1),
					i.addEventListener("ended", function() {
						n.webkitCancelFullScreen()
					}, !1),
					void 0) : (alert("不支持全屏模式"),
					!1)
			},
			orientation: function() {
				(180 === window.orientation || 0 === window.orientation) && ($("body").removeClass("fullScreen"),
					console.log("竖屏状态！")),
				(90 === window.orientation || -90 === window.orientation) && ($("body").addClass("fullScreen"),
					console.log("横屏状态！"))
			},
			initRel: function() {
				var t = $('[data-js="player-recommends"]');
				if (!t.length)
					return !1;
				var n, a, r, s = this, o = new e(i);
				$.ajax({
					url: "/v/" + window.playGlobal.viden + "/reco/h5/ajax",
					dataType: "json",
					data: {
						pl: 8
					},
					success: function(e) {
						1 === e.code ? (r = e.html,
							r.pagenum = Math.ceil(e.html.list.length / 2),
							n = o.fetch(r),
							a = $(n),
							t.append(a),
							s.bindSwipe()) : console.log(e.msg)
					},
					error: function() {
						console.log("接口错误")
					}
				})
			},
			bindSwipe: function() {
				Swipe(document.getElementById("slider"), {
					auto: 0,
					continuous: !0,
					callback: function(e) {
						for (var i = t.length; i--;)
							t[i].className = " ";
						t[e].className = "on"
					}
				});
				var t = document.getElementById("position").getElementsByTagName("i");
				$("#td-h5").on("click", '[data-js="player-rel-item"]', function() {
					var t = $(this).attr("from")
						, e = $(this).attr("iden")
						, i = ""
						, n = $(this).attr("pub");
					window.Appguide.dealAppBtn(t, e, i, n)
				})
			}
		};
		return d
	}),
	define("h5/play/relatedvideos", ["lib/plugin/url"], function() {
		var t = "/v/" + window.playGlobal.viden + "/reco/h5"
			, e = {
			init: function() {
				return this.node = $('[data-js="relatedvideos"]'),
					this.node.length ? (this.getTemple(),
						this.bind(),
						void 0) : !1
			},
			bind: function() {
				$("#td-h5").on("click", '[data-js="relatedvideos-item"]', function() {
					var t = $(this).attr("from")
						, e = $(this).attr("iden")
						, i = ""
						, n = $(this).attr("pub");
					window.Appguide.dealAppBtn(t, e, i, n)
				})
			},
			getTemple: function() {
				var e = this
					, i = $.url("?recoid")
					, n = $.url("?itemid");
				$.ajax({
					url: t,
					dataType: "json",
					data: {
						pl: 8,
						recoid: i ? i : "",
						itemid: n ? n : ""
					},
					success: function(t) {
						1 === t.code ? e.node.html(t.html) : console.log(t.msg)
					},
					error: function() {
						console.log("接口错误")
					}
				})
			}
		};
		return e
	}),
	define("h5/tpljs/playlist", [], function() {
		var t = '<div class="td-h5__box__head">                    <div class="td-h5__box__head__title">{$boxtitle}{if !$showId}<span class="td-h5__box__head__subtitle">{$title}</span>{/if}</div>                    <div class="td-h5__box__head__extand">                        <span class="td-h5__box__head__extand__highlight">{if $episode_last}更新至{$episode_last}{else}{$curIndex+1}{/if}</span>/{$episode_total}                    </div>                </div>                <div class="td-h5__box__body">                    <div class="td-h5__play__list" id="playlist">                        <div class="td-h5__play__list__items" data-js="playlist-items" style="">                            {if $isMoreBefore}                            <a class="td-h5__play__list__more" data-js="playlist-item" pub="ead8f6057c05283d">                                <div class="td-h5__play__list__more__txt"></div>                                <div class="td-h5__play__list__more__btn">立即体验</div>                            </a>                            {/if}                            {foreach $videos as $item}                            {if $item@index < 21}                            <a class="td-h5__play__list__item{if $item.videoid == $curVideoId} active{/if}" data-js="playlist-item" from="play" iden="{$item.videoid}" pub="ead8f6057c05283d" data-spm-click="gostr=/yt/newtudou.h5.detailPlaylistDL;locaid=dvideo_down">                                <div class="td-h5__play__list__item__title {if $showId}show{/if}">{$item.title}</div>                                {if $showId}<div class="td-h5__play__list__item__subtitle"><i class="td-h5__ico__playnum"></i><span >{$item.total_vv_fmt}</span></div>{/if}                            </a>                            {/if}                            {/foreach}                            {if $isMoreAfter}                            <a class="td-h5__play__list__more" data-js="playlist-item" pub="ead8f6057c05283d">                                <div class="td-h5__play__list__more__txt"></div>                                <div class="td-h5__play__list__more__btn">立即体验</div>                            </a>                            {/if}                        </div>                    </div>                </div>';
		return t
	}),
	define("h5/play/playlist", ["lib/gallery/jsmart", "h5/tpljs/playlist"], function(t, e) {
		var i = "/play/h5/choose"
			, n = {
			init: function() {
				return this.node = $('[data-js="playlist"]'),
					this.node.length ? (this.type = this.node.attr("data-type"),
						this.id = this.node.attr("data-id"),
						this.initDom(),
						this.bind(),
						void 0) : !1
			},
			bind: function() {
				$("#td-h5").on("click", '[data-js="playlist-item"]', function() {
					var t = $(this).attr("from")
						, e = $(this).attr("iden")
						, i = ""
						, n = $(this).attr("pub");
					window.Appguide.dealAppBtn(t, e, i, n)
				})
			},
			initDom: function() {
				var n, a, r, s, o = this, l = new t(e), d = {};
				"show" === this.type ? (d.showId = this.id,
					s = "选集") : "playlist" === this.type ? (d.playListId = this.id,
					s = "播单") : "topic" === this.type && (d.topicId = this.id,
					s = "播单"),
					$.ajax({
						url: i,
						dataType: "json",
						data: d,
						success: function(t) {
							if (1 === t.code) {
								r = t.html.result,
									r.boxtitle = s,
									r.curVideoId = window.playGlobal.viden,
								r.episode_last && (r.videos = r.videos.reverse());
								for (var e = 0; e < r.videos.length; e++)
									r.playlistId && (r.videos[e].videoid = r.videos[e].videoId),
									r.videos[e].videoid === window.playGlobal.viden && (r.curIndex = e);
								var i, d;
								r.curIndex <= 10 ? (i = 0,
									r.isMoreBefore = !1) : (i = r.curIndex - 10,
									r.isMoreBefore = !0),
									r.episode_total - 1 - r.curIndex <= 10 ? (d = r.episode_total,
										r.isMoreAfter = !1) : (d = r.curIndex + 10,
										r.isMoreAfter = !0),
									r.videos = r.videos.slice(i, d + 1),
									r.videoslen = r.videos.length,
									n = l.fetch(r),
									a = $(n),
									o.node.append(a),
									o.countWidth(),
									o.initCurPos()
							} else
								console.log(t.msg)
						},
						error: function() {
							console.log("接口错误")
						}
					})
			},
			countWidth: function() {
				var t = parseInt($(".td-h5__play__list__item").length)
					, e = parseInt($(".td-h5__play__list__more").length)
					, i = parseFloat(t ? $(".td-h5__play__list__item").outerWidth(!0) : 0)
					, n = parseFloat(e ? $(".td-h5__play__list__more").outerWidth(!0) : 0)
					, a = 2 * parseFloat($('[data-js="playlist-items"]').css("padding-left"))
					, r = Math.ceil(i * t + n * e + a) + 10;
				$('[data-js="playlist-items"]').css("width", r)
			},
			initCurPos: function() {
				var t, e = $("#playlist");
				$(".td-h5__play__list__item").each(function() {
					$(this).hasClass("active") && (t = $(this))
				});
				var i = t.offset().left - 18;
				e.scrollLeft(i)
			}
		};
		return n
	}),
	define("h5/common/share", [], function() {
		var t = {
			link: location.href,
			desc: document.getElementsByTagName("title")[0].text + " " + location.href,
			title: document.getElementsByTagName("title")[0].text,
			imgUrl: document.getElementsByTagName("img")[0].src
		}
			, e = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
			, i = {
			WXCONFIG: {
				appId: "",
				timestamp: "",
				nonceStr: "",
				signature: ""
			},
			CONFING: {
				IS_IOS: !1,
				IS_ANDROID: !1,
				IN_DD: window.navigator.userAgent.toLowerCase().indexOf("dingtalk") > -1 ? !0 : !1,
				IN_WX: window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 ? !0 : !1,
				IN_WB: window.navigator.userAgent.toLowerCase().indexOf("weibo") > -1 ? !0 : !1,
				YoukuJSBridge: navigator.userAgent.toLowerCase().indexOf("bridge_sdk") || ""
			},
			shareConfig: t,
			init: function(t) {
				this.CONFING.IS_IOS = this.isIos(),
					this.CONFING.IS_ANDROID = this.isAndroid(),
					this.initShare(t)
			},
			initShare: function(t) {
				this.CONFING.IN_WX && this.handleWeixinShare(t)
			},
			handleShareImgonly: function(t, e) {
				t || (t = this.shareConfig),
					this.CONFING.IN_WX ? (this.handleWeixinShare(t),
					e && this.shareGuideMask(e)) : this.CONFING.IN_WB ? this.handleWeiboShare(t) : this.CONFING.IS_IOS && this.CONFING.YoukuJSBridge > -1 ? this.handleYoukuIosShare(1, t) : this.CONFING.IS_ANDROID && this.CONFING.YoukuJSBridge > -1 ? this.handleYoukuAndroidShare(1, t) : e && this.shareGuideMask(e)
			},
			handleShareLink: function(t, e) {
				t || (t = this.shareConfig),
					this.CONFING.IN_WX ? (this.handleWeixinShare(t),
					e && this.shareGuideMask(e)) : this.CONFING.IN_WB ? this.handleWeiboShare(t) : this.CONFING.IS_IOS && this.CONFING.YoukuJSBridge > -1 ? this.handleYoukuIosShare(0, t) : this.CONFING.IS_ANDROID && this.CONFING.YoukuJSBridge > -1 ? this.handleYoukuAndroidShare(0, t) : e && this.shareGuideMask(e)
			},
			handleWeixinShare: function(t) {
				t || (t = this.shareConfig),
					wx.config({
						debug: !1,
						jsApiList: e
					}),
					wx.ready(function() {
						wx.onMenuShareTimeline(t),
							wx.onMenuShareAppMessage(t),
							wx.onMenuShareQQ(t),
							wx.onMenuShareWeibo(t),
							wx.onMenuShareQZone(t)
					}),
					wx.error(function() {
					})
			},
			handleWeiboShare: function(t) {
				t || (t = this.shareConfig);
				var e = t.title
					, i = t.link
					, n = t.imgUrl;
				location.href = "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(i) + "&title=" + encodeURIComponent(e) + "&pic=" + encodeURIComponent(n)
			},
			handleYoukuIosShare: function() {
				var t = void 0 !== arguments[0] ? arguments[0] : 0
					, e = void 0 !== arguments[1] ? arguments[1] : this.shareConfig
					, i = e.title
					, n = e.link
					, a = e.imgUrl
					, r = navigator.userAgent.toLowerCase().split("youku/")[1];
				r = r ? r.split("(")[0] : 0,
					window.location.href = t && parseInt(r.replace(/\./g, "").substr(0, 3)) > 571 ? "youku://jsbshareimage?title=" + encodeURIComponent(i) + "&imageurl=" + encodeURIComponent(a) : "youku://jsbshare?title=" + encodeURIComponent(i) + "&weburl=" + encodeURIComponent(n) + "&imageurl=" + encodeURIComponent(a)
			},
			handleYoukuAndroidShare: function() {
				var t = void 0 !== arguments[0] ? arguments[0] : 0
					, e = void 0 !== arguments[1] ? arguments[1] : this.shareConfig
					, i = JSON.stringify({
					url: e.link,
					title: e.title,
					image: e.imgUrl,
					img_only: t
				});
				YoukuJSBridge.showShareView(i)
			},
			handleOtherShare: function() {
			},
			shareGuideMask: function(t) {
				t.fadeIn(),
					t.on("touchend", function() {
						$(this).fadeOut()
					})
			},
			isIos: function() {
				var t = navigator.userAgent.toLowerCase();
				return t.indexOf("iphone") > -1 || t.indexOf("ios") > -1
			},
			isAndroid: function() {
				var t = navigator.userAgent.toLowerCase();
				return t.indexOf("android") > -1
			}
		};
		return i
	}),
	define("h5/play/share", ["h5/common/share", "lib/plugin/url"], function(t) {
		function e() {
			var t = location.href
				, e = location.origin + location.pathname
				, i = $.url("?recoid", t)
				, n = $.url("?itemid", t);
			return (i || n) && (e = e + "?recoid=" + i + "&itemid=" + n),
				e
		}
		
		var i = e()
			, n = {
			init: function() {
				if (this.node = $('[data-js="shara-data"]'),
						!this.node.length)
					return !1;
				var e = {
					link: i,
					desc: this.node.attr("data-desc"),
					title: this.node.attr("data-title"),
					imgUrl: this.node.attr("src")
				};
				t.init(e),
					this.bind()
			},
			bind: function() {
			}
		};
		return n
	}),
	define("common/urchinaplus", [], function() {
		var t = window.setInterval(function() {
			window.goldlog && (window.UrchinAplus ? window.clearInterval(t) : require(["require/urchinAplus.min"], function() {
				window.clearInterval(t)
			}))
		}, 20);
		window.setTimeout(function() {
			window.clearInterval(t)
		}, 5e3)
	}),
	define("main.play", ["h5/play/h5player", "h5/play/relatedvideos", "h5/play/playlist", "h5/play/share", "common/urchinaplus"], function(t, e, i, n) {
		$(document).ready(function() {
			window.Appguide = null,
				require(["//new.tudou.com/jsapi/newtudou/tdappguidebanner.js"], function(t) {
					var e = $('[data-js="player-box"]').attr("data-iden");
					t.init({
						isshow: 1,
						from: "play",
						iden: e ? e : "",
						pub: "3d5556bee3698a0f",
						gostr: "detailBottomBar"
					}),
						window.Appguide = t
				}),
				t.init(),
				e.init(),
				i.init(),
				n.init();
			var a = window.navigator.userAgent;
			window.goldlog.record("/newtudou.h5.detailPageUA", "OTHER", "UA=" + a, "H47790335")
		})
	});
