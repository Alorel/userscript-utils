var expect = require('chai').expect,
    exec = require('child_process').execSync,
    inFile = require.resolve('./fixtures/userscript-mid.js'),
    sep = require('path').sep,
    inGetMetablock = require('../src/lib/get-metablock').fromFileSync(inFile),
    getUpdateblock = require('../src/lib/get-update-metablock').fromStringSync,
    updateblocks = {
        "-d": getUpdateblock(inGetMetablock, false, true),
        "-u": getUpdateblock(inGetMetablock, true, false),
        "-ud": getUpdateblock(inGetMetablock, true, true),
        "null": getUpdateblock(inGetMetablock, false, false)
    },
    fs = require('fs'),
    script = function () {
        var cmd = "userscript-utils",
            i = 0;
        for (; i < arguments.length; i++) {
            cmd += ' "' + arguments[i] + '"';
        }
        return cmd;
    };

updateblocks["--updateurl"] = updateblocks["-u"];
updateblocks["--downloadurl"] = updateblocks["-d"];
updateblocks["-du"] = updateblocks["-ud"];

describe("CLI", function () {

    describe('Index', function () {
        describe("Help", function () {
            var halp = fs.readFileSync(require.resolve('../src/cli/help/index.txt'), 'utf8');

            it("no arg", function () {
                expect(exec(script()).toString()).to.equal(halp);
            });

            ['-h', '--help'].forEach(function (i) {
                it(i, function () {
                    expect(exec(script(this.test.title)).toString()).to.equal(halp);
                });
            });
        });
    });

    var stdin = fs.readFileSync(inFile, 'utf8');

    describe("get-updateblock", function () {
        var subscript = "get-updateblock",
            cmdOptions = ["-u", "-d", "--updateurl", "--downloadurl", "-ud", "-du", "null"];

        describe("Help", function () {
            var halp = fs.readFileSync(require.resolve('../src/cli/help/get-updateblock.txt'), 'utf8');

            it("no arg", function () {
                expect(exec(script(subscript)).toString()).to.equal(halp);
            });
            ['-h', '--help'].forEach(function (i) {
                it(i, function () {
                    expect(exec(script(subscript, this.test.title)).toString()).to.equal(halp);
                });
            });
        });

        describe("To STDOUT with...", function () {
            cmdOptions.forEach(function (option) {
                describe(option + " from...", function () {
                    it("stdin", function () {
                        var cliArgs = [subscript];
                        if (option !== "null") {
                            cliArgs.push(option);
                        }

                        expect(exec(script.apply(null, cliArgs), {input: stdin}).toString())
                            .to.equal(updateblocks[option]);
                    });

                    ["-i", "--infile"].forEach(function (i) {
                        it("file via " + i, function () {
                            var cliArgs = [subscript, i, inFile];
                            if (option !== "null") {
                                cliArgs.push(option);
                            }

                            expect(exec(script.apply(null, cliArgs), {input: stdin}).toString())
                                .to.equal(updateblocks[option]);
                        });
                    })
                });
            });
        });

        describe("To file with output option", function () {
            ["-o", "--outfile"].forEach(function (outfile) {
                describe(outfile, function () {
                    cmdOptions.forEach(function (cmdOption) {
                        ["-i", "--infile"].forEach(function (i) {
                            it(i + " with cmd option " + cmdOption, function () {
                                var fname = __dirname + sep + "o2.js",
                                    cliArgs = [subscript, outfile, fname, i, inFile];
                                if (cmdOption !== "null") {
                                    cliArgs.push(cmdOption);
                                }

                                try {
                                    exec(script.apply(null, cliArgs));
                                    expect(fs.readFileSync(fname, 'utf8')).to.equal(updateblocks[cmdOption]);
                                } finally {
                                    try {
                                        fs.unlinkSync(fname);
                                    } catch (e) {
                                    }
                                }
                            });
                        });

                        it("STDIN with cmd option " + cmdOption, function () {
                            var fname = __dirname + sep + "o1.js",
                                cliArgs = [subscript, outfile, fname];
                            if (cmdOption !== "null") {
                                cliArgs.push(cmdOption);
                            }

                            try {
                                exec(script.apply(null, cliArgs), {input: stdin});
                                expect(fs.readFileSync(fname, 'utf8')).to.equal(updateblocks[cmdOption]);
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
        });
    });

    describe("get-metablock", function () {
        var subscript = "get-metablock";

        describe("Help", function () {
            var halp = fs.readFileSync(require.resolve('../src/cli/help/get-metablock.txt'), 'utf8');

            it("no arg", function () {
                expect(exec(script(subscript)).toString()).to.equal(halp);
            });

            ['-h', '--help'].forEach(function (i) {
                it(i, function () {
                    expect(exec(script(subscript, this.test.title)).toString()).to.equal(halp);
                });
            });
        });

        describe("To STDOUT from...", function () {
            it("stdin", function () {
                expect(exec(script(subscript), {input: stdin}).toString())
                    .to.equal(inGetMetablock);
            });

            ["-i", "--infile"].forEach(function (i) {
                it("file via " + i, function () {
                    expect(exec(script(subscript, i, inFile)).toString())
                        .to.equal(inGetMetablock);
                });
            })
        });

        describe("To file from...", function () {
            ["-o", "--outfile"].forEach(function (v, k) {
                ["-i", "--infile"].forEach(function (i) {
                    it("file via " + v + " and " + i, function () {
                        var fname = __dirname + sep + "o" + k + ".js";
                        try {
                            exec(script(subscript, v, fname, i, inFile));
                            expect(fs.readFileSync(fname, 'utf8')).to.equal(inGetMetablock);
                        } finally {
                            try {
                                fs.unlinkSync(fname);
                            } catch (e) {
                            }
                        }
                    });
                });

                it("stdin via " + v, function () {
                    var fname = __dirname + sep + "o2.js";
                    try {
                        exec(script(subscript, v, fname), {input: stdin});
                        expect(fs.readFileSync(fname, 'utf8')).to.equal(inGetMetablock);
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
});