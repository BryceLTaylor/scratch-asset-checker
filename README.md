# scratch-asset-checker
#### About
This project takes a project.json file from a scratch project and check all of its assets, costumes and sounds, to see what the response code from the assets server.  

There is a second utility, the block checker, that reads through the project.json and outputs a list of blocks used as well as each sprite that uses it and how many times that sprite uses that block.

It runs in the terminal.

## To check a local file
At this time you must have the project.json as a file on your local machine and know the file path to it.

#### Asset Checker
run:
`projectFilePath=[file path to file] node AssetChecker.js`

#### Block Checker
run:
`projectFilePath=[file path to file] node BlockChecker.js`

## Checking Remotely
You can check the assets of a project in the project server with just the project id.

#### Asset checker
run:
`ID=[project id] node AssetChecker.js`

#### Block Checker
run:
`ID=[project id] node BlockChecker.js`

## Notes
This does not work for sb2 or sb projects.

Note that in both cases if you give both an ID and a file path it will only check the project from the server.
