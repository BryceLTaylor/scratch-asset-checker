// This project will check all of the assets in a project and see if they exist in the assets server
var fs = require('fs'); // a file io library we think
var axios = require('axios'); // library to make http requests

//Ask for a project id or allow user to upload a project.json file
//pull the project.json down for the project id
const projectID = process.env.ID || 0;
const projectFilePath = process.env.filepath || "";

// load the json of the project from a project json file into an object.
const getJSON = function() {
    let file = fs.readFileSync(projectFilePath, {'encoding':'utf8'});
    let projectJSON = JSON.parse(file);
    // console.log(projectJSON);
    return projectJSON;
}

const getJSONFile = function(){
    let file = fs.readFileSync(projectFilePath, {'encoding':'utf8'});

}

const getJSONServer = async function(){
    let tempURI = `https://projects.scratch.mit.edu/${projectID}`;
    let response = await axios.get(tempURI);
    let file = await response.data;
    return file;
}

getJSONServer();

// console.log(project.targets[0]);

// for each sprite in the json grab, check each costume
// also check each sound.
//Create an object for each asset that includes:
//Sprite name, Asset name, md5ext, assset type, response code, response detail, thumbnail
const findAssets = function(proj) {
    let assets = [];
    for (target of proj.targets){
        let spriteName = target.name;
        for (asset of target.costumes) {
            let newAsset = {spritetName : spriteName};
            newAsset.assetName = asset.name;
            newAsset.md5ext = asset.md5ext;
            newAsset.assetType = asset.dataFormat;
            assets.push(newAsset);
        }
        for (asset of target.sounds) {
            let newAsset = {spritetName : spriteName};
            newAsset.assetName = asset.name;
            newAsset.md5ext = asset.md5ext;
            newAsset.assetType = asset.dataFormat;
            assets.push(newAsset);
        }
    }
    return assets;
}

// let assets = findAssets();

// use https to request each asset from assets.scratch.mit.edu/[md5ext]
let addResponses = async function(assetList) {
    for (i=0; i<assetList.length; i++){
        let tempURI = `https://assets.scratch.mit.edu/${assetList[i].md5ext}`;
        var res;
        var code;
        try{
            response = await axios.get(tempURI);
            code = await response.status;
            // await console.log(code);
        } catch (error) {
            code = await error.response.status;
            // console.error(code);
        }
        assetList[i].responseCode = code;
    };
};

// print all of the responses to the screen
let printAssets = function(assetList) {
    let outputString = "";
    for (asset of assetList){
        values = Object.values(asset);
        console.log(values);
    };
}

let program = async function() {
    let project = getJSON();
    let assets = await findAssets(project);
    await addResponses(assets);
    await printAssets(assets);
    await console.log("I've been run!");
}

program();

// printAssets();
// write all of the assets from the list into a file.
