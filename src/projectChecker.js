// This project will check all of the assets in a project and see if they exist in the assets server
var fs = require('fs'); // a file io library we think
var axios = require('axios'); // library to make http requests

//Ask for a project id or allow user to upload a project.json file
//pull the project.json down for the project id
// const projectID = process.env.ID || 0;
// const projectFilePath = process.env.filepath || "";

// load the json of the project from a project json file into an object.
const getJSON = async function(projectID) {
    var projectJSON = await getJsonRemote(projectID);
    return Promise.resolve(projectJSON);
}

const getJsonRemote = async function(projectID) {
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
const findAssets = function(proj) {
    let assets = [];
    for (let target of proj.targets){
        let spriteName = target.name;
        // console.log(spriteName);
        for (let asset of target.costumes) {
            let newAsset = {spriteName : spriteName};
            newAsset.assetName = asset.name;
            // console.log(asset);
            if (asset.md5ext) {
                // console.log("yes md5!");
                newAsset.md5ext = asset.md5ext;
            } else {
                // console.log("no md5!");
                newAsset.md5ext = asset.assetId + '.' + asset.dataFormat;
            }
            newAsset.assetType = asset.dataFormat;
            assets.push(newAsset);
        }
        for (let asset of target.sounds) {
            let newAsset = {spriteName : spriteName};
            newAsset.assetName = asset.name;
            // newAsset.md5ext = asset.md5ext;
            if (asset.md5ext) {
                newAsset.md5ext = asset.md5ext;
            } else {
                newAsset.md5ext = asset.assetId + '.' + asset.dataFormat;
            }
            newAsset.assetType = asset.dataFormat;
            assets.push(newAsset);
        }
    }
    return assets;
}

// use https to request each asset from assets.scratch.mit.edu/[md5ext]
let addResponses = async function(assetList) {
    for (let i=0; i<assetList.length; i++){
        let tempURI = `https://assets.scratch.mit.edu/${assetList[i].md5ext}`;
        // var res;
        var code;
        try{
            let response = await axios.get(tempURI);
            console.dir(response);
            code = response.status;
        } catch (error) {
            if (error.response) {
                code = await error.response.status;
            } else {
                code = '0000'
            }

            console.error(error);
        }
        assetList[i].responseCode = code;
    };
};

// print all of the responses to the screen
let printItems = function(itemList) {
    let outputString = "";
    for (let item of itemList){
        let values = Object.values(item);
        console.log(values);
    };
}

// for each sprite in the json grab, check each block
// Create an object for each type of block
// Keep track of which sprites have that block and how many times they have it
const findBlocks = function(proj) {
    var blocks = [];
    try {
        for (let target of proj.targets){
            var spriteName = target.name;
            // console.log(spriteName);
            for (let block in target.blocks) {
                // console.log(block);
                var newOpCode = target.blocks[block].opcode;
                // console.log(newOpCode);
                let foundInBlocks = false;
                for (let blockFromList of blocks) {
                    if (newOpCode == blockFromList.opcode) {
                        foundInBlocks = true;
                        // if the sprite is already in the block's list then add 1
                        // console.log(blockFromList.sprites);
                        for (let spriteInBlock of blockFromList.sprites){
                            var foundSprite = false;
                            // console.log(spriteName + '   ==   ' + blockFromList.sprites[spriteInBlock]);
                            if (spriteName == spriteInBlock.sprite) {
                                spriteInBlock.count++;
                                blockFromList.totalCount++;
                                foundSprite = true;
                            }
                        }
                        // if the sprite is not in the block's list add it
                        if (!foundSprite) {
                            blockFromList.sprites.push({sprite:spriteName, count:1})
                            blockFromList.totalCount++;
                        }
                    }
                }
                if (!foundInBlocks) {
                    let newBlock = {opcode : newOpCode, sprites: [{sprite:spriteName, count:1}], totalCount:1};
                    blocks.push(newBlock);
                }

                // newAsset.assetName = asset.name;
                // newAsset.md5ext = asset.md5ext;
                // newAsset.assetType = asset.dataFormat;
                // assets.push(newAsset);
            }
        }
        return new Promise((resolve) => resolve(blocks));
    } catch(error) {
        console.error(error)
    }
}

const findBlockInBlocks = function(block, blocks) {
    for (let blockFromList of blocks) {
        if (block.opcode == blockFromList.opcode) {
            return true;
        }
    }
    return false;
}

let program = async function() {
    let project = await getJSON();
    let blocks = await findBlocks(project);
    let assets = await findAssets(project);
    await addResponses(assets);

    await printItems(assets);
    await printItems(blocks);
    await console.log("I've been run!");
}

let getAssets = async function(ID) {
    try {
        let project = await getJSON(ID);
        let assets = await findAssets(project);
        await addResponses(assets);
        return assets;
    } catch(error) {
        console.error(error)
    }
}

let getAssets2 = async function(project) {
    let assets = [];
    try {
        assets = await findAssets(project);
        // console.log("assets: ");
        // console.log(assets);

    } catch(error) {
        console.error(error);
    }
    try {
        await addResponses(assets);
    }catch (error) {
        console.error(error);
    }
    // console.log("assets: ");
    // console.log(assets);
    return assets;
}

let getBlocks = async function(ID) {
    try {
        let project = await getJSON(ID);
        let blocks = await findBlocks(project);
        return blocks;
    } catch(error) {
        console.error(error);
    }
}

// program();

// printAssets();
// write all of the assets from the list into a file.


export default {
    getAssets,
    getAssets2,
    getBlocks,
    findBlocks,
    findAssets,
    getJSON
}
