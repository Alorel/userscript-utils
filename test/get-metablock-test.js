"use strict";
var chai = require('chai'),
    expect = chai.expect,
    mod = require('../lib/get-metablock');

describe("GetMetablock.getBlock", () => {
    it("File doesn't exist", done => {
        mod.getBlock('./package.jsonn', (err, contents) => {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.code).to.equal("ENOENT");
            done();
        });
    });

    it("File has no metablock", done => {
        mod.getBlock('./package.json', (err, contents) => {
            //noinspection BadExpressionStatementJS
            expect(err).to.not.be.null;
            expect(err.message).to.equal("Metadata block not found");
            done();
        });
    });

    it("Block @ top", done => {
        mod.getBlock('./test/fixtures/userscript-top.js', (err, contents) => {
            console.log({
                err: err,
                contents: contents
            });
            done();
        });
    });
});