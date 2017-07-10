'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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