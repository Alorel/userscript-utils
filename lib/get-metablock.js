var fs = require('fs'),
    regexStart = /^(\s*\/\/\s?==userscript)\s?==/im,
    regexEnd = /^(\s*\/\/\s?==\/userscript\s?==)/im,
    parseFile = function (contents) {
        var split1 = contents.split(regexEnd),
            split2;

        if (split1.length === 3) {
            split2 = split1[0].split(regexStart);
            if (split2.length === 3) {
                return (split2[1] + split2[2] + split1[1]).trim();
            }
        }
        throw new Error("Metadata block not found");
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