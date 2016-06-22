import React from 'react'
import ReactDOM from 'react-dom'

//require("./OnOff.css");

var classnames = require("classnames");

class OnOff extends React.Component{
	constructor( props ){
		super( props );
	}

	handleChange( event ){
		var props = this.props;
		var handleClick = props.onChange;
		handleClick( !props.on);
	}

	render(){
		let t = this;
		let classSet = {
			"tOnOff": true,
			"tOn": t.props.on,
			"readOnly": t.props.readOnly,
			[t.props.className]: !!t.props.className
		};

		return (
				<div className={classnames(classSet)}
					onClick={t.handleChange.bind(t)}
					readyOnly={t.props.readOnly}>
					<div className="tOnOffBack">
						<div className="tOnOffRaduis"></div>
					</div>
				</div>
			);
	}
}

OnOff.defaultProps = {
	on: true,
	onChange(){
	},
	readOnly: false
};

OnOff.propTypes = {
	on: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	readOnly: React.PropTypes.bool
}

OnOff.displayName = "OnOff";

module.exports = OnOff;