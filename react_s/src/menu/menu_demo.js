
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
		});
	}

	render(){
		var style = {"width":"200px"};

		return (<Menu selectedKey={this.state.key} style={style} onClick={this.onClick.bind(this)}>
				<Item key="es2015"><span>Learn ES2015</span></Item>
				<Item key="setup"><span>Setup</span></Item>
				<Item key="plugins"><span>Plugins</span></Item>
				<SubMenu title="二级菜单">
					<Item key="options"><span>Options</span></Item>
					<Item key="cli"><span>CLI</span></Item>
					<Item key="babel"><span>Babel</span></Item>
					<SubMenu title="三级菜单">
						<Item key="optionss"><span>OptionsS</span></Item>
						<Item key="clis"><span>CLIS</span></Item>
						<Item key="babels"><span>BabelS</span></Item>
				</SubMenu>
				</SubMenu>
			</Menu>)
	}
}

module.exports = MenuDemo;