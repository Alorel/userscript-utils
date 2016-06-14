var chai = require('chai'),
    expect = chai.expect,
    mod = require('../lib/get-metablock'),
    expectedMetablock = "// ==UserScript==\n\
// @name		Name\n\
// @namespace	namespace\n\
// @description	My desc\n\
// @include		https://github.com/*\n\
// @include		https://gist.github.com/*\n\
// @version		6.6.6\n\
// @grant 		none\n\
// ==/UserScript==";

describe("GetMetablock.getBlock", function () {
    it("File doesn't exist", function (done) {
        mod.getBlock('./package.jsonn', function (err) {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.code).to.equal("ENOENT");
            done();
        });
    });

    it("File has no metablock", function (done) {
        mod.getBlock('./package.json', function (err, contents) {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.message).to.equal("Metadata block not found");
            done();
        });
    });

    it("Block @ top", function (done) {
        mod.getBlock('./test/fixtures/userscript-top.js', function (err, contents) {
            expect(err).to.be.null;

            expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
            done();
        });
    });

    it("Block @ mid", function (done) {
        mod.getBlock('./test/fixtures/userscript-mid.js', function (err, contents) {
            expect(err).to.be.null;
            expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
            done();
        });
    });
});