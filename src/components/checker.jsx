import React from 'react';
// import ReactDOM from 'react-dom';
import projectChecker from '../projectChecker.js';
import ProjectSelector from './project-selector.jsx';

class Checker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : null
        }
        this.handleNewID = this.handleNewID.bind(this);
    }

    handleNewID(newID) {
        let projectJson, blocks, assets;
        console.log('new ID: ' + newID);
        projectChecker.getJSON(newID)
            .then(json => {
                console.log(json);
                return Promise.all([
                    projectChecker.findBlocks(json),
                    projectChecker.getAssets2(json)
                ])
            } )
            .then(([blocks, assets]) => {
                console.log(blocks);
                console.log('assets: ');
                console.log(assets);
                // set the state here
                return blocks} )
            .then(() =>
                this.setState(
                    {id:newID},
                    () => alert('Submitted!!!  ' + this.state.id)
                )
            )
    }

    render(){
        return (
            <div>
                <div>This is the whole checker</div>
                <ProjectSelector
                    handleNewID={this.handleNewID}
                />
            </div>
        )
    }
}

export default Checker;
