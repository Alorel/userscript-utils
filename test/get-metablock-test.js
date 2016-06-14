var expect = require('chai').expect,
    mod = require('..').getMetablock,
    meta = require('./fixtures/helper'),
    rawLength = meta.raw.split(/\n/).length;

describe("GetMetablock", function () {
    describe("From string", function () {
        describe("Sync", function () {
            it("Raw", function () {
                expect(mod.string.sync(meta.raw).split(/\n/).length).to.equal(rawLength);
            });
            it("Top", function () {
                expect(mod.string.sync(meta.top).split(/\n/).length).to.equal(rawLength)
            });
            it("Mid", function () {
                expect(mod.string.sync(meta.mid).split(/\n/).length).to.equal(rawLength)
            });
            it("null", function () {
                expect(function () {
                    mod.string.sync(null);
                }).to.throw(Error);
            });
            it("undefined", function () {
                expect(function () {
                    mod.string.sync();
                }).to.throw(Error);
            });
            it("no metablock", function () {
                expect(function () {
                    mod.string.sync("foo");
                }).to.throw(Error);
            });
        });
    });
    // it("File doesn't exist", function (done) {
    //     mod('./package.jsonn', function (err) {
    //         //noinspection BadExpressionStatementJS
    //         expect(err).to.not.be.null;
    //         expect(err.code).to.equal("ENOENT");
    //         done();
    //     });
    // });
    //
    // it("File has no metablock", function (done) {
    //     mod('./package.json', function (err, contents) {
    //         //noinspection BadExpressionStatementJS
    //         expect(err).to.not.be.null;
    //         expect(err.message).to.equal("Metadata getMetablock not found");
    //         done();
    //     });
    // });
    //
    // it("Block @ top", function (done) {
    //     mod('./test/fixtures/userscript-top.js', function (err, contents) {
    //         //noinspection BadExpressionStatementJS
    //         expect(err).to.be.null;
    //
    //         expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
    //         done();
    //     });
    // });
    //
    // it("Block @ mid", function (done) {
    //     mod('./test/fixtures/userscript-mid.js', function (err, contents) {
    //         //noinspection BadExpressionStatementJS
    //         expect(err).to.be.null;
    //         expect(expectedMetablock.split(/\n/).length).to.equal(contents.split(/\n/).length);
    //         done();
    //     });
    // });
});