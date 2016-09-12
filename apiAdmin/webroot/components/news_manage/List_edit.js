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
                            <h5 className="modal-title">编辑新闻</h5>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>新闻类型：</td>
                                        <td>
                                            <select className="form-control" defaultValue="0">
                                                <option value="0">请选择</option>
                                                <option value="1">会员公告</option>
                                                <option value="2" selected="selected">卖家公告</option>
                                                <option value="3">最新动态</option>
                                                <option value="4">绿韵会员公告</option>
                                                <option value="5">绿韵卖家公告</option>
                                                <option value="6">绿韵最新动态</option>
                                                <option value="7">云仓资讯</option>
                                                <option value="8">资料下载</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>是否置顶：</td>
                                        <td>
                                            <input type="checkbox" name="isTop" />
                                                选中后，新闻将优先在列表顶部显示。
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>新闻标题：</td>
                                        <td>
                                            <input name="title" className="form-control" defaultValue="开启“人人电商”  践行“大众创业”——云仓百货的“小岗村”之变" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>新闻导读：</td>
                                        <td>
                                            <textarea name="review"></textarea>(可以为空)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>新闻内容：</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>
                                            <input className="btn btn-g btn-primary pull-left" type="submit" defaultValue="提交" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

export { EditInfo };