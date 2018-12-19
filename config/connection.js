var mysql = require('mysql')
var SunCalc = require('suncalc');
var moment = require('moment');


var db;
var settings = {

   host: 'localhost',
   user: 'root',
   password: '',
   database: 'calender_app'

};

function ConnectDatabase() {
   if (!db) {

       db = mysql.createConnection(settings);

       db.connect(function (err) {

           if(!err){
               console.log('database is connected');
                 test();
            
           }
           else{
               console.log('database is not connected!!!');
           }
       })

   }
   return db;
}

function test(req, res, next) {
    var setDate=new Date("2018-12-19");
    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = parseInt((duration / 1000) % 60),
          minutes = parseInt((duration / (1000 * 60)) % 60),
          hours = parseInt((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    
    for(var i=0; i<8; i++){
        var today=new Date(setDate.getTime()+(1000*60*60*24*i));
        var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
        var sunrise=todaySunCalc.sunrise.getTime();
        var sunset=todaySunCalc.sunset.getTime();
        var difference = sunset - sunrise;
        var eighthPotion = difference/8;
        // switch
        var dayName = moment(today).format('dddd');
        var day;
        switch (today.getDay()) {
            case 0:
                day = "Sunday";
                var rahuStart = sunrise + (eighthPotion*7);
                var rahuEnd = sunrise + (eighthPotion*8);              
                break;
            case 1:
                day = "Monday";
                var rahuStart = sunrise + (eighthPotion*1);
                var rahuEnd = sunrise + (eighthPotion*2);              
                break;
            case 2:
                day = "Tuesday";
                var rahuStart = sunrise + (eighthPotion*6);
                var rahuEnd = sunrise + (eighthPotion*7);              
                break;
            case 3:
                day = "Wednesday";
                var rahuStart = sunrise + (eighthPotion*4);
                var rahuEnd = sunrise + (eighthPotion*5);              
                break;
            case 4:
                day = "Thursday";
                var rahuStart = sunrise + (eighthPotion*5);
                var rahuEnd = sunrise + (eighthPotion*6);              
                break;
            case 5:
                day = "Friday";
                var rahuStart = sunrise + (eighthPotion*3);
                var rahuEnd = sunrise + (eighthPotion*4);              
                break;
            case 6:
                day = "Saturday";
                var rahuStart = sunrise + (eighthPotion*2);
                var rahuEnd = sunrise + (eighthPotion*3);                            
          }
        //Monday

        // var sunrise_slice =sunrise.slice(16,21);
        // var sunset_slice =sunset.slice(16,21);
        console.log('-----Day--------');
        console.log(today);
        console.log(msToTime(sunrise +1.98e+7)); //+0530 GMT
        console.log(msToTime(sunset+ 1.98e+7));
        console.log('-----Rahu-----');
        console.log(msToTime(rahuStart + 1.98e+7));
        console.log(msToTime(rahuEnd + 1.98e+7));
        console.log('-----difference-----');
        console.log(msToTime(difference));
        console.log('-----eighthPotion-----');
        console.log(msToTime(eighthPotion));
        console.log('-----12 hour clock-----');
        console.log('12 clock');
        console.log('-----End-----');
        console.log('-----day name-----');
        console.log('case: ' + day);
        console.log('today: ' + dayName);
        console.log('-----End-----');

        // var sql = `INSERT INTO date_info (sunrise, sunset) VALUES ( '${sunrise_slice}' ,  '${sunset_slice}')`;
        // db.query(sql,function(err,raw){
        //     if(err) throw err;
        // })
    }
}    
module.exports=ConnectDatabase();