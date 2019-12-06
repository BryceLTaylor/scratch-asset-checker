# scratch-asset-checker
#### About
This project takes a project.json file from a scratch project and check all of its assets, costumes and sounds, to see what the response code from the assets server.  It runs in the terminal.

#### To check a local file
At this time you must have the project.json as a file on your local machine and know the file path to it.

run:
`projectFilePath=[file path to file] node AssetChecker.js`

#### Checking Remotely
You can check the assets of a project in the project server with just the project id.

run:
`ID=[project id] node AssetChecker.js`

Note that if you give both an ID and a file path it will only check the project from the server.

#### Old versions
This does not work for sb2 or sb projects
