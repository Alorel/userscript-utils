"use strict";
var chai = require('chai'),
    expect = chai.expect,
    child_process = require('child_process'),
    cwd = process.cwd(),
    fs = require('fs'),
    call = (...args)=> {
        return child_process.spawnSync("../userscript-utilities get-metablock " + args.join(" "), {cwd: cwd})
    };

describe("GetMetablock", () => {
    it("File doesn't exist", ()=> {
        let err = call("node ../userscript-utilities get-metablock ./get-metablock-test.js", {cwd: cwd}).error;
        expect(err.code).to.equal('ENOENT');
    });

    // it("File has no metablock", ()=> {
    //     let err = call('.').error;
    //     console.log(err);
    // });
});