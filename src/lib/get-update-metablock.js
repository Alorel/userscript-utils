var getter = require('./get-metablock').file,
    async = require('async').nextTick,
    tags = [
        '@name',
        '@version',
        '@namespace'
    ],
    cloneTags = function () {
        var r = [],
            i = 0;
        for (; i < tags.length; i++) {
            r.push(tags[i]);
        }
        return r;
    },
    exp = {
        string: {
            sync: function (str, incUpdateURL, incDownloadURL) {
                var out = [],
                    tags = cloneTags(),
                    lc, i;

                if (typeof(incUpdateURL) === "boolean" && incUpdateURL) {
                    tags.push("@updateurl");
                }
                if (typeof(incDownloadURL) === "boolean" && incDownloadURL) {
                    tags.push("@downloadurl");
                }

                str.split(/\n/).forEach(function (line) {
                    lc = line.toLowerCase();

                    for (i = 0; i < tags.length; i++) {
                        if (lc.indexOf(tags[i]) !== -1) {
                            out.push(line.trim());
                            break;
                        }
                    }
                });

                if (!out.length) {
                    throw new Error("Metablock not found");
                } else {
                    out = "// ==UserScript==\n" + out.join("\n") + "\n// ==/UserScript==";
                }

                return out;
            },
            async: function (str, callback, incUpdateURL, incDownloadURL) {
                async(function () {
                    try {
                        callback(null, exp.string.sync(str, incUpdateURL, incDownloadURL));
                    } catch (e) {
                        callback(e, null);
                    }
                });
            }
        },
        file: {
            sync: function (file, incUpdateURL, incDownloadURL) {
                return exp.string.sync(getter.sync(file), incUpdateURL, incDownloadURL);
            },
            async: function (file, callback, incUpdateURL, incDownloadURL) {
                getter.async(file, function (err, content) {
                    if (err) {
                        callback(err, null);
                    } else {
                        exp.string.async(content, callback, incUpdateURL, incDownloadURL);
                    }
                });
            }
        }
    };

module.exports = exp;