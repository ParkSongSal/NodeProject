/*
    2020-04-24
    ch05-08
*/
var express = require('express');
var http = require('http');
var url = require('url');
var static = require('serve-static');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

const winston = require('./log');
var app = express();



app.set('port', process.env.PORT || 3000);

//public 폴더를 오픈해놓음
app.use('/public/',static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

app.get('/', function(req, res){
     var pathName = url.parse(req.url).pathname;
    if(pathName == '/'){
        winston.info('index.js -------------------> index.html 이동');
        res.redirect(302,'public/index.html');
    }

});

// 로그인 페이지로 이동
router.route('/loginForm').post(function(req, res){
    var pathName = url.parse(req.url).pathname;

    console.log('pathName ===> ' + pathName);

    if(pathName == '/loginForm'){
        winston.info('index.js -------------------> login.html 이동');
        res.redirect(302,'public/views/login.html');
    }else{
        winston.error('index.js -------------------> 404 페이지 에러');
        res.send('<h1>요청하신 페이지는 없어요.</h1>');
    }

});


// 사용자가 로그인시 처리
router.route('/login').post(function(req, res){

    console.log('/login 라우팅 함수에서 받음');

    // 아직 DB연동 x 로그인 성공시 Main.html 으로 이동



    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    winston.info('index.js -------------------> login 성공 : ' + paramId);
    //res.render('public/views/main', {id:paramId, password:paramPassword});
    res.redirect(302,'public/views/main.html');
    /*res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 응답</h1>");
    res.write("<div><p>" +paramId + "</p></div>");
    res.write("<div><p>" +paramPassword + "</p></div>");
    res.end();*/

});
/*

app.all('*', function(req, res){
        res.status(404).send('<h1>요청하신 페이지는 없어요.</h1>');
});
*/

app.use('/', router);




var server = http.createServer(app).listen(app.get('port'), function(){


    console.log('익스프레스로 웹서버를 실행함 : '  + app.get('port'));

})
