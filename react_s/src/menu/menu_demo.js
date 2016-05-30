
import React from 'react'
import ReactDOM from 'react-dom'

var Menu = require('./menu');
var SubMenu = require('./submenu');
var Item = require('./item');

class MenuDemo extends React.Component{
	constructor( props ){
		super( props );
		this.state = {
			"key": 'es2015'
		}
	}

	onClick( e ){
		this.setState({
			key: e.ikey
		})
	}

	render(){
		return (<Menu selectedKey={this.state.key} onClick={this.onClick.bind(this)}>
				<Item key="es2015"><span>Learn ES2015</span></Item>
				<Item key="setup"><span>Setup</span></Item>
				<Item key="plugins"><span>Plugins</span></Item>
				<SubMenu>
					<Item key="options"><span>Options</span></Item>
					<Item key="cli"><span>CLI</span></Item>
					<Item key="babel"><span>Babel</span></Item>
				</SubMenu>
			</Menu>)
	}
}

module.exports = MenuDemo;