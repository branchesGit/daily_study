import React from 'react'
import ReactDOM from 'react-dom'

var OnOff = require("./OnOff");

class OnOffDemo extends React.Component{

	constructor( props ){
		super(props);
		this.state = { on: false }
	}

	handleClick( OnOrOff ){
		this.setState({'on': OnOrOff});
	}

	render(){
		return (
			<OnOff on={this.state.on} onChange={this.handleClick.bind(this)} />
		);
	}
}

module.exports = OnOffDemo;
