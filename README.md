Useful tools for developing userscripts - in both CLI and API modes (CLI uses asynchronous calls while API can use either).

[![Build Status](https://travis-ci.org/Alorel/userscript-utils.svg?branch=master)](https://travis-ci.org/Alorel/userscript-utils/branches)

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

## CLI

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

## API

[todo: inc link]