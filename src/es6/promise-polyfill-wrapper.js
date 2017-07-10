const lePromise = require('./le-promise');

if ( typeof Promise !== 'function' ) window.Promise = lePromise;
