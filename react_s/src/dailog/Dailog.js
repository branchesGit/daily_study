import React from 'react'
import ReactDOM from 'react-dom'

let classnames = require('classnames');
let noop = function(){};
let Mask = require("../mask/Mask");


class Dailog extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			show: this.props.show,
			title: this.props.title,
			children: this.props.children,
			buttons: this.props.buttons 
		};
	}

	hide(){
		this.state.show = false;
		this.setState( this.state );
	}

	handleClick(callback){
		var t = this;
		if( callback() !== false ){
			t.hide();
		}
	}
	render(){
		var t = this;
		let mask = t.props.mask;
		let width = t.props.width;
		let show = t.state.show;
		let title = t.state.title;
		let children = t.state.children;
		let buttons = t.state.buttons;

	//	console.log( t.props.className );

		let classset = {
			"tDialog": true,
			[t.props.className]: !!t.props.className
		};

		let btn = buttons && buttons.map(function(item,i){
			var callback = item.callback || noop;

			return (
				<div className="tButton" onClick={t.handleClick.bind(t, callback)}>
					{item.children} 
				</div>
				);
		});

		let Mk = mask ? <Mask zIndex={10} visible={show} /> : ''; 
		return (<div className="tLayer" style={{zIndex:9}}> 
				{Mk}
				<div className={classnames(classset)}>
				{title? <h1 className="tDailogTitle">{title}</h1> : "" }
				<div className="tDailogContent">{children}</div>
				<div className="tDailogFooter">{btn}</div>
			</div></div>);
	}
}


Dailog.defaultProps = {
	buttons: [{
		children: '确定',
		callback() {}
	}],
	title:'',
	show:false,
	mask:true
};

Dailog.propTyps = {
	buttons: React.PropTypes.array,
	title: React.PropTypes.string,
	show: React.PropTypes.bool,
	mask: React.PropTypes.bool
}

module.exports = Dailog;