Useful tools for developing userscripts - in both CLI and API modes (CLI uses asynchronous calls while API can use either).

[![Build Status](https://travis-ci.org/Alorel/userscript-utils.svg?branch=master)](https://travis-ci.org/Alorel/userscript-utils/branches)

# Table of Contents

 - [Features](#features)
 - [Installation](#installation)
 - [Compatibility](#compatibility)
 - [Usage](#usage)
	 - [CLI usage](#cli-usage)
	 - [API usage](#api-usage)
 - [Examples](#examples)
	 - [CLI examples](#cli-examples)
		 - [Creating a .meta.js file from a .user.js file](#creating-a-metajs-file-from-a-userjs-file)
		 - [Extracting the entire metadata block](#extracting-the-entire-metadata-block)
	 - [API examples](#api-examples)
	 - [Grunt task example](#grunt-task-example)
 - [Notes before running tests](#notes-before-running-tests)

# Features

 - Extract the entire metadata block
 - Extract the small portion of the metadata block that's required for `.meta.js` files (`@updateURL`)

#Installation

```sh
npm install -g userscript-utils
```

# Compatibility

Requires node version `>=0.12`

# Usage

## CLI usage

> {lamb} userscript-utils --help
> 
>     Userscript utilities
> 
>     Usage: userscript-utils <cmd> [options]
>     Pass -h or --help to any command to display command-specific help
> 
>     Commands:
> 
>         get-metablock   - Retrieve the entire metadata block
>         get-updateblock - Retrieve a shortened metadata block for .meta.js files

----------

> {lamb} userscript-utils get-metablock --help
> 
>     Retrieve the entire metadata block
> 
>     Usage: userscript-utils get-metablock [options]
> 
>     Options:
> 
>         -h, --help      - Display this help
>         -i, --infile    - Get contents from a file as opposed to STDIN
>         -o, --outfile   - Output result to a file as opposed to STDOUT

----------

> {lamb} userscript-utils get-updateblock --help
> 
>     Retrieve the shortened metadata block required for .meta.js files and @updateURL
> 
>     Usage: userscript-utils get-updateblock [options]
> 
>     Options:
> 
>         -h, --help          - Display this help
>         -i, --infile        - Get contents from a file as opposed to STDIN
>         -o, --outfile       - Output result to a file as opposed to STDOUT
>         -u, --updateurl     - Include the @updateURL tag in the output
>         -d, --downloadurl   - Include the @downloadURL tag in the output

## API usage
See [generated JSDoc](https://cdn.rawgit.com/Alorel/userscript-utils/1.0.0-beta.1/docs/index.html).

# Examples
## CLI examples
### Creating a .meta.js file from a .user.js file

Bare minimum:
```sh
userscript-utils get-updateblock -i foo.user.js -o foo.meta.js;
#or
userscript-utils get-updateblock -i foo.user.js >> foo.meta.js;
```
Include `@updateURL` & `@downloadURL`:
```sh
userscript-utils get-updateblock -i foo.user.js -o foo.meta.js -du;
#or
userscript-utils get-updateblock -i foo.user.js -du >> foo.meta.js;
```
From STDIN:
```sh
cat foo.user.js | userscript-utils get-updateblock -o foo.meta.js;
#or
cat foo.user.js | userscript-utils get-updateblock >> foo.meta.js;
```
Or simply view the output by omitting the `-o` and `--output` options.

### Extracting the entire metadata block

Same options/arguments as above with the exception of `-d`, `-u`, `--downloadurl` and `--updateurl` being invalid:
```sh
userscript-utils get-metablock -i foo.user.js -o foo.big.meta.js;
```

## API examples
### Extracting the `.meta.js` metablock and writing it to a new file:
```js
var utils = require('userscript-utils').getUpdateMetablock,
    fs = require('fs'),
    inputFile = "foo.user.js",
    outputFile = "foo.meta.js",
//For fs.writeFile
    innerCallback = function (e) {
        if (e) {
            throw e;
        }
    },
//For userscript-utils
    outerCallback = function (e, o) {
        if (e) {
            throw e;
        } else {
            fs.writeFile(outputFile, o, 'utf8', innerCallback);
        }
    };

//Bare minimum
utils.fromFile(inputFile, outerCallback);

//Include @updateURL
utils.fromFile(inputFile, outerCallback, true);

//Include @downloadURL
utils.fromFile(inputFile, outerCallback, false, true);

//Include @updateURL @downloadURL
utils.fromFile(inputFile, outerCallback, true, true);

// For synchronous mode simply omit the callback argument and replate the method with "fromFileSync":
try {
    utils.fromFileSync(inputFile);
} catch (e) {
    //handle
}

//And you can just as easily do the same if you have the file contents as a string:
utils.fromString(stringContainingFileContents, outerCallback);

try {
    utils.fromStringSync(stringContainingFileContents);
} catch (e) {
    //handle
}
```
### Extracting the full metadata block
```js
var utils = require('userscript-utils').getMetablock,
    fs = require('fs'),
    inputFile = "foo.user.js",
    outputFile = "foo.meta.js",
//For fs.writeFile
    innerCallback = function (e) {
        if (e) {
            throw e;
        }
    },
//For userscript-utils
    outerCallback = function (e, o) {
        if (e) {
            throw e;
        } else {
            fs.writeFile(outputFile, o, 'utf8', innerCallback);
        }
    };

//Async
utils.fromFile(inputFile, outerCallback);

// Sync
try {
    utils.fromFileSync(inputFile);
} catch (e) {
    //handle
}

//And you can just as easily do the same if you have the file contents as a string:
utils.fromString(stringContainingFileContents, outerCallback);

try {
    utils.fromStringSync(stringContainingFileContents);
} catch (e) {
    //handle
}
```

## Grunt task example

[todo]

# Notes before running tests
If you cloned this repository and want to run tests be sure to run `npm link` beforehand otherwise you'll get errors!