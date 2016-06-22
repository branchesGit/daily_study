function extends( target ){
	var slice = Array.prototype.slice,
		args = slice.apply( arguments, 1 ),
		i = 0,
		len = args.length;

	var source;

	for(; i < len; i++){
		source= args[i];
		if( source && isObject(source) ){
			for( var name in source ){
				if( source[name] ){
					target[ name ] = source[ name ];
				}
			}
		}
	}

	return target;
}

var class2type = {};

var isObject = function( obj ){
	var ary = "Object Array Date Number String".split(" "),
		toString = Object.prototype.toString;
	ary.map((data, index) =>{
	 class2type['[object ' + data + ']'] = data.toLowerCase();
	});

	return class2type[toString.call(obj)] === "object";
}

module.exports = extends;