import React from 'react'
import ReactDOM from 'react-dom'

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let classnames = require('classnames');

class SubMenu extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			open: props.opened || false,
			header: props.head,
			dkey: props.dkey,
			selectedKey: props.selectedKey,
			onClick: props.onClick
		}
	}

	renderMenuItem( c, idx ){
		let t = this;
		var baseProps = _extends( {}, t.state );
		baseProps.dkey = c.props.data_key;

		return React.cloneElement( c, baseProps );
	}

	onOpenChange(){
		var state = this.state;
		state.open = !state.open;

		this.setState( state );
	}

	componentWillReceiveProps( nextProps ){
		if( 'selectedKey' in nextProps )
			this.state.selectedKey = nextProps.selectedKey;
	}

	render(){
		let t = this,
			props = t.props,
			state = t.state,
			header = state.header;

		let classes = {
			"open": state.open,
			"hidden": !state.open,
			[props.className]: !!props.className
		};

		let baseProps = {
			className: classnames(classes),
			onClick: t.onOpenChange.bind(t)
		};

		var ReactUL = React.createElement('ul', baseProps, React.Children.map( props.children, 
			t.renderMenuItem.bind(t) ) );
		classes[ t.props.icon ] = !!t.props.icon;
		baseProps.className = classnames( classes );
		console.log( t.props.icon, classnames( classes ) );
		return React.createElement('li',baseProps, [header, ReactUL] )
	}
}



module.exports = SubMenu;
