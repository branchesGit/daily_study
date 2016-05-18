import React from 'react'
import ReactDOM from 'react-dom'

var List = require("./list");
var Item = require("./item");

class ListDemo extends React.Component{
	constructor( props ){
		super( props );
		this.state = {
				key:"home"
		 };
	}

	handleClick( ele ){
		var key = ele.getAttribute("aria-key");
		this.setState({"key": key});
	}

	render(){
		return (<List selectedKey={this.state.key} mode="horizontal" 
			onClick={this.handleClick.bind(this)}>
			<Item key="home"><i>Home</i></Item>
			<Item key="product"><i>Product</i></Item>
			<Item key="about"><i>About</i></Item>
			<Item key="Touch us"><i>Touch Us</i></Item>
			</List>)
	}
}

module.exports = ListDemo;
