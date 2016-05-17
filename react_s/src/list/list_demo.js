import React from 'react'
import ReactDOM from 'react-dom'

var List = require("./list.js");

class ListDemo extends React.Component{
	constructor( props ){
		super( props );
	}

	handleClick( e ){
		console.log( 'list click', e );
	}

	render(){
		return (<List onClick={this.handleClick.bind(this)}>
			<Item key="home"><i>Home</i></Item>
			<Item key="product"><i>Product</i></Item>
			<Item key="about"><i>About</i></Item>
			</List>);
	}
}

