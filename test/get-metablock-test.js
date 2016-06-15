var expect = require('chai').expect,
    mod = require('../src/index').getMetablock,
    meta = require('./fixtures/helper'),
    rawLength = meta.raw.split(/\n/).length;

describe("GetMetablock", function () {
    describe("From string", function () {
        describe("Sync", function () {
            ['raw', 'top', 'mid'].forEach(function (i) {
                it(i, function () {
                    expect(mod.string.sync(meta[i]).split(/\n/).length).to.equal(rawLength);
                });
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
        describe("Async", function () {
            ['raw', 'top', 'mid'].forEach(function (i) {
                it(i, function (done) {
                    mod.string.async(meta[i], function (err, contents) {
                        //noinspection BadExpressionStatementJS
                        expect(err).to.be.null;
                        expect(contents.split(/\n/).length).to.equal(rawLength);
                        done();
                    });
                });
            });

            it("null", function (done) {
                mod.string.async(null, function (err, contents) {
                    //noinspection BadExpressionStatementJS
                    expect(contents).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(err).to.not.be.null;
                    expect(err.message).to.equal("Cannot read property 'split' of null");
                    done();
                });
            });
            it("no metablock", function (done) {
                mod.string.async("foo", function (err, contents) {
                    //noinspection BadExpressionStatementJS
                    expect(contents).to.be.null;
                    expect(err.message).to.equal("Metadata block not found");
                    done();
                });
            });
        });
    });
    describe("From file", function () {
        describe("Sync", function () {
            it("ENOENT", function () {
                expect(function () {
                    mod.file.sync("./package.jsonn");
                }).to.throw(Error);
            });
            it("No metablock", function () {
                expect(function () {
                    mod.file.sync("./package.json");
                }).to.throw(Error);
            });
            ["top", "mid"].forEach(function (i) {
                it(i, function () {
                    expect(mod.file.sync('./test/fixtures/userscript-' + i + '.js')).to.equal(mod.string.sync(meta[i]));
                });
            });
        });
        describe("Async", function () {
            it("ENOENT", function (done) {
                mod.file.async("./package.jsonn", function (err) {
                    //noinspection BadExpressionStatementJS
                    expect(err).to.not.be.null;
                    expect(err.code).to.equal("ENOENT");
                    done();
                });
            });
            it("No metablock", function (done) {
                mod.file.async("./package.json", function (err) {
                    //noinspection BadExpressionStatementJS
                    expect(err).to.not.be.null;
                    expect(err.message).to.equal("Metadata block not found");
                    done();
                });
            });
            ["top", "mid"].forEach(function (i) {
                it(i, function (done) {
                    mod.file.async('./test/fixtures/userscript-' + i + '.js', function (err, contents) {
                        //noinspection BadExpressionStatementJS
                        expect(err).to.be.null;
                        expect(contents).to.equal(mod.string.sync(meta[i]));
                        done();
                    });
                });
            });
        });
    });
});