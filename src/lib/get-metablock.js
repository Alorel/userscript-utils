var fs = require('fs'),
    async = require('async').nextTick,
    regexStart = /^(\s*\/\/\s?==userscript)\s?==/im,
    regexEnd = /^(\s*\/\/\s?==\/userscript\s?==)/im;

/**
 * Extract the entire metadata block
 * @author Art <a.molcanovas@gmail.com>
 * @module get-metablock
 */
var exp = {
    /**
     * Operate on a given string
     */
    string: {
        /**
         * Synchronously extracts the metablock from the given string
         * @function
         * @author Art <a.molcanovas@gmail.com>
         * @param {string} contents The string to extract from
         * @returns {string} The extracted metadata block
         * @throws {Error} If the metadata block is not found
         */
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
        /**
         * Asynchronously extracts the metablock from the given string
         * @function
         * @author Art <a.molcanovas@gmail.com>
         * @param {string} contents The string to extract from
         * @param {Function} callback A callback function receiving an Error object as the first argument and the result string as the second
         */
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
    /**
     * Operate on a given file
     */
    file: {
        /**
         * Synchronously extracts the metablock from the given file
         * @function
         * @author Art <a.molcanovas@gmail.com>
         * @param {string} file Path to the file
         * @returns {string} The extracted metadata block
         * @throws Error If the metadata block is not found or a FS error occurds (e.g. file not found)
         */
        sync: function (file) {
            fs.accessSync(file, fs.R_OK);
            return exp.string.sync(fs.readFileSync(file, 'utf8'));
        },
        /**
         * Asynchronously extracts the metablock from the given file
         * @function
         * @author Art <a.molcanovas@gmail.com>
         * @param {string} file Path to the file
         * @param {Function} callback A callback function receiving an Error object as the first argument and the result string as the second
         */
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