
import React from 'react'
import ReactDOM from 'react-dom'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class SubMenu extends React.Component{

	constructor( props ){
		super( props );
		this.state = {
			"open": 0
		}
	}

	onClick(e){
		this.props.onClick(e);
	}

	renderSubMenuItem(children, props){
		var dis = this.state.open ? "block" : "none";
		var style = {"display":dis};
		var level = props.level ;
		return React.createElement('ul', {style: style, className: 'level-' + ++level}, 
			React.Children.map(children, this.renderMenuItem.bind(this)) );
	} 

	onOpenChange(e){
		this.setState({"open": !this.state.open});
	}

	renderMenuItem(c,i){
		var baseProps = {
			ikey: c.key,
			index: ++i,
			onClick: this.onClick.bind(this), 
			selectedKey: this.props.selectedKey,
			level: this.props.level + 1
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
		var style = {};
    style.paddingLeft = props.level * 10;
		var isOpen = this.state.open ? "open" : 'close';
    var baseProps =  _extends({style:style, className:'item'}, 
    	{level:props.level,onClick:this.onOpenChange.bind(this),"aria-open":isOpen});

		return React.createElement('li',{}, 
			React.createElement('div', baseProps, props.title), 
			this.renderSubMenuItem(props.children, props) );
	}
}


module.exports = SubMenu;