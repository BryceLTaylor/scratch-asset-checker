// This project will check all of the assets in a project and see if they exist in the assets server

projectID = process.env.ID || 0;

//Ask for a project id or allow user to upload a project.json file
//pull the project.json down for the project id

// load the json of the project from a project json file into an object.

// for each sprite in the json grab, check each costume
// also check each sound.

//Create an object for each asset that includes:
//Sprite name, Asset name, md5ext, assset type, response code, response detail, thumbnail

// use curl to request each asset from assets.scratch.mit.edu/[md5ext]

// print all of the responses to the screen
// write all of the assets from the list into a file.
