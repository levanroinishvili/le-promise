
class lePromise {
	constructor ( promisedFunction ) {
		this.state = 'pending';
		this.chain = [];

		promisedFunction(this.resolver.bind(this), this.rejecter.bind(this));

	}

	resolver(val) {
		if ( this.state === 'pending' ) {
			this.state = 'fulfilled';
			this.value = val;
			while(this.chain.length) {
				let next = this.chain.shift();
				if ( typeof next.resolveProcessor === 'function' ) {
					let nextVal, nextError;
					try {
						nextVal = next.resolveProcessor(this.value);
						if ( typeof nextVal === 'object' && typeof nextVal.then === 'function' )
							nextVal.then(next.successor.resolver.bind(next.successor),next.successor.rejecter.bind(next.successor));
						else next.successor.resolver( nextVal );
					} catch (nextError) { next.successor.rejecter(nextError); }
				}  else next.successor.resolver();
			}
		}
	}

	rejecter(err) {
		if ( this.state === 'pending' ) {
			this.state = 'rejected';
			this.reason = err;
			while(this.chain.length) {
				let next = this.chain.shift();
				if ( typeof next.rejectProcessor === 'function' ) {
					let nextVal, nextError;
					try {
						nextVal = next.rejectProcessor(this.reason);
						if ( typeof nextVal === 'object' && typeof nextVal.then === 'function' ) {
							nextVal.then(next.successor.resolver.bind(next.successor),next.successor.rejecter.bind(next.successor));
						} else next.successor.resolver( nextVal );
					} catch (nextError) { next.successor.rejecter(nextError); }
				} else next.successor.resolver();
			}
		}
	}


	then(resolveProcessor,rejectProcessor) {
		let successor = new lePromise( (res,rej)=>{} );
		let newValue, newError;
		if      ( this.state === 'pending'   ) {
			let next = {successor: successor};
			if ( typeof resolveProcessor === 'function' ) next.resolveProcessor = resolveProcessor;
			if ( typeof rejectProcessor  === 'function' ) next.rejectProcessor  = rejectProcessor;
			this.chain.push(next);
		} else if ( this.state === 'fulfilled' ) {
			if ( typeof resolveProcessor === 'function' ) {
				try {
					newValue = resolveProcessor(this.value);
					if (typeof newValue === 'object' && typeof newValue.then === 'function' )
						return newValue;
					else successor.resolver(newValue);
				}	catch (newError) { successor.rejecter(newError); }
			} else successor.resolver(this.value);
		} else if ( this.state === 'rejected'  ) {
			if ( typeof rejectProcessor === 'function'  ) {
				try {
					newValue = rejectProcessor(this.reason);
					if ( typeof newValue === 'object' && typeof newValue.then === 'function' )
						return newValue;
					successor.resolver(newValue);
				} catch (newError) { return new lePromise((res,rej)=>{rej(newError);}); }
			} else return new lePromise((res,rej)=>{rej(this.reason);});
		}
		return successor;
	}

	static resolve(val) {
		return new lePromise( (res,rej)=>{ res(val); } );
	}

	static reject(err) {
		return new lePromise( (res,rej)=>{ rej(err); } );
	}

	static all( promises ) {
		return new lePromise( (res,rej)=>{
			if ( !Array.isArray(promises) || !promises.length) res([]);
			for ( let i=0; i<promises.length; i++ ) {
				let p = promises[i];
				if ( typeof p === 'object' && typeof p.then === 'function' ) {	// Loose check: if p a Promise?
					p.then(val=>{
						let allResolves = [], allAreResolved = true;
						for (let j=0; j<promises.length; j++) {
							let pl = promises[j];
							if      ( pl.state === 'fulfilled') { allResolves.push(pl.value); }
							else { allAreResolved = false; break; }
						}
						if ( allAreResolved ) res(allResolves);
						//else throw new Error('This sill be ignored');
					},rej);
				}
			}
		});
	}

	static race(promises) {
		return new lePromise( (res,rej)=>{
			if ( !Array.isArray(promises) || !promises.length) res();
			for ( let i=0; i<promises.length; i++ ) {
				let p = promises[i];
				if ( typeof p === 'object' && typeof p.then === 'function' ) {	// Loose check: if p a Promise?
					p.then(res,rej);
				}
			}
		});
	}

} // End of class lePromise

module.exports = lePromise;
