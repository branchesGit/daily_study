import React from 'react'
import ReactDOM from 'react-dom'

let Menu = require('./Menu');
let Item = require("./Item");


class Demo extends React.Component{
	constructor( props ){
		super( props );
		this.state = {
			key: 'home1'
		}
	}

	onChange(){
		console.log('click');
	}

	render(){
		let t = this;

		return (<Menu select_key={this.state.key} onHandleClick={t.onChange.bind(t)}>
				<Item data_key="home1" icon="download"><a href="javascript:void(0);">Download</a></Item>
				<Item data_key="home2" icon="settings"><a href="javascript:void(0);">Settings</a></Item>
				<Item data_key="home3" icon="nav"><a href="javascript:void(0);">Nav</a></Item>
				
			</Menu> );
	}
}

module.exports = Demo;