import React from 'react';


class ProjectSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
        console.log('handleNewID:  ' + this.props.handleNewID)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
        event.preventDefault();
    }


    handleSubmit(event) {
        // alert('Submitted!!!  ' + this.state.value);
        event.preventDefault();
        this.props.handleNewID(this.state.value);

    }


    render(){
        return(
            <div>
                <div> coming soon: a project Selector </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Project ID:
                        <input
                            type="text"
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default ProjectSelector;
