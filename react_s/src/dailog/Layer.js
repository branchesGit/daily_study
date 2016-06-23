import React from 'react'
import ReactDOM from 'react-dom'

let classnames = require('classnames');

class Layer extends React.Component{
	
	constructor( props ){
		super( props );
	}

	render(){
		let t = this;
		let show = t.props.show;
		let width = t.props.width;
		let classset = {
			"tLayer": true,
			"tLayerShow" : show
		};
		width = typeof width === "string" ?  width : width + 'px';

		return (<div className={classnames(classset)} width={width} >{t.props.children}</div>);
	}

}

Layer.defaultProps = {
	show: true,
	width: 270
}

Layer.propTypes = {
	show: React.PropTypes.bool,
	width:React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
}

Layer.displayName = "Layer";

module.exports = Layer;