/**
 * @callback UserscriptUtilsErrStringCallback
 * @author Art <a.molcanovas@gmail.com>
 * @param {Error|null} err An error in the operation, if any.
 * @param {string|null} result Results of the operation. Will be null if an error occurred.
 */

var getMetablock = require('./lib/get-metablock'),
    getUpdateMetablock = require('./lib/get-update-metablock');

/**
 * Useful tools for developing userscripts
 * @author Art <a.molcanovas@gmail.com>
 * @module userscript-utils
 */
module.exports = {
    /**
     * Get the entire metadata block from a file
     * @type {module:userscript-utils/getMetablock}
     */
    getMetablock: getMetablock,
    /**
     * Get the part of the metadatablock that's required for .meta.js file and @updateURL
     * @type {module:userscript-utils/getUpdateMetablock}
     */
    getUpdateMetablock: getUpdateMetablock
};