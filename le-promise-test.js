// Here I will test my custom Promise class (le-promise)
// and compare its behavior to stock JavaScript Promise class (Beloow referred to as 'Standard Promise')
// 'Standard' Promise: Standard Promise class provided by JavaScript
// 'Custom'   Promise: Class written by me, which I am testing here

// I am assuming ;) that standard Promises work.
// I will be comparing behavior my custom Promises to standard Promises

// I will also be using standard Promises to make comparison output easier to read.
//   Namely, to 'wait' until one test ends before starting another test


const lePromise = require('./le-promise');

defaultAsyncPromiseDelay = 2000; // Miliseconds

// This function will simply prepend current time to console.log() output
function timedLog() {
	let now = new Date();
	let hours=String(now.getHours()), minutes=String(now.getMinutes()), seconds=String(now.getSeconds());
	hours   = '0'.repeat(Math.max(0,2-  hours.length)) + hours  ;
	minutes = '0'.repeat(Math.max(0,2-minutes.length)) + minutes;
	seconds = '0'.repeat(Math.max(0,2-seconds.length)) + seconds;
	let time = hours + ':' + minutes + ':' + seconds;

	console.log(time,...arguments);
}


// This function will 'build' function(resolve,reject){} which needs to be passed to a promise
//    Inside the function, promise will resolve synchronously
//    It will be used for testing both standard and custom synchronous Promises
function syncronous_promise_maker(type) {
	console.log(); // Empty line
	timedLog(`||--> Making a ${type} syncronous promise`);
	return function (resolve, reject) {
		if ( Math.random()<.5 ) resolve( Math.ceil(100*Math.random()) );
		else reject( new Error('sincere apologies') );
	};
}

// This function will 'build' function(resolve,reject){} which needs to be passed to a promise
//    Inside the function, promise will resolve asynchronously
//    It will be used for testing both standard and custom asynchronous Promises
function asyncronous_promise_maker(type,delay) {
	console.log(); // Empty line
	timedLog(`||--> Making a ${type} ASYNCHRONOUS promise with ${delay/1000} sec delay`);
	return function(resolve, reject) {
		setTimeout(function() {
			if ( Math.random()<.5 ) resolve( Math.ceil(100*Math.random()) );
			else reject( new Error('sincere apologies') );
		}, delay);
	};
}


function test_custom_asynchronous_promise(delay) {
	let trueDelay;
	if ( typeof delay === 'number' ) trueDelay = Math.floor(delay); else trueDelay = defaultAsyncPromiseDelay;

	return new Promise( (resolve,reject) => {	// Just a wrapper for test. Not testing this standard Promise
		
		var promise_standard_async = new lePromise( asyncronous_promise_maker('custom',trueDelay) ); // Testing this custom Promise

		promise_standard_async.then(
			val => { timedLog(`++++ CUSTOM ASYNCHRONOUS promise resolved with [${val}]`); return 1; },
			err => { timedLog(`---- CUSTOM ASYNCHRONOUS promise REJECTED with [${err.message}]`); throw new Error('Error *'); }
		).then(
			val => { timedLog(`   +>>> CAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CAP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> CAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CAP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> CAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CAP- Chain: [${err}]`); return 'Handled [' + err.message + ']'; }
		).then(val => {timedLog(`   +>>| CAP+ Chain: finally [${val}]`);}
		).then(resolve,reject);
	});
}


function test_custom_synchronous_promise() {
	return new Promise( (resolve,reject) => {	// Just a wrapper for test. Not testing this standard Promise
		
		var promise_standard_sync = new lePromise( syncronous_promise_maker('custom') ); // Testing this custom Promise
		
		promise_standard_sync.then(
			val => { timedLog(`++++ CUSTOM Synchronous promise resolved with [${val}]`); return 1; },
			err => { timedLog(`---- CUSTOM Synchronous promise REJECTED with [${err.message}]`); throw new Error('Error *'); }
		).then(
			val => { timedLog(`   +>>> CSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CSP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> CSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CSP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> CSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> CSP- Chain: [${err}]`); return 'Handled [' + err.message + ']'; }
		).then(val => {timedLog(`   +>>| SSP+ Chain: finally [${val}]`);}
		).then(resolve).catch(reject);
	});
}


function test_standard_synchronous_promise() {
	return new Promise( (resolve,reject) => {	// Just a wrapper for test. Not testing this standard Promise
		
		var promise_standard_sync = new Promise( syncronous_promise_maker('standard') ); // Testing (studing for comparison) this standard Promise
		
		promise_standard_sync.then(
			val => { timedLog(`++++ Standard Synchronous promise resolved with [${val}]`); return 1; },
			err => { timedLog(`---- Standard Synchronous promise REJECTED with [${err.message}]`); throw new Error('Error *'); }
		).then(
			val => { timedLog(`   +>>> SSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SSP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> SSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SSP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> SSP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SSP- Chain: [${err}]`); return 'Handled [' + err.message + ']'; }
		).then(val => {timedLog(`   +>>| SSP+ Chain: finally [${val}]`);}
		).then(resolve).catch(reject);
	});
}

function test_standard_asynchronous_promise(delay) {
	let trueDelay;
	if ( typeof delay === 'number' ) trueDelay = Math.floor(delay); else trueDelay = defaultAsyncPromiseDelay;
	
	return new Promise( (resolve,reject) => {	// Just a wrapper for test. Not testing this standard Promise

		var promise_standard_async = new Promise( asyncronous_promise_maker('standard',trueDelay) ); // Testing (studing for comparison) this standard Promise

		promise_standard_async.then(
			val => { timedLog(`++++ Standard ASYNCHRONOUS promise resolved with [${val}]`); return 1; },
			err => { timedLog(`---- Standard ASYNCHRONOUS promise REJECTED with [${err.message}]`); throw new Error('Error *'); }
		).then(
			val => { timedLog(`   +>>> SAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SAP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> SAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SAP- Chain: [${err}]`); throw new Error(err.message+'*'); }
		).then(
			val => { timedLog(`   +>>> SAP+ Chain: [${val}]`); return val+1; },
			err => { timedLog(`   ->>> SAP- Chain: [${err}]`); return 'Handled [' + err.message + ']'; }
		).then(val => {timedLog(`   +>>| SAP+ Chain: finally [${val}]`);}
		).then(resolve,reject);
	});
}


// Run the actual tests in sequence
// test_custom_asynchronous_promise();
// test_custom_synchronous_promise();
// test_standard_synchronous_promise();
// test_standard_asynchronous_promise();

test_custom_asynchronous_promise()
	.then(test_custom_synchronous_promise)
	.then(test_standard_synchronous_promise)
	.then(test_standard_asynchronous_promise);

