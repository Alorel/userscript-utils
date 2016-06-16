var fs = require('fs'),
    /**
     * Path separator
     * @type {string}
     */
    sep = require('path').sep;

module.exports = {
    /**
     * Perform output
     * @author Art <a.molcanovas@gmail.com>
     * @param {Object} argv Process args
     * @param {string} result Computed result
     */
    doOut: function (argv, result) {
        if (argv.outfile) {
            fs.writeFile(argv.outfile, result, 'utf8', function (e) {
                if (e) {
                    process.stderr.write(e.message);
                    process.exit(1);
                }
            });
        } else {
            process.stdout.write(result);
        }
    },
    /**
     * The help file to read
     * @author Art <a.molcanovas@gmail.com>
     * @param {string} file Path to the file
     */
    help: function (file) {
        fs.readFile(__dirname + sep + "help" + sep + file + ".txt", 'utf8', function (e, o) {
                if (e) {
                    process.stderr.write(e.message);
                } else {
                    process.stdout.write(o);
                }
            }
        )
        ;
    }
};