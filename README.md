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

[todo: inc link]

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

[todo]

## Grunt task example

[todo]