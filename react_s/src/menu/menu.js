 import React from 'react'
import ReactDOM from 'react-dom'

require("./menu.css");

var util = require('util');

class Menu extends React.Component{

	constructor( props ){
		super( props );
	}

	onClick( e ){
		var props = this.props;
		props.onClick( e );
	}

	renderMenuItem(c,i){
		var baseProps = {
			ikey: c.key,
			index: ++i,
			onClick: this.onClick.bind(this),
			selectedKey: this.props.selectedKey,
			open: 'open'
		}
    
    var selectedKey = this.props.selectedKey;
    
    if( c.key === selectedKey ){
    	var cls = c.className || "";
    	cls += 'select';
    	baseProps.className = cls;
    }

		return React.cloneElement(c, baseProps)
	}

	render(){
		var props = this.props;
		var cls = props.className || "";
		cls = props.prefix + " " + cls;

		var baseProps = { 
			className: cls,
			selectedKey: props.selectedKey,
			style: props.style || {}
		};

		return React.createElement( 'ul', baseProps, 
			React.Children.map( props.children,this.renderMenuItem.bind(this) ) ); 
	}
}

Menu.defaultProps = {
	prefix: "branches-menu", 
	onClick: util.loop
};


Menu.propTypes = {
	selectedKey: React.PropTypes.string,
	onClick: React.PropTypes.func,
	onChange: React.PropTypes.func
}

module.exports = Menu;