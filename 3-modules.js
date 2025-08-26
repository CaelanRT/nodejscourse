// CommonJS, every file is a module (by default)
// modules - encapsulated code (only sharing the minimum)
const names = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative-flavour')
require('./7-mindgrenade')


// sayHi('susan');
// sayHi(names.john);
// sayHi(names.peter);