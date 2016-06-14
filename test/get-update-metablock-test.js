// var chai = require('chai'),
//     expect = chai.expect,
//     mod = require('..').getUpdateMetablock,
//     expectedMetablock = require('./fixtures/raw-metablock');
//
// describe('GetUpdateMetablock', function () {
//     describe("From string", function () {
//         describe("Valid", function () {
//             it("no extra opts", function () {
//                 var meta = mod.fromString(expectedMetablock).toLowerCase();
//                 expect(meta.split(/\n/).length).to.equal(5);
//                 expect(meta.indexOf("@updateurl")).to.equal(-1);
//                 expect(meta.indexOf("@downloadurl")).to.equal(-1);
//             });
//             it("update url", function () {
//                 var meta = mod.fromString(expectedMetablock, true).toLowerCase();
//                 expect(meta.split(/\n/).length).to.equal(6);
//                 expect(meta.indexOf("@updateurl")).to.not.equal(-1);
//                 expect(meta.indexOf("@downloadurl")).to.equal(-1);
//             });
//             it("download url", function () {
//                 var meta = mod.fromString(expectedMetablock, false, true).toLowerCase();
//                 expect(meta.split(/\n/).length).to.equal(6);
//                 expect(meta.indexOf("@updateurl")).to.equal(-1);
//                 expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
//             });
//             it("download & update URLs", function () {
//                 var meta = mod.fromString(expectedMetablock, true, true).toLowerCase();
//                 expect(meta.split(/\n/).length).to.equal(7);
//                 expect(meta.indexOf("@updateurl")).to.not.equal(-1);
//                 expect(meta.indexOf("@downloadurl")).to.not.equal(-1);
//             });
//         });
//         describe("Invalid", function () {
//             it("no metablock", function () {
//                 expect(function () {
//                     mod.fromString("foo");
//                 }).to.throw(Error);
//             });
//             it("str undefined", function () {
//                 expect(function () {
//                     mod.fromString();
//                 }).to.throw(Error);
//             });
//             it("str null", function () {
//                 expect(function () {
//                     mod.fromString(null);
//                 }).to.throw(Error);
//             });
//         });
//     });
//     describe("From file", function(){
//         describe("Valid", function(){
//
//         });
//     });
// });