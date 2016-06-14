var expect = require('chai').expect,
    mod = require('..').getUpdateMetablock,
    raw = require('./fixtures/helper').raw;

describe("GetUpdateMetablock", function () {
    describe("From string", function () {
        describe("Sync", function () {
            describe("Valid", function () {
                it("minimal", function () {
                    var meta = mod.string.sync(raw).toLowerCase();
                    expect(meta.split(/\n/).length).to.equal(5);
                    expect(meta.indexOf("@updateurl")).to.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.equal(-1);
                });
                it("URL: update", function () {
                    var meta = mod.string.sync(raw, true).toLowerCase();
                    expect(meta.split(/\n/).length).to.equal(6);
                    expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.equal(-1);
                });
                it("URL: download", function () {
                    var meta = mod.string.sync(raw, false, true).toLowerCase();
                    expect(meta.split(/\n/).length).to.equal(6);
                    expect(meta.indexOf("@updateurl")).to.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                });
                it("URL: [download, update]", function () {
                    var meta = mod.string.sync(raw, true, true).toLowerCase();
                    expect(meta.split(/\n/).length).to.equal(7);
                    expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                    expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                });
            });
            describe("Invalid", function () {
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
        });
    });
});