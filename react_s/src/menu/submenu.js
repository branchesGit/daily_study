
import React from 'react'
import ReactDOM from 'react-dom'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class SubMenu extends React.Component{

	constructor( props ){
		super( props );
		this.opened = 0;
	}

	onClick(e){
		console.log('item click');
		this.props.onClick(e);
	}

	renderSubMenuItem(children){
		var dis = this.opened ? "block" : "none";
		var style = {"display":dis};
	
		return React.createElement('ul', {style: style}, 
			React.Children.map(children, this.renderMenuItem.bind(this)) );
	} 

	onOpenChange(e){
		this.opened = !this.opened;
		this.forceUpdate();
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
		return React.cloneElement(c, baseProps);
	}

	render(){
		var props = this.props;
		var isOpen = this.opened ? "open" : 'close';
    var baseProps =  _extends({}, {onClick:this.onOpenChange.bind(this),"aria-open":isOpen});
    
		return React.createElement('li',{}, 
			React.createElement('div', baseProps, props.title), 
			this.renderSubMenuItem(props.children) );
	}
}


module.exports = SubMenu;