//***************************************
// ログイン画面
//***************************************

// ログイン画面（get:/login）
exports.login = function (req, res) {

    res.render('login', {
               loginFailed: false
               });
    return;
};

// ログイン画面（post:/login）
exports.login_post = function (req, res) {
    var user_account = req.body.account;
    
    // クッキーにユーザーアカウントを設定
    //res.cookie('user_account', req.param(user_account));
    //console.log('クッキー：' + req.cookies.user_account);
    
    res.redirect('/top');
    return;

    
};




//***************************************
// TOP検索画面
//***************************************

// TOP検索画面（get:/top）
exports.top = function (req, res) {
    
    // クッキーからユーザーアカウントを取得
    var account = "テストユーザー";//req.cookies.user_account;
    
    var item_id = []
    var item_name = []
    var item_description = [];
  
    res.render('top', {
        page:{ user_account: account
               ,item_id:item_id
               ,item_name:item_name
               ,item_description:item_description
        }
    });

};

// TOP検索画面（post:/top）
exports.top_post = function (req, res) {
  
  var getItemList = require("../model/getItemList");
  var keyword = req.body.keyword;


  // クッキーからユーザーアカウントを取得
  var account = "テストユーザー";//req.cookies.user_account;
  
  function authCallback(data){
    console.log("qqq:"+ data);
    
    // 検索結果の表示
    res.render('top', {

               page:{ user_account: account
               ,data:data
 
      }
    });
    return;
  }
  keyword = '%'+ keyword + '%';
  
  getItemList.getItemList(keyword,authCallback);
  return;
};