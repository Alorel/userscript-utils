var expect = require('chai').expect,
    mod = require('..').getUpdateMetablock,
    help = require('./fixtures/helper');

describe("GetUpdateMetablock", function () {
    describe("From string", function () {
        describe("Sync", function () {
            it("minimal", function () {
                var meta = mod.string.sync(help.raw).toLowerCase();
                expect(meta.split(/\n/).length).to.equal(5);
                expect(meta.indexOf("@updateurl")).to.equal(-1);
                expect(meta.indexOf("@downloadurl")).to.equal(-1);
            });
            it("URL: update", function () {
                var meta = mod.string.sync(help.raw, true).toLowerCase();
                expect(meta.split(/\n/).length).to.equal(6);
                expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                expect(meta.indexOf("@downloadurl")).to.equal(-1);
            });
            it("URL: download", function () {
                var meta = mod.string.sync(help.raw, false, true).toLowerCase();
                expect(meta.split(/\n/).length).to.equal(6);
                expect(meta.indexOf("@updateurl")).to.equal(-1);
                expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
            });
            it("URL: [download, update]", function () {
                var meta = mod.string.sync(help.raw, true, true).toLowerCase();
                expect(meta.split(/\n/).length).to.equal(7);
                expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
            });
            it("no metablock", function () {
                expect(function () {
                    mod.string.sync("foo");
                }).to.throw(Error);
            });
            it("undefined", function () {
                expect(function () {
                    mod.string.sync();
                }).to.throw(Error);
            });
            it("null", function () {
                expect(function () {
                    mod.string.sync(null);
                }).to.throw(Error);
            });
        });
        describe("Async", function () {
            it("minimal", function (d) {
                mod.string.async(help.raw, function (e, meta) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(meta).to.not.be.null;

                    meta = meta.toLowerCase();

                    expect(meta.split(/\n/).length).to.equal(5);
                    expect(meta.indexOf("@updateurl")).to.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.equal(-1);
                    d();
                });
            });
            it("URL: update", function (d) {
                mod.string.async(help.raw, function (e, meta) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(meta).to.not.be.null;

                    meta = meta.toLowerCase();

                    expect(meta.split(/\n/).length).to.equal(6);
                    expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.equal(-1);
                    d();
                }, true);
            });
            it("URL: download", function (d) {
                mod.string.async(help.raw, function (e, meta) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(meta).to.not.be.null;

                    meta = meta.toLowerCase();

                    expect(meta.split(/\n/).length).to.equal(6);
                    expect(meta.indexOf("@updateurl")).to.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                    d();
                }, false, true);
            });
            it("URL: [download, update]", function (d) {
                mod.string.async(help.raw, function (e, meta) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(meta).to.not.be.null;

                    meta = meta.toLowerCase();

                    expect(meta.split(/\n/).length).to.equal(7);
                    expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                    d();
                }, true, true);
            });
            it("no metablock", function (d) {
                mod.string.async("foo", function (e) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.not.be.null;
                    expect(e.message).to.equal("Metablock not found");
                    d();
                });
            });
            it("null", function (d) {
                mod.string.async(null, function (e) {
                    //noinspection BadExpressionStatementJS
                    expect(e).to.not.be.null;
                    expect(e.message).to.equal("Cannot read property 'split' of null");
                    d();
                });
            });
        });
    });
    describe("From file", function () {
        describe("Sync", function () {
            it("ENOENT", function () {
                expect(function () {
                    mod.file.sync("./package.jsonn")
                }).to.throw(Error);
            });
            it("no metablock", function () {
                expect(function () {
                    mod.file.sync("./package.json")
                }).to.throw(Error);
            });
            it("minimal", function () {
                expect(mod.file.sync("./test/fixtures/userscript-top.js")).to.equal(mod.string.sync(help.top))
            });
            it("URL: update", function () {
                expect(mod.file.sync("./test/fixtures/userscript-top.js"), true)
                    .to.equal(mod.string.sync(help.top), true)
            });
            it("URL: download", function () {
                expect(mod.file.sync("./test/fixtures/userscript-top.js"), false, true)
                    .to.equal(mod.string.sync(help.top), false, true)
            });
            it("URL: [download, update[", function () {
                expect(mod.file.sync("./test/fixtures/userscript-top.js"), true, true)
                    .to.equal(mod.string.sync(help.top), true, true)
            });
        });
    });
});