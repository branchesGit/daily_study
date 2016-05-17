var React = require('react');

class HW extends React.Component{
	constructor( props ){
		super(props);
		this.state = {};
	}

	render(){
		return (<div>Hello, {this.props.name}!</div>);
	}
}

module.exports = HW;

