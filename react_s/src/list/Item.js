import React from 'react'
import ReactDOM from 'react-dom'

class Item extends React.Component{
	constructor( props ){
		super( props );
	}

	render(){
		var props = this.props;
		var cls = props.className || ""; 
		props["selected"] && ( cls += 'select');

		var p = {
			"aria-key": props["aria-key"],
			"className": cls
		}
		
		return React.createElement('li', p, props.children );
	}
}

module.exports = Item;