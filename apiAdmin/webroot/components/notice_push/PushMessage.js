import React from 'react'
import {render} from 'react-dom'

import { BreadCrumb, IBoxTool } from '../../common/Birdie'

const pushMessage = React.createClass({
    clickHandle: function(event) {
        var name = event.target.name;
    },
    save: function() {

        $('#myTab').on('click', 'li', function(){

            var oThis = $(this);
            var name = oThis.data('name');
            oThis.siblings().removeClass('active');
            oThis.addClass('active');
            if(name == 'wide'){
                $('#wide-send-wrapper').show();
                $('#group-send-wrapper').hide();
            } else {
                $('#wide-send-wrapper').hide();
                $('#group-send-wrapper').show();
            }
        });

        $('.app-type').on('change', function(){

            var oThis = $(this);
            var value = oThis.val();
            var oSelect = oThis.closest('tr').next().find('select');
            if(value == 120){
                oSelect.eq(0).show();
                oSelect.eq(1).hide();
            } else {
                oSelect.eq(1).show();
                oSelect.eq(0).hide();
            }
        });

        $('.message-send-submit').on('click', function(){

            var name = $(this).data('name');
            var param = {
                    'scope_type' : name,
                    'is_immediately' : 1
                },
                flag = false,
                oFind = $(this).closest('tbody').find('input, textarea, select:visible');

            oFind.each(function(){
                var oThis = $(this),
                    oClosest = oThis.closest('tr'),
                    name = oThis.data('name'),
                    val = $.trim(oThis.val());

                oClosest.removeClass('has-error');

                if(val) {
                    param[name] = val;
                } else {
                    oClosest.addClass('has-error');
                    flag = true;
                }
            });

            if(flag) {
                return false;
            }
            console.log(JSON.stringify(param));

            Util.ajax({
                url: "http://pushadmin.api.yuncangmall.com/rest/2.0/pushadmin/msg/add",
                method: "POST",
                data: param,
                success: function(data){
                    alert('发送成功!');
                    oFind.not('select').val('');
                },
                error: function(data){}
            });
        });
    },
    render(){
        var crumbs = [
            {name: "公告推送", url:"/order_manage/list"},
            {name: "推送消息", url: "/order_manage/list"}
        ];
        return (
            <div>
                <BreadCrumb crumbs={crumbs} title="公告推送"/>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        信息推送
                    </div>
                    <ul className="nav nav-tabs">
                        <li className="active" data-name="wide">
                            <a href="javascript:;">广发短信</a>
                        </li>
                        <li data-name="group">
                            <a href="javascript:;">群发短信</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="wide-send-wrapper">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>标题：</td>
                                    <td>
                                        <input className="form-control" data-name="title" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>应用：</td>
                                    <td>
                                        <select className="app-type form-control" name="status" data-name="app_id">
                                            <option value="120" selected="">B2C</option>
                                            <option value="110">C2C</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>类型：</td>
                                    <td>
                                        <select className="form-control" name="status" data-name="type_id">
                                            <option value="1">系统通知</option>
                                            <option value="2">优惠促销</option>
                                            <option value="3">商品提醒</option>
                                            <option value="4">云仓公告</option>
                                        </select>
                                        <select className="form-control" name="status" data-name="type_id" style={{display: 'none'}}>
                                            <option value="5">系统公告</option>
                                            <option value="6">订单助手</option>
                                            <option value="7">优惠促销</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>内容：</td>
                                    <td>
                                        <textarea className="form-control" data-name="content" rows="10"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>
                                        <button data-name="1" className="btn btn-g btn-primary pull-left">提交</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-pane active" id="group-send-wrapper" style={{display: 'none'}}>
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>标题：</td>
                                    <td>
                                        <input className="form-control" data-name="title" type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>应用：</td>
                                    <td>
                                        <select className="form-control" name="status" data-name="app_id">
                                            <option value="120" selected="">B2C</option>
                                            <option value="110">C2C</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>类型：</td>
                                    <td>
                                        <select name="status" data-name="type_id">
                                            <option value="1">系统通知</option>
                                            <option value="2">优惠促销</option>
                                            <option value="3">商品提醒</option>
                                            <option value="4">云仓公告</option>
                                        </select>
                                        <select name="status" data-name="type_id" style={{display: 'none'}}>
                                            <option value="5">系统公告</option>
                                            <option value="6">订单助手</option>
                                            <option value="7">优惠促销</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>内容：</td>
                                    <td>
                                        <textarea className="form-control" data-name="content" rows="10"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>发送号码：</td>
                                    <td>
                                        <textarea className="form-control" data-name="scope_data" rows="5" placeholder="多个号码以' , '隔开"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>
                                        <button data-name="3" className="btn btn-g btn-primary pull-left">提交</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default pushMessage;