/*
 * カートトランザクションからカート情報を取得する
 */
 
var database = require("../dao/database");
var client = database.createClient();
//var log = require("../util/logger");
//var logger = log.createLogger();
var async = require('async');

/* 檀家追加画面メイン（post処理） */
/* **今は使えていないが、いずれはasyncをつかった方式を実装したい** */
/*
exports.main = function(callback){
    // いったんはpostで入ってきたデータは正しい想定で作る
    
    var itemListInfo = [];

    async.series([

        // 商品マスタから僧のリストを取得
        function (dbcallback) {
            getItemList(itemListInfo, dbcallback);
                             console.log('aaaaaaaaa');
        }],
        // 【END】トランザクション完了(commit or rollback)
        function (err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, itemListInfo);
            return;
        }
    );
};
*/

/* 檀家追加画面でtiku&sewaninボックスの表示の利用（get処理） */
exports.getCartItemList = function(user_id,callback){

    var query = client.query(
        'SELECT work_no, item_id, item_no, item_number, item_name, item_description, user_id, work_type, return_date, returned_date FROM v_cart_item_data;'
    );

  var rows = [];
  query.on('row', function(row) {
           rows.push(row);
           });
  
  query.on('end', function(row,err) {
           callback(rows);
           return;
           });
};

