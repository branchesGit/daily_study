import React from 'react'
import ReactDOM from 'react-dom'

let Dailog = require("./Dailog");

class Demo extends React.Component{
	constructor( props ){
		super( props );
	}

	render(){
		return <Dailog  width={300}/>
	}

}

module.exports = Demo;