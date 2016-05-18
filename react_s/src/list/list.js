require('./list.css')

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
			"aria-key": key,
			"selected": key.indexOf(select) > -1 
		};

		return React.cloneElement( c, extreProps );
	}

	handlerClick(e){
		var elem = e.target;
		var name = util.getNodeName( elem );
		var propHandle = this.props.onClick;
		
		if( name === "li" ){
			propHandle( elem );
		} else {
			while( (elem = elem.parentNode) ){
				name = util.getNodeName( elem )
				if(  name === "li" ){
					propHandle( elem );
					break;
				}
			}
		}		
	}

	render(){
		var props = this.props; 
		var mode = props.mode;
		var cls = props.className || props.prefix ;

		cls += (mode === "horizontal" ? ' hor' : ' vertial');
	
		var baseProps = {
			"aria-key": props.selectedKey,
			"onClick": this.handlerClick.bind( this ),
			"className": cls, 
		};

		return React.createElement( 'ul', baseProps,
			React.Children.map( props.children, this.renderMenuItem.bind(this) ) );
	}
}

List.propTypes = {
	selectedKey: React.PropTypes.string,
	onClick: React.PropTypes.func
}

List.defaultProps = {
	'prefix': 'branches'
};

module.exports = List;

