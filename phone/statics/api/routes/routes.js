var db = require('./../db');
var fs = require('fs');

module.exports = function (app){

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    //首页
    app.get('/', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync('index.html'));
    })

    //index 获得轮播图
    app.get('/index/get_images', function (req, res) {
        db.sql('select * from images', function(data) {
            res.json({data: data});
        });
    })
    //index 获得公告
    app.get('/index/get_notice', function (req, res) {
        db.sql('select * from notice', function(data) {
            res.json({data: data});
        });
    })
    //index 获得秒杀商品
    app.get('/index/get_special_goods', function (req, res) {
        var sql = 'select special_goods.id, special_goods.now_price, special_goods.src, goods_list.price from special_goods inner join goods_list on special_goods.goods_id=goods_list.id';
        db.sql(sql, function(data) {
            data.map(item => {
                item.old_price = item.price;
                delete item.price;
            });
            res.json({data: data});
        });
    })

    //分类
    app.get('/sort/get_sort_list', function (req, res) {

        var type = req.query.type || 1;
        var id = req.query.id || 1;

        var sql = 'select * from sort where level=' + type;

        type != 1 && (sql += ' and parent_id='+id)

        db.sql(sql, function(data) {

            if(type == 2){
                var returnData = data,
                    childSql = 'select * from sort where level=3 and';

                data.map(item => {
                    childSql += (' parent_id='+item.id+' or');
                });
                childSql = childSql.slice(0, -3);

                db.sql(childSql, function(childData) {
                    returnData.map(item => {
                        var saveData = [];
                        childData.map(childItem => {
                            childItem.parent_id == item.id && saveData.push(childItem);
                        });
                        item.data = saveData;
                    })
                    res.json({data: returnData});
                });

                return false;
            }

            res.json({data: data});
        });
    })
    //商品
    app.get('/goods/get_goods_list', function (req, res) {
        db.sql('select * from goods_list', function(data) {
            res.json({data: data});
        })
    })

    app.get('/goods/get_goods_detail', function (req, res) {

        var id = req.query.id;
        var sql = 'select * from goods_list where id='+id;

        db.sql(sql, function(data) {
            data = data[0];
            data.images = data.images.split(',');
            data.is_have = data.surplus > 0;
            res.json({data: data});
        });
    })

    /*购物车*/
    //添加购物车
    app.get('/cart/add_cart', function (req, res) {

        var user_id = req.query.user_id || 1;
        var goods_id = req.query.goods_id;
        var count = parseInt(req.query.count || 1);

        var search_sql = 'select * from cart where goods_id='+ goods_id;
        var add_sql = 'insert into cart (user_id, goods_id, count) values ('+user_id+', '+goods_id+', '+count+')';

        var param = {
            user_id: user_id,
            goods_id: goods_id
        }
        db.sql(search_sql, function(data) {
            if(data.length === 0) {
                db.sql(add_sql, function(data) {
                    param['id'] = data.insertId;
                    param['count'] = count;
                    res.json({
                        request_id: 12345,
                        data: param
                    });
                })
            } else {
                count = parseInt(data[0].count)+count;

                var update_sql = 'update cart set count='+count+' where goods_id='+goods_id;

                param['id'] = data.id;
                param['count'] = count;

                db.sql(update_sql, function(data) {
                    res.json({
                        request_id: 12345,
                        data: param
                    });
                })
            }
        });
    })
    //编辑购物车
    app.get('/cart/edit_cart', function (req, res) {

        var id = req.query.id;
        var type = req.query.type;

        var sql = 'update cart set count=count'+(type == 'up' ? '+' : '-')+'1 where id='+ id;
        db.sql(sql, function(data) {
            res.json({
                request_id: 12345
            });
        });
    })
    //删除购物车
    app.get('/cart/delete_cart', function (req, res) {

        var user_id = req.query.user_id || 1;
        var goods_id = req.query.goods_id;
        var count = parseInt(req.query.count || 1);

        var search_sql = 'select * from cart where goods_id='+ goods_id;
        var add_sql = 'insert into cart (user_id, goods_id, count) values ('+user_id+', '+goods_id+', '+count+')';

        var param = {
            user_id: user_id,
            goods_id: goods_id
        }
        db.sql(search_sql, function(data) {
            if(data.length === 0) {
                db.sql(add_sql, function(data) {
                    param['id'] = data.insertId;
                    param['count'] = count;
                    res.json({
                        request_id: 12345,
                        data: param
                    });
                })
            } else {
                count = parseInt(data[0].count)+count;

                var update_sql = 'update cart set count='+count+' where goods_id='+goods_id;

                param['id'] = data.id;
                param['count'] = count;

                db.sql(update_sql, function(data) {
                    res.json({
                        request_id: 12345,
                        data: param
                    });
                })
            }
        });
    })
    //购物车列表
    app.get('/cart/get_cart_list', function (req, res) {

        var user_id = req.query.user_id || 1;
        var sql = 'select cart.id, cart.goods_id, cart.goods_sort, cart.count,goods_list.title,goods_list.price,goods_list.coupon from cart inner join goods_list on cart.goods_id=goods_list.id where cart.user_id='+user_id;

        db.sql(sql, function(data) {
            res.json({data: data});
        });
    })

    /*订单*/
    app.get('/order/go_clearing', function (req, res) {

        var data = JSON.parse(req.query.data);
        var sql = 'select cart.id, cart.goods_sort, cart.count, goods_list.seller_id, goods_list.seller_name, goods_list.title, goods_list.price from cart inner join goods_list on cart.goods_id=goods_list.id where ';

        for(var key in data) {
            sql += ('cart.id=' + key + ' or ');
        }

        sql = sql.slice(0, -4);

        db.sql(sql, function(data) {

            var save = {},
                lastArr = [];

            data.map(function(item) {
                var id = item.seller_id;

                if(typeof save[id] == 'undefined'){
                    save[id] = {
                        seller_id: item.seller_id,
                        seller_name: item.seller_name,
                        goods_list: [item],
                        count: item.count,
                        total: item.price * item.count
                    };
                    delete item.seller_id;
                    delete item.seller_name;

                    return true;
                }

                delete item.seller_id;
                delete item.seller_name;

                save[id].count += item.count;
                save[id].total += item.price * item.count;
                save[id].goods_list.push(item);
            });

            for(var key in save) {
                lastArr.push(save[key]);
            }

            res.json({data: lastArr});
        });
    })

    /*地址*/
    //地址列表
    app.get('/address/get_address_list', function (req, res) {

        var sql = 'select * from address';

        db.sql(sql, function(data) {
            res.json({data: data});
        });
    })
    //获得默认地址
    app.get('/address/get_default_address', function (req, res) {

        var sql = 'select * from address where is_default=1';

        db.sql(sql, function(data) {
            res.json({
                data: data[0]
            });
        });
    })
    //添加地址
    app.get('/address/add_address', function (req, res) {

        var query = req.query;
        query.province_code = query.province;
        query.city_code = query.city;
        query.area_code = query.area;

        var nameArr = [
            'address',
            'receive_name',
            'receive_phone',
            'code',
            'province_code',
            'city_code',
            'area_code',
            'province_name',
            'city_name',
            'area_name'
        ];

        var sql_name = '(',
            sql_value = '(';

        nameArr.map(item => {
            if(!query[item]) {
                return true;
            }
            sql_name += (item + ',');
            sql_value += ('"'+query[item] +'",');
        });

        sql_name = sql_name.slice(0, -1);
        sql_value = sql_value.slice(0, -1);

        sql_name += ')';
        sql_value += ')';

        var sql = 'insert into address ' + sql_name + ' value ' + sql_value;

        db.sql(sql, function(data) {
            res.json({request_id: '123456'});
        });
    })

    //区域列表
    app.get('/area/get_area_list', function (req, res) {

        var type = req.query.type || 1;
        var code = req.query.code || 0;

        var sql = 'select * from area where type=' + type;

        if(type != 1) {
            sql += ' and parent_code =' + code;
        }

        console.log(sql);

        db.sql(sql, function(data) {
            res.json({data: data});
        });
    })
}