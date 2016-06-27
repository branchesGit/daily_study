import React from 'react'
import ReactDOM from 'react-dom'

//单纯的折叠菜单 

class Menu extends React.Component{

	constructor( props ){
		super( props )

		this.state = {
			selectedKey: props.select_key,
			onHandleClick: props.onHandleClick
		};
	}

	renderMenuItem( c, idx ){
		var props = c.props;

		let baseProps = {
			index: idx,
			dkey: c.props.data_key,
			onClick: this.onHandleClick.bind(this),
			selectedKey: this.state.selectedKey
		}

		return React.cloneElement(c,baseProps);
	}

	onHandleClick( e ){
		var callback = this.state.onHandleClick;
		callback( e.item.props.dkey );
	}

	componentWillReceiveProps( nextProps ){
		if( 'select_key' in nextProps )
			this.state.selectedKey = nextProps.select_key;
	}

	//
	render(){
		let t = this;
		
		return React.createElement( "ul",{className:"branches-menu"}, 
			React.Children.map( t.props.children,t.renderMenuItem.bind(t) ) );
	}
}



module.exports = Menu;