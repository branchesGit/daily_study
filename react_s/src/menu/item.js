
import React from 'react'
import ReactDOM from 'react-dom'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var util = require('util');

class Item extends React.Component{
	constructor(props){
		super( props );
	}

	onClick(e){
		var props = this.props;
		props.onClick( {ikey: props.ikey} );
	}

	renderMenuItem(c,i){
		var baseProps = {
			ikey: c.key,
			index: ++i,
			onClick: this.onClick.bind(this)
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
   console.log( props );
		return React.createElement( "li", _extends( {}, props,
			{onClick: this.onClick.bind(this)} ),props.children );
	}
}

Item.defaultProps = {
	onClick: util.loop
};


module.exports = Item;