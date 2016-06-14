var expect = require('chai').expect,
    spawn = require('child_process').spawnSync,
    inFile = require.resolve('./fixtures/userscript-mid.js'),
    inProcessed = require('../src/lib/get-metablock').file.sync(inFile),
    fs = require('fs');

describe("CLI", function () {
    var script = './src/cli/userscript-utilities';

    describe('Index', function () {
        var halp = fs.readFileSync(require.resolve('../src/cli/help/index.txt'), 'utf8');

        it("Help: no arg", function () {
            expect(spawn('node', [script], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });
        it("Help: -h", function () {
            expect(spawn('node', [script, '-h'], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });
        it("Help: --help", function () {
            expect(spawn('node', [script, '--help'], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });
    });

    describe("get-metablock", function () {
        var halp = fs.readFileSync(require.resolve('../src/cli/help/get-metablock.txt'), 'utf8'),
            stdin = fs.readFileSync(inFile, 'utf8'),
            subscript = "get-metablock";

        it("Help: no arg", function () {
            expect(spawn('node', [script, subscript], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });
        it("Help: -h", function () {
            expect(spawn('node', [script, subscript, '-h'], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });
        it("Help: --help", function () {
            expect(spawn('node', [script, subscript, '--help'], {encoding: 'utf8'}).stdout)
                .to.equal(halp);
        });

        describe("To STDOUT", function () {
            it("From stdin", function () {
                expect(spawn('node', [script, subscript], {encoding: 'utf8', input: stdin}).stdout)
                    .to.equal(inProcessed);
            });
            it("From file", function () {
                expect(spawn('node', [script, subscript, "-i", inFile], {encoding: 'utf8'}).stdout)
                    .to.equal(inProcessed);
            });
        });

        describe("To file", function () {
            it("From file", function (d) {
                var fname = 'o1.js';
                spawn('node', [script, subscript, "-o", fname, "-i", inFile], {encoding: 'utf8', input: stdin});

                fs.readFile(fname, 'utf8', function (e, c) {
                    if (e) {
                        throw e;
                    } else {
                        try {
                            expect(c).to.equal(inProcessed);
                        } finally {
                            try {
                                fs.unlinkSync(fname);
                            } catch (e) {
                            }
                        }
                    }

                    d();
                });
            });
            it("From stdin", function (d) {
                var fname = 'o2.js';
                spawn('node', [script, subscript, "-o", fname], {encoding: 'utf8', input: stdin});

                fs.readFile(fname, 'utf8', function (e, c) {
                    if (e) {
                        throw e;
                    } else {
                        try {
                            expect(c).to.equal(inProcessed);
                        } finally {
                            try {
                                fs.unlinkSync(fname);
                            } catch (e) {
                            }
                        }
                    }

                    d();
                });
            });
        });
    });
});