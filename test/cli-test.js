var expect = require('chai').expect,
    exec = require('child_process').execSync,
    inFile = require.resolve('./fixtures/userscript-mid.js'),
    sep = require('path').sep,
    inProcessed = require('../src/lib/get-metablock').file.sync(inFile),
    fs = require('fs'),
    /**
     * @param {...string} args
     * @returns {string}
     */
    script = function () {
        var cmd = "userscript-utils",
            i = 0;
        for (; i < arguments.length; i++) {
            cmd += ' "' + arguments[i] + '"';
        }
        return cmd;
    };

describe("CLI", function () {
    this.timeout(10000);

    describe('Index', function () {
        describe("Help", function () {
            var halp = fs.readFileSync(require.resolve('../src/cli/help/index.txt'), 'utf8');

            it("no arg", function () {
                expect(exec(script()).toString()).to.equal(halp);
            });
            it("-h", function () {
                expect(exec(script(this.test.title)).toString()).to.equal(halp);
            });
            it("--help", function () {
                expect(exec(script(this.test.title)).toString()).to.equal(halp);
            });
        });
    });

    describe("get-metablock", function () {
        var stdin = fs.readFileSync(inFile, 'utf8'),
            subscript = "get-metablock";

        describe("Help", function () {
            var halp = fs.readFileSync(require.resolve('../src/cli/help/get-metablock.txt'), 'utf8');

            it("no arg", function () {
                expect(exec(script(subscript)).toString()).to.equal(halp);
            });
            it("-h", function () {
                expect(exec(script(subscript, this.test.title)).toString()).to.equal(halp);
            });
            it("--help", function () {
                expect(exec(script(subscript, this.test.title)).toString()).to.equal(halp);
            });
        });

        describe("To STDOUT from...", function () {
            it("stdin", function () {
                expect(exec(script(subscript), {input: stdin}).toString())
                    .to.equal(inProcessed);
            });
            it("file", function () {
                expect(exec(script(subscript, "-i", inFile), {input: stdin}).toString())
                    .to.equal(inProcessed);
            });
        });

        describe("To file from...", function () {
            it("file", function () {
                var fname = __dirname + sep + "o1.js";
                try {
                    exec(script(subscript, "-o", fname, "-i", inFile));
                    expect(fs.readFileSync(fname, 'utf8')).to.equal(inProcessed);
                } finally {
                    try {
                        fs.unlinkSync(fname);
                    } catch (e) {
                    }
                }
            });
            it("stdin", function () {
                var fname = __dirname + sep + "o2.js";
                try {
                    exec(script(subscript, "-o", fname), {input: stdin});
                    expect(fs.readFileSync(fname, 'utf8')).to.equal(inProcessed);
                } finally {
                    try {
                        fs.unlinkSync(fname);
                    } catch (e) {
                    }
                }
            });
        });
    });
});