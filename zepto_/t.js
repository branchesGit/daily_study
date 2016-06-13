(function($){
	//console.log( $ );
	//这里通过用户定制来渲染表格
	var settings = {
		columns:[],
		isPagination: true,
		nPageSize: 8,
		nPageNo: 1,
		maxPageCells: 10
	};

	$.fn.grid = function( s ){
		return this.each(function(){
			settings = $.extend( {}, settings, s );

			loadData(settings);

			//渲染表头
			$(this).addClass("branches-t");
			$(this).append( _renderHeader( settings.columns) );
			//渲染表格数据
			$(this).append( _renderTbody() );

			$(this).after( _renderPaginationBar( $(this) ) );
			
		});
	};

	//处理分页的工具条
	function _renderPaginationBar( $t ){
		var nPageNo = settings.nPageNo,
			nPageSize = settings.nPageSize,
			nCount = settings.count,
			maxPageCells = settings.maxPageCells;

		var tPage = Math.ceil( nCount / nPageSize );

		//生成页码的数组
		var arr = [];
		var $ul = $('<ul class="branches-pagination-bar"></ul>');

		if( nPageNo !== 1 ){
			$ul.append('<li><a href="javascript:void(0);">上一页</a></li>');
		} 

		//处理总页数比预计的单元格要少的情形
		if( tPage <= maxPageCells ){
			var $li;

			for( var i = 0; i < tPage; i++ ){
				$li = $('<li><a href="javascript:void(0);">' + ( i + 1 ) + '</a></li>');
				if( (i + 1) === nPageNo ){
					$li.addClass('select');
				}
				$ul.append( $li );
				$li = null;
			}
		} else {
			/* 将当前页码定位到中间项 */
			var nMid = Math.ceil( maxPageCells / 2 );
			var index = nPageNo - nMid;

			//判断边界值
			if( index <= 0 ){
				index = 1;
			}

			if( (index + maxPageCells - 1) >= tPage ){
				index = tPage - maxPageCells + 1;
			}

			for( var i = 0; i < maxPageCells; i++ ){
				$li = $('<li><a href="javascript:void(0);">' + ( index + i ) + '</a></li>');
				if( (index + i) == nPageNo ){
					$li.addClass('select')
				}
				$ul.append( $li );
				$li = null;
			}
		}

		if( nPageNo < tPage ){
			$ul.append('<li><a href="javascript:void(0);">下一页</a></li>');
		}

		$ul.on("tap", function( e ){
			var $elem = $(e.target);
			var pageNo = settings.nPageNo;

			if( $elem.parent().hasClass('branches-pagination-bar') ){
				$elem.children().each(function(){
					pageNo = parseInt( $(this).text(), 10 ) || ( $(this).text() === "上一页" ?
					nPageNo -1 : nPageNo + 1);
				});
			} else {
				pageNo = parseInt( $elem.text(), 10 ) || (  $elem.text() === "上一页" ?
					nPageNo - 1 : nPageNo + 1 );
			}

			reload( pageNo, $t );
		});

		return $ul;
	}

	function reload( pageNo,$t){
		settings.nPageNo = pageNo;

		$t.find("tbody").remove();
		$t.append( _renderTbody() );

		var $next = $t.next();

		if( $next.hasClass('branches-pagination-bar') ){
			$next.off('tap');
			$next.remove();
		}

		$t.after( _renderPaginationBar( $t ) );
	}

	function _renderHeader( columns ){
		var $thead = $("<thead></thead>");
		var $tr = $("<tr></tr>");

		$.each( columns, function( colIndex, column ){
			$tr.append($("<th style=\"width:" + column.w + "\">" + column.h + "</th>"));
		});

		$thead.append( $tr );

		return $thead;
	}

	function _renderTbody( ){
		var data = settings.oData;
		var $tbody = $("<tbody></tbody>");

		//这里处理分页的情形：
		var nPageNo = settings.nPageNo;
		var nPageSize = settings.nPageSize;
		var index = (nPageNo - 1) * nPageSize;
		var maxIndex = nPageNo * nPageSize || settings.count;

   		$.each(data.rows, function(rowIndex,rowData){
				if( index >= maxIndex ){
					return false ;
				}

				if( rowIndex < index ){
					return;
				}

				index++;
				$tbody.append( _renderRow(rowIndex,rowData));
		});

		return $tbody;
	}

	function _renderRow( rowIndex,rowData ){
		var $tr = $("<tr></tr>");

		if( rowIndex % 2 === 0 ){
			$tr.addClass("even");
		} else {
			$tr.addClass("odd");
		}

		//这里处理{type:string||function, name: title, }
		$.each( settings.columns, function(index,column){
			var $td = _renderCell(rowData, index, column );
			$tr.append( $td );
		});

		return $tr;
	}

	function _renderCell( rowData, colIndex, column ){
		var $td = $("<td></td>");
		var text;
		
		if( column.type === "string" ){
			text = rowData[ column["name"] ];
		} else {
			var fn = column["name"];
			text = fn(rowData);
		}

		$td.append( text );
		return $td;
	}

	//查询数据
	function loadData( s ){
		var url = s.url;
		var data = s.bQueryData;
		var time = +new Date();

		if( url.indexOf("?") > -1 ){
			url = url.replace("?", "?time="+time + "&");
		} else {
			url += "?time=" + time;
		}

		$.ajax({
			url: url,
			data: data,
			async: false,
			method: 'get', 
			dataType: 'json',
			success: function(data){
				settings.oData = data;
				settings.count = data.total;
			}, 
			error: function(){
				if( console && console.log ){
					console.log('load data error!');
				} else {
					alert('load data error!')
				}
			}
		});
	}

})(Zepto);

$(function(){
	$("#mt").grid({
		url: './data.json?t',
		columns:[
				{type:"string", name:'name', h:"列1", w:"50%"},
				{type:"function", name:function(rowData){
					return rowData.title;
				},h:"列2", w:"50%"}
			]
	});
})