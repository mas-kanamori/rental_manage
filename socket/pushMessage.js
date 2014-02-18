    <script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript">
    function start(){
      var socket = io.connect('http://localhost:3000');
      socket.on('connect', function(msg) {
                console.log("connet");
                document.getElementById("connectId").innerHTML =
                "あなたの接続ID::" + socket.socket.transport.sessid;
                document.getElementById("type").innerHTML =
                "接続方式::" + socket.socket.transport.name;
                });
                
                var i = 1;
                
                // メッセージを受けたとき
                socket.on('message', function(msg) {
                          // メッセージを画面に表示する
                          document.getElementById("receiveMsg").innerHTML = msg.value;
                          });
    }
                          
    // メッセージを送る
    function SendMsg() {
      var msg = document.getElementById("message" + 1).value;
      // メッセージを発射する
      socket.emit('message', { value: msg });
    }
    
    function SendMsg2() {
      var msg = document.getElementById("message" + 2).value;
      // メッセージを発射する
      socket.emit('message', { value: msg });
    }
    
    
    // 切断する
    function DisConnect() {
      var msg = socket.socket.transport.sessid + "は切断しました。";
      // メッセージを発射する
      socket.emit('message', { value: msg });
      // socketを切断する
      socket.disconnect();
    }
    </script>