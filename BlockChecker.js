// This project will check all of the assets in a project and see if they exist in the assets server
var fs = require('fs'); // a file io library we think
var axios = require('axios'); // library to make http requests

//Ask for a project id or allow user to upload a project.json file
//pull the project.json down for the project id
const projectID = process.env.ID || 0;
const projectFilePath = process.env.filepath || "";

// load the json of the project from a project json file into an object.
const getJSON = async function() {
    var file;
    var projectJSON;
    if (projectID == 0) {
        file = await fs.readFileSync(projectFilePath, {'encoding':'utf8'});
        projectJSON = await JSON.parse(file);

    } else {
        projectJSON = await getJsonRemote();
    }
    return projectJSON;
}

const getJSONFile = function(){
    let file = fs.readFileSync(projectFilePath, {'encoding':'utf8'});
}

const getJsonRemote = async function() {
        let tempURI = `https://projects.scratch.mit.edu/${projectID}`;
        try {
            var response = await axios.get(tempURI);
            console.log("we got it")
            return JSON.parse(JSON.stringify(response.data));
            console.log(typeof response.data);
        } catch (error) {
            console.error(error);
        }
}

// for each sprite in the json grab, check each costume
// also check each sound.
//Create an object for each asset that includes:
//Sprite name, Asset name, md5ext, assset type, response code, response detail, thumbnail
const findBlocks = function(proj) {
    let blocks = [];
    for (target of proj.targets){
        let spriteName = target.name;
        for (block of target.blocks) {
            let newOpCode = block.opcode;
            let foundInBlocks = false;
            for (blockFromList of blocks) {
                if (newOpCode == blockFromList.opcode) {
                    foundInBlocks = true;
                    blockFromList.sprites.spriteName++;
                }
            }
            if (!foundInBlocks) {
                let newBlock = {opcode : NewOpCode, sprites: [{spriteName:1}]};
                blocks.push(newBlock);
            }

            // newAsset.assetName = asset.name;
            // newAsset.md5ext = asset.md5ext;
            // newAsset.assetType = asset.dataFormat;
            // assets.push(newAsset);
        }
    }
    return blocks;
}

const findBlockInBlocks = function(block, blocks) {
    for (blockFromList of blocks) {
        if (block.opcode == blockFromList.opcode) {
            return true;
        }
    }
    return false;
}

// use https to request each asset from assets.scratch.mit.edu/[md5ext]
let addResponses = async function(assetList) {
    for (i=0; i<assetList.length; i++){
        let tempURI = `https://assets.scratch.mit.edu/${assetList[i].md5ext}`;
        var res;
        var code;
        try{
            response = await axios.get(tempURI);
            code = await response.status;
        } catch (error) {
            code = await error.response.status;
        }
        assetList[i].responseCode = code;
    };
};

// print all of the responses to the screen
let printBlocks = function(blockList) {
    let outputString = "";
    for (block of blockList){
        values = Object.values(block);
        console.log(values);
    };
}

let program = async function() {
    let project = await getJSON();
    let blocks = await findBlocks(project);
    // await addResponses();
    await printBlocks(blocks);
    await console.log("I've been run!");
}

program();

// printAssets();
// write all of the assets from the list into a file.
