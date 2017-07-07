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
					let nextError;
					try { next.successor.resolver( next.resolveProcessor(this.value) ); }
					catch (nextError) { next.successor.rejecter(nextError); }
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
					let nextError;
					try { next.successor.resolver( next.rejectProcessor(this.reason) ); }
					catch (nextError) { next.successor.rejecter(nextError); }
				} else next.successor.resolver();
			}
		}
	}


	then(resolveProcessor,rejectProcessor) {
		let successor = new lePromise( (res,rej)=>{} );
		let newError;
		if      ( this.state === 'pending'   ) {
			let next = {successor: successor};
			if ( typeof resolveProcessor === 'function' ) next.resolveProcessor = resolveProcessor;
			if ( typeof rejectProcessor  === 'function' ) next.rejectProcessor  = rejectProcessor;
			this.chain.push(next);
		} else if ( this.state === 'fulfilled' ) {
			if ( typeof resolveProcessor === 'function' ) {
				try { successor.resolver(resolveProcessor(this.value)); }
				catch (newError) { successor.rejecter(newError); }
			} else successor.resolver();
		} else if ( this.state === 'rejected'  ) {
			if ( typeof rejectProcessor === 'function'  ) {
				try { successor.resolver(rejectProcessor(this.reason)); }
				catch (newError) { successor.rejecter(newError); }
			} else successor.resolver();
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
				// is p a le-promise?
				let p = promises[i];
				p.then(val=>{
					let allResolves = [], allAreResolved = true;
					for (let j=0; j<promises.length; j++) {
						let pl = promises[j];
						if      ( pl.state === 'fulfilled') { allResolves.push(pl.value); }
						else { allAreResolved = false; break; }
					}
					if ( allAreResolved ) res(allResolves);
				},rej);
			}

		});
	}

	static race() {

	}
}

module.exports = lePromise;

var x = lePromise.all([lePromise.resolve(15),lePromise.resolve(18),lePromise.reject(new Error('bla'))]).then(x => {console.log(`Resolved with ${x}`);} );
console.log(x);
