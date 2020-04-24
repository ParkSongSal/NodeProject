var winston = require('winston');   // Log저장 위한 외장 모듈 winston
var winstonDaily = require('winston-daily-rotate-file');    // 하루에 하나씩 로그 기록
var moment = require('moment');  //날짜 시간 관련 외장모듈

function timeStampFormat(){
    return moment().format('YYYY-MM-DD HH:mm:ss');
}


const options = {
    file : {
            filename : './log/server/test.log',
            datePattern : 'YYYY-MM-DD',
            colorize : false,
            maxsize : 5242880,//5mb          // 최대 파일 사이즈
            maxFiles : 5,            //파일 최대갯수
            level : 'info',             // warning, error, info ...
            showLevel : true,
            json : false,
            timestamp : timeStampFormat
    },
    console:{
            name : 'debug-console',
            colorize:true,
            level:'debug',
            showLevel:true,
            json:false,
            timestamp:timeStampFormat
    }
}

let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false,
});

if(process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
}

//{ emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
module.exports = logger;
