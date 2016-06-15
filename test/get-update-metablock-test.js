var expect = require('chai').expect,
    mod = require('../src/index').getUpdateMetablock,
    help = require('./fixtures/helper');

describe("GetUpdateMetablock", function () {
    describe("From string", function () {
        var testSet = [
            {it: "minimal", args: [help.raw], rows: 5, update: false, download: false},
            {it: "URL: update", args: [help.raw, true], rows: 6, update: true, download: false},
            {it: "URL: download", args: [help.raw, false, true], rows: 6, update: false, download: true},
            {it: "URL: update & download", args: [help.raw, true, true], rows: 7, update: true, download: true}
        ];
        describe("Sync", function () {
            testSet.forEach(function (test) {
                it(test.it, function () {
                    var meta = mod.string.sync.apply(null, test.args).toLowerCase();
                    expect(meta.split(/\n/).length).to.equal(test.rows);

                    if (test.update) {
                        expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                    } else {
                        expect(meta.indexOf("@updateurl")).to.equal(-1);
                    }

                    if (test.download) {
                        expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                    } else {
                        expect(meta.indexOf("@downloadurl")).to.equal(-1);
                    }
                });
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
            testSet.forEach(function (test) {
                it(test.it, function (d) {
                    var first = test.args.shift();
                    test.args.unshift(function (e, meta) {
                        //noinspection BadExpressionStatementJS
                        expect(e).to.be.null;
                        //noinspection BadExpressionStatementJS
                        expect(meta).to.not.be.null;

                        meta = meta.toLowerCase();


                        expect(meta.split(/\n/).length).to.equal(test.rows);

                        if (test.update) {
                            expect(meta.indexOf("@updateurl")).to.not.equal(-1);
                        } else {
                            expect(meta.indexOf("@updateurl")).to.equal(-1);
                        }

                        if (test.download) {
                            expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
                        } else {
                            expect(meta.indexOf("@downloadurl")).to.equal(-1);
                        }

                        d();
                    });
                    test.args.unshift(first);

                    mod.string.async.apply(null, test.args)
                });
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
        var FILE = "./test/fixtures/userscript-top.js",
            argsets = [
                {it: "minimal", args: [FILE]},
                {it: "URL: update", args: [FILE, true]},
                {it: "URL: download", args: [FILE, false, true]},
                {it: "URL: update & download", args: [FILE, true, true]}
            ];
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
            argsets.forEach(function (test) {
                it(test.it, function () {
                    var strArgs = test.args.slice(1);
                    strArgs.unshift(help.top);

                    expect(mod.file.sync.apply(null, test.args)).to.equal(mod.string.sync.apply(null, strArgs))
                });
            });
        });
        describe("Async", function () {
            it("ENOENT", function (d) {
                mod.file.async("./package.jsonn", function (e, c) {
                    //noinspection BadExpressionStatementJS
                    expect(c).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(e).to.not.be.null;

                    expect(e.code).to.equal("ENOENT");
                    d();
                });
            });
            it("no metablock", function (d) {
                mod.file.async("./package.json", function (e, c) {
                    //noinspection BadExpressionStatementJS
                    expect(c).to.be.null;
                    //noinspection BadExpressionStatementJS
                    expect(e).to.not.be.null;

                    expect(e.message).to.equal("Metadata block not found");
                    d();
                });
            });
            argsets.forEach(function (test) {
                it(test.it, function (d) {
                    var strArgs = test.args.slice(1);
                    strArgs.unshift(help.top);

                    var fileArgs = test.args.slice(1);
                    fileArgs.unshift(function (e, c) {
                        //noinspection BadExpressionStatementJS
                        expect(c).to.not.be.null;
                        //noinspection BadExpressionStatementJS
                        expect(e).to.be.null;

                        expect(c).to.equal(mod.string.sync.apply(null, strArgs));
                        d();
                    });
                    fileArgs.unshift(test.args[0]);
                    mod.file.async.apply(null, fileArgs);
                });
            });
        });
    });
});