import React from 'react'
import {render} from 'react-dom'

import { BreadCrumb, IBoxTool } from '../../common/Birdie'
import { EditInfo, EditAddress } from './List_edit'

const orderList = React.createClass({
    clickHandle: function(event) {

        var name = event.target.name;
        var Template = (name == 'info') && EditInfo || EditAddress;

        var box = document.getElementById('box');
        render(<Template />, box);

        var children;
        box.childNodes.forEach(item => {
            if(item.nodeType == 1) {
                children = item;
            }
        });

        $(children).modal('show');
    },

    render(){
        var crumbs = [
            {name: "订单管理", url:"/order_manage/list"},
            {name: "订单列表", url: "/order_manage/list"}
        ];
        return (
            <div className="orderManage_list">
                <BreadCrumb crumbs={crumbs} title="订单管理"/>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <IBoxTool title="订单搜索">
                            <form className="form-horizontal" role="form">
                                <div className="row">
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="product_ID">商品ID:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="product_ID" placeholder="输入商品ID"/>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="product_name">商品名称:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="product_name" placeholder="输入商品名称"/>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="supplier">自营供应商:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="supplier" />
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="status">状态:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="status"/>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="dangdangID">当当ID:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="dangdangID"/>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="choseSupplier">供应商选择:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="choseSupplier"/>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <label className="col-sm-4 control-label" htmlFor="thirdSupplier">第三方供应商:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="thirdSupplier"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <button type="submit" className="btn btn-block btn-info bc-common">搜索</button>
                                </div>
                            </form>
                        </IBoxTool>
                    </div>
                    <div className="row">
                        <IBoxTool title="总共：7546商品">
                            <table className="table table-bordered order_list_table">
                                <thead>
                                <tr>
                                    <th className="w-70">
                                        <input type="checkbox"/>全选
                                    </th>
                                    <th>详细信息</th>
                                    <th className="w-70">支付状态</th>
                                    <th className="w-70">同步状态</th>
                                    <th className="w-70">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" />22
                                    </td>
                                    <td>
                                        <ul className="order_item_info clearfix">
                                            <li>订单号:2389325945875542360</li>
                                            <li>子订单:2389325945875542360</li>
                                            <li>供货商：当当商品</li>
                                            <li>用户名：巴丽红</li>
                                            <li>会员编号：15055558888</li>
                                            <li>手机号：13846575306</li>
                                            <li>子订单状态：正常</li>
                                            <li>物流名称：云仓快递</li>
                                            <li>物流号：33581930064</li>
                                            <li>物流状态：已发货</li>
                                            <li>进货商品类型：进货</li>
                                            <li>购物币：9619.880</li>
                                            <li>购物券：293.400</li>
                                            <li>购物金：0.00</li>
                                            <li>进货币：0.000</li>
                                            <li>退款时间：</li>
                                            <li>子订单运费：15.00</li>
                                            <li>物流信息：</li>
                                            <li>当当订单号： 33700761754 </li>
                                            <li>当当订单状态： 已送达 </li>
                                            <li>收货时间：未确认收货</li>
                                            <li>下单时间：2016-05-03 13:50:33</li>
                                            <li>支付时间：2016-05-03 13:50:37</li>
                                            <li>导出状态：已导出</li>
                                            <li className="w-100p">地址：宏府小区六单元二零一室</li>
                                        </ul>
                                        <table className="table order_item_product no_mg">
                                            <thead>
                                            <tr>
                                                <th>图片</th>
                                                <th>ID</th>
                                                <th>标题</th>
                                                <th>单价</th>
                                                <th>进价</th>
                                                <th>最大优惠券使用金额</th>
                                                <th>购买数量</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="image">
                                                            <img src="http://img3x3.ddimg.cn/97/13/60590473-1_u_201.jpg" />
                                                        </div>
                                                    </td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="image">
                                                            <img src="http://img3x3.ddimg.cn/97/13/60590473-1_u_201.jpg" />
                                                        </div>
                                                    </td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                    <td>60590473</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>已支付</td>
                                    <td>推单成功</td>
                                    <td>
                                        <a className="btn btn-success mb-5" name="info" onClick={this.clickHandle}>编辑</a>
                                        <a className="btn btn-success" name="address" onClick={this.clickHandle}>编辑地址</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </IBoxTool>
                    </div>
                </div>
            </div>
        )
    }
})

export default orderList;