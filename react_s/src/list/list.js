import React from 'react'
import ReactDOM from 'react-dom'

var util = require('./util');

class List extends React.Component{
	constructor( props ){
		super( props );
	}

	renderMenuItem( c, i, subIndex ){
		var props = this.props;
		var key = (0, util.getKeyFromChildrenIndex)(c, this.props.selectedKey, i);
		var select = props.selectedKey;

		var extreProps = {
			"key": key,
			"selected": key.indexOf(select) > -1 
		};

		return React.cloneElement( c, extreProps );
	}

	render(){
		var props = this.props; 
		var baseProps = {
			"aria-key": props.selectedKey,
			"onClick": props.onClick,
		};

		return React.createElement( 'ul', baseProps,
			React.Children.map( props.children, this.renderMenuItem.bind(this) ) );
	}
}

module.exports = List;

