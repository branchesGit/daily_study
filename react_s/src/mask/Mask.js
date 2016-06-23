import React from 'react'
import ReactDOM from 'react-dom'


/*
	遮罩层：
	visible: 可见不可见；
	zIndex: 数值，层次
	onHide: 处理关闭时响应的回调函数
	closeable: 遮罩层可不可以关闭
*/
require("./mask.css");

let classnames = require("classnames");

class Mask extends React.Component{
	constructor( props ){
		super( props );
		
		this.state = {
			visible: props.visible,
			zIndex: props.zIndex,
			onHide: props.onHide,
			opacity: props.opacity,
			closeable: props.closeable
		}
	}
  
	show( options ){
		let t = this;

		options = options || {};

		t.setState({
			opacity: 'opacity' in options ? options.opacity : t.props.opacity,
			zIndex: options.zIndex || t.props.zIndex,
			onHide: options.onHide || t.props.onHide,
			closeable: 'closeable' in options ? options.closeable : t.props.closeable,
			visible: true
		});
	}

  hide( force ){
  	let t = this;
  	if( force || t.state.closeable ){
  		t.state.visible = false;
  		t.setState(t.state);
  		t.state.onHide.call(t);
  	}

  }

	render(){
		let t = this;
		let style = {};

		let	top = t.props.top || 0;
		let	cls = t.props.className || '';
		let	opacity = t.props.opacity;
		let classset = {
				"tMask": true,
				"tMask-visible": t.state.visible,
				cls: !!cls
			};
		
		style.opacity = opacity;
		style.zIndex = t.state.zIndex;

		return (<div className={classnames(classset)} style= {style} 
			onClick={t.hide.bind(t,false)}></div> );
	}
}


Mask.defaultProps = {
	visible: true,
	zIndex: 1000,
	onHide(){},
	opacity: 0.6,
	closeable: true
};

Mask.propTypes = {
	visible: React.PropTypes.bool,
	zIndex: React.PropTypes.number,
	onHide: React.PropTypes.func,
	opacity: React.PropTypes.number,
	closeable: React.PropTypes.bool
}


let wrapper = null;
function _createTingleGlobalMask(){
	let WRAPPER_ID = '__TingleGlobalMask__';
	let doc = document;
	wrapper = doc.getElementById(WRAPPER_ID);

	if (!wrapper) {
	  wrapper = doc.createElement('div');
	  wrapper.id = WRAPPER_ID;
	  doc.body.appendChild(wrapper);
	}
}

//确保单例
Mask.global = null;
Mask.show = (options) => {
	if( !Mask.global ){
		_createTingleGlobalMask();

		Mask.global = ReactDOM.render(<Mask closeable={false} />, wrapper);
	}

	Mask.global.show( options );
};

Mask.hide = () => {
  Mask.global && Mask.global.hide(true);
};


Mask.display = "Mask";

module.exports = Mask;