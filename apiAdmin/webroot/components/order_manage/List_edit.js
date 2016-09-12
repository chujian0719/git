import React from 'react'

const EditInfo = React.createClass({
    render(){
        return (
            <div className="orderManage_list_edit modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title">编辑订单</h5>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">地址：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="address" type="text" defaultValue="黑龙江大兴安岭小扬气镇快捷快递" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">手机号：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="phone" type="text" defaultValue="045157981487" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">电话：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="mobile" type="text" defaultValue="13846575306" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">物流名称：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="logistic_company" type="text" defaultValue="云仓快递" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">物流号：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="logistic_number" type="text" defaultValue="33581930064" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">物流状态：</label>
                                <div className="col-sm-10">
                                    <select className="form-control" name="logistic_status">
                                        <option defaultValue="0">未处理</option>
                                        <option defaultValue="1">已处理</option>
                                        <option defaultValue="2">已发货</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">发票类型：</label>
                                <div className="col-sm-10">
                                    <select className="form-control" name="invoice_type">
                                        <option defaultValue="1">个人</option>
                                        <option defaultValue="2">无</option>
                                        <option defaultValue="3">公司</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">发票抬头：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="invoice_title" type="text" defaultValue="" />
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-sm-2 control-label">备注：</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="remark" type="text" defaultValue="" />
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

const EditAddress = React.createClass({
    render(){
        return (
            <div className="orderManage_list_edit modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title">编辑地址</h5>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group" >
                                    <label className="col-sm-2 control-label">姓名：</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" name="address" type="text" defaultValue="冯冬梅" />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-sm-2 control-label">详细地址：</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" name="address" type="text" defaultValue="黑龙江大兴安岭小扬气镇快捷快递" />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-sm-2 control-label">手机号：</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" name="phone" type="text" defaultValue="045157981487" />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-sm-2 control-label">电话：</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" name="logistic_number" type="text" defaultValue="33581930064" />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-sm-2 control-label">地址：</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" name="logistic_status">
                                            <option defaultValue="0">未处理</option>
                                            <option defaultValue="1">已处理</option>
                                            <option defaultValue="2">已发货</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" className="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export { EditInfo, EditAddress };