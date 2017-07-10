!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v&&(c.default=c.__useDefault=v);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("b", [], true, function ($__require, exports, module) {
	'use strict';

	var global = this || self,
	    GLOBAL = global;
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var lePromise = function () {
		function lePromise(promisedFunction) {
			_classCallCheck(this, lePromise);

			this.state = 'pending';
			this.chain = [];

			promisedFunction(this.resolver.bind(this), this.rejecter.bind(this));
		}

		_createClass(lePromise, [{
			key: 'resolver',
			value: function resolver(val) {
				if (this.state === 'pending') {
					this.state = 'fulfilled';
					this.value = val;
					while (this.chain.length) {
						var next = this.chain.shift();
						if (typeof next.resolveProcessor === 'function') {
							var nextVal = void 0,
							    nextError = void 0;
							try {
								nextVal = next.resolveProcessor(this.value);
								if ((typeof nextVal === 'undefined' ? 'undefined' : _typeof(nextVal)) === 'object' && typeof nextVal.then === 'function') nextVal.then(next.successor.resolver.bind(next.successor), next.successor.rejecter.bind(next.successor));else next.successor.resolver(nextVal);
							} catch (nextError) {
								next.successor.rejecter(nextError);
							}
						} else next.successor.resolver();
					}
				}
			}
		}, {
			key: 'rejecter',
			value: function rejecter(err) {
				if (this.state === 'pending') {
					this.state = 'rejected';
					this.reason = err;
					while (this.chain.length) {
						var next = this.chain.shift();
						if (typeof next.rejectProcessor === 'function') {
							var nextVal = void 0,
							    nextError = void 0;
							try {
								nextVal = next.rejectProcessor(this.reason);
								if ((typeof nextVal === 'undefined' ? 'undefined' : _typeof(nextVal)) === 'object' && typeof nextVal.then === 'function') {
									nextVal.then(next.successor.resolver.bind(next.successor), next.successor.rejecter.bind(next.successor));
								} else next.successor.resolver(nextVal);
							} catch (nextError) {
								next.successor.rejecter(nextError);
							}
						} else next.successor.resolver();
					}
				}
			}
		}, {
			key: 'then',
			value: function then(resolveProcessor, rejectProcessor) {
				var _this = this;

				var successor = new lePromise(function (res, rej) {});
				var newValue = void 0,
				    newError = void 0;
				if (this.state === 'pending') {
					var next = { successor: successor };
					if (typeof resolveProcessor === 'function') next.resolveProcessor = resolveProcessor;
					if (typeof rejectProcessor === 'function') next.rejectProcessor = rejectProcessor;
					this.chain.push(next);
				} else if (this.state === 'fulfilled') {
					if (typeof resolveProcessor === 'function') {
						try {
							newValue = resolveProcessor(this.value);
							if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && typeof newValue.then === 'function') return newValue;else successor.resolver(newValue);
						} catch (newError) {
							successor.rejecter(newError);
						}
					} else successor.resolver(this.value);
				} else if (this.state === 'rejected') {
					if (typeof rejectProcessor === 'function') {
						try {
							newValue = rejectProcessor(this.reason);
							if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' && typeof newValue.then === 'function') return newValue;
							successor.resolver(newValue);
						} catch (newError) {
							return new lePromise(function (res, rej) {
								rej(newError);
							});
						}
					} else return new lePromise(function (res, rej) {
						rej(_this.reason);
					});
				}
				return successor;
			}
		}], [{
			key: 'resolve',
			value: function resolve(val) {
				return new lePromise(function (res, rej) {
					res(val);
				});
			}
		}, {
			key: 'reject',
			value: function reject(err) {
				return new lePromise(function (res, rej) {
					rej(err);
				});
			}
		}, {
			key: 'all',
			value: function all(promises) {
				return new lePromise(function (res, rej) {
					if (!Array.isArray(promises) || !promises.length) res([]);
					for (var i = 0; i < promises.length; i++) {
						var p = promises[i];
						if ((typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && typeof p.then === 'function') {
							// Loose check: if p a Promise?
							p.then(function (val) {
								var allResolves = [],
								    allAreResolved = true;
								for (var j = 0; j < promises.length; j++) {
									var pl = promises[j];
									if (pl.state === 'fulfilled') {
										allResolves.push(pl.value);
									} else {
										allAreResolved = false;break;
									}
								}
								if (allAreResolved) res(allResolves);
								//else throw new Error('This sill be ignored');
							}, rej);
						}
					}
				});
			}
		}, {
			key: 'race',
			value: function race(promises) {
				return new lePromise(function (res, rej) {
					if (!Array.isArray(promises) || !promises.length) res();
					for (var i = 0; i < promises.length; i++) {
						var p = promises[i];
						if ((typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && typeof p.then === 'function') {
							// Loose check: if p a Promise?
							p.then(res, rej);
						}
					}
				});
			}
		}]);

		return lePromise;
	}(); // End of class lePromise

	module.exports = lePromise;
});
$__System.registerDynamic('a', ['b'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var lePromise = $__require('b');

  if (typeof Promise !== 'function') window.Promise = lePromise;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});