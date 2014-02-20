/*
 * socket.IOサーバーを起動し、メッセージを処理する
 */

exports.receiveMassages = function(server,callback){

    var socketIO = require('socket.io');
    
    // soclet.IOサーバーの起動(node.jsサーバーのIPアドレスとポート番号を結びつけ)
    var io = socketIO.listen(server);
    
    // クライアントが接続してきたときの処理
    io.sockets.on('connection', function(socket) {
        console.log("--------connection--------");

        // messageメッセージを受けたときの処理
        socket.on('message', function(data) {

            // つながっているクライアント全員が対象???
            // カートへの追加処理
            var pushCart = require("../model/pushCart");
            var item_id = data.value;
            
            // カートにクリックしたitem_idを追加
            pushCart.pushAddItem(item_id);
            //console.log("カートにitem_id:" + item_id +' の商品を追加しました');
            
            io.sockets.emit('message', { value: data.value });
        
        });
              
        // disconnectionメッセージを受けたときの処理
        socket.on('disconnection', function(){
            console.log("--------disconnection--------");

            io.sockets.emit('disconnection', { value: null });
        });
    });
    
callback(null);

}