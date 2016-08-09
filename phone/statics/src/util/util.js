Util = {
    is_login: true,
    init_info: {},
    accountInfo: null,
    setHeight: function(type) {
        var curHeight = height;

        if(type == 'product_list') {
            curHeight == height - 0.5 * fontNum;
        }
        var docs = document.querySelectorAll('.scroll_height');

        for(var i= 0,len=docs.length; i<len; i++) {
            docs[i].style.height = curHeight + 'px';
        }

        return this;
    },
    //制保留2位小数，如：2，会在2后面补上00.即2.00
    saveDecimal: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    checkPhone: function(value) {
        return /^1[3|4|5|7|8][0-9]\d{8}$/.test(value);
    },
    btnLoading: function(obj) {
        obj.prop('disabled', true);
        obj.css('background-color', '#7b7979');
    },
    btnReset: function(obj) {
        obj.prop('disabled', false);
        obj.css('background-color', '#ea433b');
    },
    addKey: function(value) {

        value = $.trim(value);
        var key_hash = CryptoJS.MD5("Message");
        var key = CryptoJS.enc.Utf8.parse(key_hash);
        var iv  = CryptoJS.enc.Utf8.parse('1234567812345678');

        var encrypted = "" + CryptoJS.AES.encrypt(value, key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});

        return encrypted;
    },
    getNode: function(ReactDOM, _this) {
        return function(ref) {
            return ReactDOM.findDOMNode(_this.refs[ref]);
        }
    },
    showError: function(node, text) {
        $(node).after('<span class="error_info">'+text+'</span>');
    },

    getAccountInfo: function(callback) {
        if(this.accountInfo) {
            return callback(this.accountInfo);
        }
        var _this = this;
        this.ajax({
            url: Api['b2c']['account_info'],
            success: function(data) {
                _this.accountInfo = data;
                callback(data);
            },
            error: function(data) {}
        });
    },
    timeToDate: function(time,degree){
        var date = new Date(time * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes()< 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
        var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        if(typeof degree == 'undefined'){
            return Y+M+D+h+m+s;
        }else if(degree == 2){
            return (Y+M).replace(/\-$/,'');
        }else if(degree == 3){
            return (Y+M+D).replace(/\s*$/,'');
        }else if(degree == 5){
            return Y+M+D+h+ m.replace(/:$/,'');
        }
    },
    //加法
    floatAdd: function(arg1, arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    },
    //减法
    floatSub: function(arg1, arg2){
        var r1,r2,m,n;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    },
    //乘法
    floatMul: function(arg1,arg2){
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    },
    //除法
    floatDiv: function(arg1,arg2){
        var t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        with(Math){
            r1=Number(arg1.toString().replace(".",""));

            r2=Number(arg2.toString().replace(".",""));
            return (r1/r2)*pow(10,t2-t1);
        }
    },
    stop: function(event) {
        event.preventDefault();
        event.stopPropagation();
    },
    removeHintInfo: function() {
        this.hoverHide();
        $('#hint_info_wrp').off('click').remove();
    },
    //显示loading
    showLoading: function(obj) {

        obj.children().hide();

        if(obj.children('.loading_large').length === 0) {
            obj.append('<div class="loading_large"></div>');
        } else {
            obj.children('.loading_large').show();
        }
    },
    //隐藏loading
    hideLoading: function(obj) {
        obj.children().show();
        obj.children('.loading_large').hide();
    },
    //遮罩层
    hoverShow: function(type) {
        if(type == 2) {
            $('#common-hover-two').show();
            return false;
        }
        $('#common-hover').show();
    },
    hoverHide: function(type) {
        if(type == 2) {
            $('#common-hover-two').hide();
            return false;
        }
        $('#common-hover').hide();
    },
    //选择框信息
    chooseHtml: function(info) {
        var html = '<div id="hint_info_wrp">' +
                '<div class="include">' +
                    '<h2>' +
                        '<span data-type="close" class="close hint_info_submit glyphicon glyphicon-remove"></span>' +
                    '</h2>' +
                    '<div class="content">' +
                        '<div class="choose_p">'+info+'</div>' +
                    '</div>' +
                    '<div class="operate_btn">' +
                        '<button data-type="confirm" class="true hint_info_submit">确定</button>' +
                        '<button data-type="cancel" class="cancel hint_info_submit">取消</button>'+
                    '</div>' +
                '</div>' +
            '</div>';
        return html;
    },
    //提示框信息
    infoHtml: function(info) {
        var html = '<div id="hint_info_wrp">' +
            '<div class="include_alert">' +
                '<h2>' +
                    '<span data-type="close" class="close hint_info_submit glyphicon glyphicon-remove"></span>' +
                '</h2>' +
                '<div class="content">' +
                    '<div class="hint_p">'+info+'</div>' +
                '</div>' +
                '<div class="operate_btn">' +
                    '<button data-type="confirm" class="true hint_info_submit">确定</button>' +
                '</div>' +
            '</div>' +
            '</div>';
        return html;
    },
    //弹出框
    hintInfo: function(callback) {

        if($('#hint_info_wrp').length != 0) {
            this.removeHintInfo();
        }

        var _this = this, html;

        html = this[callback.type == 'choose' ? 'chooseHtml' : 'infoHtml'](callback.info);

        this.hoverShow();

        $('body').append(html);

        var children = $('#hint_info_wrp').children('div').eq(0);

        children.css('margin-top', -children.innerHeight()/2);

        $('#hint_info_wrp').on('click', '.hint_info_submit', function() {

            var oThis = $(this);
            var curType = oThis.data('type');

            if(((curType == 'close' && callback.type == 'allow') || curType == 'confirm') && callback.success) {
                callback.success();
            }

            if(callback.close == 'no' &&  curType == 'confirm') {
                return false;
            }
            _this.removeHintInfo();
        })
    },
    ajax: function(callback) {
        var _this = this;

        $.ajax({
            data : callback.data,
            type : 'get',
            url : callback.url,
            dataType : callback.dataType || 'json',
            async : true,
            cache : false,
            xhrFields: {
                withCredentials: typeof callback.cookie == 'undefined' ? false : callback.cookie
            },
            success : function(data){
                if(data['error_code']) {
                    return this.error(data);
                }
                if(typeof callback.success != 'undefined'){
                    return callback.success(data);
                }
                return this.error(data);
            },
            error: function(data) {

                if(!_this.is_login) {
                    return false;
                }

                var errorData = data.responseJSON ? data.responseJSON : data;
                if(errorData){
                    var error_code = errorData['error_code'];

                    if(error_code == '120106') {
                        _this.is_login = false;
                    }

                    _this.hintInfo({
                        type: 'allow',
                        info: errorData['error_msg'],
                        success: function() {
                            //if(error_code == '120106') {
                            //    window.location.href = '/passport/login';
                            //    return '';
                            //}
                            return callback.error(data);
                        }
                    });
                }
                return callback.error(data);
            }
        });
    }
};