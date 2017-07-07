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

	static all() {

	}
}

module.exports = lePromise;

