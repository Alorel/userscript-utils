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
    };

/**
 * Extract the part of the metablock that's needed for @updateURL requests
 * @author Art <a.molcanovas@gmail.com>
 * @module get-update-metablock
 */
var exp = {
    /**
     * Operate on a given string
     */
    string: {
        /**
         * Synchronously extract the update metablock from the given string
         * @author Art <a.molcanovas@gmail.com>
         * @function
         * @param {string} str The string to extract from
         * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
         * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
         * @returns {string} The reduced metadata block suitable for .meta.js files
         * @throws {Error} if the metadata block is not found
         */
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
                return "// ==UserScript==\n" + out.join("\n") + "\n// ==/UserScript==";
            }
        },
        /**
         * Asynchronously extract the update metablock from the given string
         * @author Art <a.molcanovas@gmail.com>
         * @function
         * @param {string} str The string to extract from
         * @param {Function} callback A callback function receiving an Error object as the first argument and the result string as the second
         * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
         * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
         */
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
        /**
         * Synchronously extract the update metablock from the given file
         * @author Art <a.molcanovas@gmail.com>
         * @function
         * @param {string} file Path to the file
         * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
         * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
         * @returns {string} The reduced metadata block suitable for .meta.js files
         * @throws {Error} if the metadata block is not found
         */
        sync: function (file, incUpdateURL, incDownloadURL) {
            return exp.string.sync(getter.sync(file), incUpdateURL, incDownloadURL);
        },
        /**
         * Asynchronously extract the update metablock from the given file
         * @author Art <a.molcanovas@gmail.com>
         * @function
         * @param {string} file Path to the file
         * @param {Function} callback A callback function receiving an Error object as the first argument and the result string as the second
         * @param {boolean} [incUpdateURL=false] Whether to include the @updateURL tag
         * @param {boolean} [incDownloadURL=false] Whether to include the @downloadURL tag
         */
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