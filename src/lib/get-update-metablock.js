var async = require('async').nextTick,
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
    getMetablock = require('./get-metablock');

/**
 * Extract the part of the metablock that's needed for @updateURL requests
 * @author Art <a.molcanovas@gmail.com>
 * @exports userscript-utils/getUpdateMetablock
 */
var exp = {
    /**
     * Synchronously extract the update metablock from the given string
     * @author Art <a.molcanovas@gmail.com>
     * @param {string} str The string to extract from
     * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
     * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
     * @returns {string} The reduced metadata block suitable for .meta.js files
     * @throws {Error} if the metadata block is not found
     */
    fromStringSync: function (str, incUpdateURL, incDownloadURL) {
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
            return "// ==UserScript==\n" + out.join("\n") + "\n// ==/UserScript==";
        }
    },
    /**
     * Asynchronously extract the update metablock from the given string
     * @author Art <a.molcanovas@gmail.com>
     * @param {string} str The string to extract from
     * @param {UserscriptUtilsErrStringCallback} callback The callback function
     * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
     * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
     */
    fromString: function (str, callback, incUpdateURL, incDownloadURL) {
        async(function () {
            try {
                callback(null, exp.fromStringSync(str, incUpdateURL, incDownloadURL));
            } catch (e) {
                callback(e, null);
            }
        });
    },
    /**
     * Synchronously extract the update metablock from the given file
     * @author Art <a.molcanovas@gmail.com>
     * @param {string} file Path to the file
     * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
     * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
     * @returns {string} The reduced metadata block suitable for .meta.js files
     * @throws {Error} if the metadata block is not found
     */
    fromFileSync: function (file, incUpdateURL, incDownloadURL) {
        return exp.fromStringSync(getMetablock.fromFileSync(file), incUpdateURL, incDownloadURL);
    },
    /**
     * Asynchronously extract the update metablock from the given file
     * @author Art <a.molcanovas@gmail.com>
     * @param {string} file Path to the file
     * @param {UserscriptUtilsErrStringCallback} callback The callback function
     * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
     * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
     */
    fromFile: function (file, callback, incUpdateURL, incDownloadURL) {
        getMetablock.fromFile(file, function (err, content) {
            if (err) {
                callback(err, null);
            } else {
                exp.fromString(content, callback, incUpdateURL, incDownloadURL);
            }
        });
    }
};

module.exports = exp;