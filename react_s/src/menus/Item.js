import React from 'react'
import ReactDOM from 'react-dom'

let classnames = require('classnames');
let noop = function(){};

class Item extends React.Component{
	constructor( props ){
		super(props);
	}

	renderMenuItem( c, idx ){
		let t = this;
		let props = t.props;
		
		let classet = {
			[props.icon]: !!props.icon,
			[props.className]: !!props.className,
			"select":props.dkey === props.selectedKey
		}

		let baseProps = {
			className: classnames( classet )
		};

		return React.cloneElement(c,baseProps);
	}

	handleClick( e ){
		e.stopPropagation();

		this.props.onClick({
			item: this,
      domEvent: e
		});
	}

	render(){
		let t = this;

		let baseProps = {
			onClick: t.handleClick.bind(t),
		}

		return React.createElement( "li", baseProps, 
			React.Children.map( this.props.children, this.renderMenuItem.bind(this) ) );
	}
}

Item.defaultProps = {
	dkey:'',
	onSelect:noop,
	onClick: noop
}

Item.propTypes = {
	dkey: React.PropTypes.string,
	onSelect:React.PropTypes.func,
	onClick: React.PropTypes.func
}
module.exports = Item;