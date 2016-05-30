
import React from 'react'
import ReactDOM from 'react-dom'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class SubMenu extends React.Component{
	constructor( props ){
		super( props );
	}

	onClick(e){
		console.log( e )
		this.props.onClick(e);
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
	
		return React.createElement('li', {}, 
			React.createElement('ul', {}, 
				React.Children.map(props.children, this.renderMenuItem.bind(this))));
	}
}


module.exports = SubMenu;