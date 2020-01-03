# scratch-asset-checker
#### About
This project takes a project.json file from a scratch project and check all of its assets and its blocks.  

It takes all of the costumes and sounds and requests them from the Scratch Assets server, to see what the response code it gets for each.  

It also checks each block in the project.json and counts each block.  It keeps track of how many of each type of block are used in each sprite.  It organizes the results by block.

## To run in a browser
Run `npm start` in the terminal to launch a local server.
Navigate to `localhost:3000` and enter a project ID in the given field.

Currently the output comes in the form of a console statements.  A proper report on the page will come soon.

## To run in a terminal

### To check a local file
At this time you must have the project.json as a file on your local machine and know the file path to it.

#### Asset Checker
run:
`projectFilePath=[file path to file] node AssetChecker.js`

#### Block Checker
run:
`projectFilePath=[file path to file] node BlockChecker.js`

### Checking Remotely
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
