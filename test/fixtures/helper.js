var fs = require('fs'),
    exp = {
        raw: "// ==UserScript==\n\
// @name		Name\n\
// @namespace	namespace\n\
// @description	My desc\n\
// @include		https://github.com/*\n\
// @include		https://gist.github.com/*\n\
// @version		6.6.6\n\
// @grant 		none\n\
// @updateURL  https://foo\n\
// @downloadURL  https://bar\n\
// ==/UserScript==",
        mid: fs.readFileSync('./test/fixtures/userscript-mid.js', 'utf8'),
        top: fs.readFileSync('./test/fixtures/userscript-top.js', 'utf8')
    };

module.exports = exp;