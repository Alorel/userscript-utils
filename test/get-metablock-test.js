var chai = require('chai'),
    expect = chai.expect,
    mod = require('..').getMetablock,
    expectedMetablock = "// ==UserScript==\n\
// @name		Name\n\
// @namespace	namespace\n\
// @description	My desc\n\
// @include		https://github.com/*\n\
// @include		https://gist.github.com/*\n\
// @version		6.6.6\n\
// @grant 		none\n\
// ==/UserScript==";

describe("GetMetablock", function () {
    it("File doesn't exist", function (done) {
        mod('./package.jsonn', function (err) {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.code).to.equal("ENOENT");
            done();
        });
    });

    it("File has no metablock", function (done) {
        mod('./package.json', function (err, contents) {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.message).to.equal("Metadata getMetablock not found");
            done();
        });
    });

    it("Block @ top", function (done) {
        mod('./test/fixtures/userscript-top.js', function (err, contents) {
            //noinspection BadExpressionStatementJS
            expect(err).to.be.null;

            expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
            done();
        });
    });

    it("Block @ mid", function (done) {
        mod('./test/fixtures/userscript-mid.js', function (err, contents) {
            //noinspection BadExpressionStatementJS
            expect(err).to.be.null;
            expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
            done();
        });
    });
});