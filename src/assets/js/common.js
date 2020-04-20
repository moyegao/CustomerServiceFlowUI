export default{
setCookie(key, value, time){
	if(time == null){
		time = 10;
	}
	var date = new Date();
	date.setTime(date.getTime() + time * 24 * 3600 * 1000);
	// token和过期时间
	window.document.cookie = key + "=" + escape(value) + ";expires=" + date.toGMTString();
},
getCookie(key){
	if (window.document.cookie.length > 0){
  		var c_start = window.document.cookie.indexOf(key + "=");
  		if (c_start != -1){
    		c_start = c_start + key.length + 1 ;
    		var c_end = window.document.cookie.indexOf(";", c_start);
    		if (c_end == -1) c_end = window.document.cookie.length;
    			return unescape(window.document.cookie.substring(c_start, c_end));
    	}
	}
	return ""
},
deleteCookie(key){
	var date = new Date();
    date.setTime(date.getTime() - 10000);
    window.document.cookie = key + "=v; expires =" + date.toGMTString();
},
/**
 * ajax调用
 *
 * @param url
 *            链接地址
 * @param data
 *            数据
 * @param callbackfun
 *            回调函数
 * @param method
 *            调用方法，默认为post
 * @param dataType
 *            返回参数类型,默认为json
 */
commitData(url, data, callbackfun, method, dataType) {
	if (method == null) {
		// 默认post方式
		method = "post";
	}
	if (dataType == null) {
		// 默认json数据类型
		dataType = "json";
	}
	if (callbackfun.error == null) {
		// 默认输出错误日志
		callbackfun.error = function(data) {
			top.dialog && top.dialog({
				title : "操作异常",
				content : "操作异常",
				quickClose : true
			}).show() || alert("操作异常");
		};
	}
	$.ajax({
		url : url,
		dataType : dataType,
		type : method,
		data : data,
		headers : {
			"returntype" : "ajax/json"
		},
		traditional : true,
		success : function(data) {
			if (data.code >= 10000 && data.code < 11000) {
				if (data.code == 10000) {
					debugger
					//top.location.href = "#/login";
					 window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
					//  window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
					return;
				}
				top.dialog && top.dialog({
					quickClose : true,
					content : data.description
				}).show() || alert(data.description);
				return;
			}
			if (callbackfun.success)
				callbackfun.success(data);
		},
		error : callbackfun.error
	});
},
// vue  axios请求封装;
commitParam(that,url, data, callbackfun, method, dataType) {
	if (method == null) {
		// 默认post方式
		method = "post";
	}
	if (dataType == null) {
		// 默认json数据类型
		dataType = true;
	}
	if (callbackfun.error == null) {
		// 默认输出错误日志
		callbackfun.error = function(data) {
			that.$message.error('操作异常');
		};
	}
	if (method == "get") {
		
		that.$axios({
			url : url,
			dataType : dataType,
			method : method,
			params : data,
			headers : {
				"returntype": "ajax/json",
				'Cache-Control': 'no-cache'
			},
			traditional : true,
		}).then(function(res){
			if (res.data.code >= 10000 && res.data.code < 11000) {
				if (res.data.code == 10000) {
					debugger
					//top.location.href = "#/login";
					window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
					// window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
					// location.reload();
					return;
				}
				that.$message({
					message: res.data.description,
					type: 'warning'
				});
				return;
			}
			if (callbackfun.success)
				callbackfun.success(res.data);
		})
	}else if(method=="post"){
	 if(dataType === true){
     that.$axios({
			 
       url : url,
       dataType : dataType,
       method : method,
       data : data,
       headers : {
         "returntype" : "ajax/json",
				 'Cache-Control': 'no-cache'
       },
       traditional : true,
     }).then(function(res){
       if (res.data.code >= 10000 && res.data.code < 11000) {
				 if (res.data.code == 10000) {
					// top.location.href = "#/login";
					 window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
					//  window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
					 return;
         }
         that.$message({
           message: res.data.description,
           type: 'warning'
         });
         return;
       }
       if (callbackfun.success)
         callbackfun.success(res.data);
     })
   } else {
     that.$axios({
			 transformRequest: [function(data) {     //在请求之前对data传参进行格式转换
       	data = that.$qs.stringify(data)
      	return data
    	 }],
       url : url,
       dataType : dataType,
       method : method,
       data : data,
       headers : {
         "returntype" : "ajax/json",
				 'Cache-Control': 'no-cache'
       },
       traditional : true,
     }).then(function(res){
       if (res.data.code >= 10000 && res.data.code < 11000) {
         if (res.data.code == 10000) {
					 //top.location.href = "#/login";
					 window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
					//  window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api';
					 return;
         }
         that.$message({
           message: res.data.description,
           type: 'warning'
         });
         return;
       }
       if (callbackfun.success)
         callbackfun.success(res.data);
     })
   }

	}

},
formatDateCH(date){
	//
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	var currentdate = year + '年' + month + '月' + strDate + '日';
	return currentdate;
},
// 当前时间转换   如：2018-06-29
formatDate(date){
	//
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
},
/**
 * 获取选择器的值
 *
 * @param selector
 *            jquery选择器
 * @returns {Object}
 */
getData(selector) {
	var data = new Object();
	$(selector).each(
			function(index) {
				if ((this.type == 'checkbox' || this.type == 'radio')
						&& !this.checked)
					return true;
				if (!data[this.name]) {
					data[this.name] = $.trim(this.value);
					if ($(this).attr("_measure")) {
						data[this.name] = new Number(this.value.trim())
								* new Number($(this).attr("_measure"));
					}
				} else {
					if ($(this).attr("isbit"))
						data[this.name] = new Number(data[this.name])
								+ new Number(this.value.trim());
					else {
						if (!Array.isArray(data[this.name])) {
							var tmp = new Array();
							tmp.push(data[this.name]);
							data[this.name] = tmp;
						}
						data[this.name].push(this.value.trim());
					}
				}
			});
	return data;
},
/**
 * 弹出一个文本框供输入信息
 *
 * @param ok
 *            当按OK时的回调函数，带参数为输入的值
 * @param title
 *            标题
 */
inputValue(ok, title) {
	var d = top.dialog({
		title : title,
		content : '<input autofocus id="_dialog_value"/>',
		okValue : "是",
		cancelValue : "否",
		ok : function() {
			this.close($("#_dialog_value").val().remove());
		},
		cancel : function() {
			this.close(null).remove();
		}
	});
	d.addEventListener('close', function() {
		if (this.returnValue != null)
			ok(this.returnValue);
	});
	d.showModal();
},
/**
 * 弹出一个确认框
 *
 * @param ok
 *            点击OK时执行的函数
 * @param title
 *            标题
 * @param content
 *            内容
 */
confirm(ok, title, content, cancel) {
	var d = top.dialog({
		title : title,
		content : content,
		okValue : "是",
		cancelValue : "否",
		ok : function() {
			ok();
		},
		cancel : function() {
			if (cancel) {
				cancel();
			}
			this.close(null).remove();
		}
	});
	d.showModal();
},
/**
 * 全选反选
 *
 * @param event
 */
checkAll(event) {
	if (event.checked) {
		$("input[name='" + $(event).attr("id") + "']").attr("checked",
				"checked")
	} else {
		$("input[name='" + $(event).attr("id") + "']").removeAttr("checked");
	}
},
/**
 * 获得checkbox所有值 逗号分隔
 *
 * @param name
 * @returns {String}
 */
getCheckedVal(name) {
	var val = "";
	$("input[name='" + name + "']").each(function() {
		if (this.checked) {
			val += this.value + ",";
		}
	});
	if (val.length > 0) {
		val = val.substring(0, val.length - 1);
	}
	return val;
},
/**
 * 获得checkbox所有值 数组
 *
 * @param name
 * @returns {Array}
 */
getCheckedArray(name) {
	var val = new Array();
	var i = 0;
	$("input[name='" + name + "']:checked").each(function() {
		val[i++] = this.value;
	});
	return val;
},
/**
 * 辅助单位发生change时执行的函数
 *
 * @param inp
 */
_assist_function(inp) {
	var name = $(inp).attr("for");
	var target = $("[name='" + name + "']");
	var fixed = target.fixed || 2;
	target
			.val((new Number(target.val())
					* new Number(target.attr("_measure")) / new Number(
					inp.value)).toFixed(fixed));
	target.val(new Number(target.val()));
	target.attr("_measure", inp.value);
},
/**
 * 兼容ie placeholder
 */
placeholder() {
	if (!('placeholder' in document.createElement('input'))) {
		$('input[placeholder],textarea[placeholder]').each(function() {
			var that = $(this), text = that.attr('placeholder');
			if (that.val() === "") {
				that.val(text).addClass('placeholder');
			}
			that.focus(function() {
				if (that.val() === text) {
					that.val("").removeClass('placeholder');
				}
			}).blur(function() {
				if (that.val() === "") {
					that.val(text).addClass('placeholder');
				}
			}).closest('form').submit(function() {
				if (that.val() === text) {
					that.val('');
				}
			});
		});
	}
},
/**
 * 根据xmlkey，获取html和需要的js,css
 *
 * @param key
 * @param selecter
 * @returns
 */
inputJsUrl(key, selecter) {
	commitData("../workflow/form/" + key + ".htm", {}, {
		success : function(data) {
			var html = data.html;
			$(selecter).append(html);
			var obj = data.jsAndCss;
			// 写入js和css
			for (var i = 0; i < obj.length; i++) {
				seajs.use(obj[i]);
			}
		}
	});
},
/**
 * 从URL中取值
 *
 * @param name
 * @return String
 */
	getQueryString(name) {
		var after = window.location.hash.split("?")[1];
		if(after){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = after.match(reg);
			if(r != null){
				return  decodeURIComponent(r[2]);
			}else{
				return null;
			}
		}
	}
}
