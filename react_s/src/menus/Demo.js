import React from 'react'
import ReactDOM from 'react-dom'

let Menu = require('./Menu');
let Item = require("./Item");
let SubMenu = require('./SubMenu')

class Demo extends React.Component{
	constructor( props ){
		super( props );
		this.state = {
			key: 'home4',
			onHandleClick:this.onChange.bind(this)
		}
	}

	onChange( key ){
	
		this.state.key = key;
		this.setState(this.state);
	}

	render(){
		let t = this;

		return (<Menu select_key={this.state.key} onHandleClick={t.onChange.bind(t)}>
				<Item data_key="home1" icon="download"><a href="javascript:void(0);"><i></i><span>Download</span><span className="arrow right"></span></a></Item>
				<Item data_key="home2" icon="settings"><a href="javascript:void(0);"><i></i><span>Settings</span><span className="arrow right"></span></a></Item>
				<Item data_key="home3" icon="nav"><a href="javascript:void(0);"><i></i><span>Nav</span><span className="arrow right"></span></a></Item>
				<SubMenu icon="download" head={<a href="javascript:void(0);"><i></i><span>SubMenu</span><span className="arrow right"></span></a>}>
					<Item data_key="home4" icon="nav"><a href="javascript:void(0);"><span>Sub-1</span></a></Item>
					<Item data_key="home5" icon="nav"><a href="javascript:void(0);"><span>Sub-2</span></a></Item>
				</SubMenu>
			</Menu> );
	}
}

module.exports = Demo;