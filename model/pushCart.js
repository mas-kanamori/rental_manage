/*
 * カートへアイテムを追加する
 */
 
var database = require("../dao/database");
var client = database.createClient();
//var log = require("../util/logger");
//var logger = log.createLogger();
var async = require('async');

/* 檀家追加画面でtiku&sewaninボックスの表示の利用（get処理） */
exports.pushAddItem = function(item_id,callback){

    var query = client.query('INSERT INTO t_user_cart(create_user,create_date,update_user,update_date,is_disabled,is_deleted,work_no,user_id,item_id,item_number,work_type,return_date,returned_date) VALUES ($1,now(),$2,now(),FALSE,FALSE,$3,$4,$5,$6,$7,NULL,NULL)',['dummy','dummy', 'R2014-0001',999,item_id,1,1]);

    query.on('end', function(row,err) {
        return;
    });
};

