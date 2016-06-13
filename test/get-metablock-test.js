var chai = require('chai'),
    expect = chai.expect,
    mod = require('../lib/get-metablock');

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
            console.log({
                err: err,
                contents: contents
            });
            done();
        });
    });
});