var fs = require('fs'),
    async = require('async').nextTick,
    regexStart = /^(\s*\/\/\s?==userscript)\s?==/im,
    regexEnd = /^(\s*\/\/\s?==\/userscript\s?==)/im,
    exp = {
        string: {
            sync: function (contents) {
                var split1 = contents.split(regexEnd),
                    split2;

                if (split1.length === 3) {
                    split2 = split1[0].split(regexStart);
                    if (split2.length === 3) {
                        return (split2[1] + split2[2] + split1[1]).trim();
                    }
                }
                throw new Error("Metadata block not found");
            },
            async: function (contents, callback) {
                async(function () {
                    try {
                        callback(null, exp.string.sync(contents));
                    } catch (e) {
                        callback(e, null);
                    }
                });
            }
        },
        file: {
            sync: function (file) {
                fs.accessSync(file, fs.R_OK);
                return exp.string.sync(fs.readFileSync(file, 'utf8'));
            },
            async: function (file, callback) {
                fs.access(file, fs.R_OK, function (err) {
                    if (err) {
                        callback(err, null);
                    } else {
                        fs.readFile(file, 'utf8', function (err, contents) {
                            if (err) {
                                callback(err, null);
                            } else {
                                exp.string.async(contents, callback);
                            }
                        });
                    }
                });
            }
        }
    };

module.exports = exp;