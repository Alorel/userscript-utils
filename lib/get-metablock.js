"use strict";
let fs = require('fs'),
    regexStart = /^(\s*\/\/\s?==userscript)\s?==/im,
    regexEnd = /^(\s*\/\/\s?==\/userscript\s?==)/im,
    parseFile = function (contents) {
        let split1 = contents.split(regexEnd);

        if (split1.length !== 3) {
            throw new Error("Metadata block not found");
        } else {
            console.log(split1);
        }
    };

module.exports = {
    getBlock: function (file, callback) {
        fs.access(file, fs.R_OK, function (err) {
            if (err) {
                callback(err, null);
            } else {
                fs.readFile(file, 'utf8', function (err, contents) {
                    if (err) {
                        callback(err, null);
                    } else {
                        try {
                            callback(null, parseFile(contents));
                        } catch (e) {
                            callback(e, null);
                        }
                    }
                });
            }
        });
    }
};