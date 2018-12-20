var mysql = require('mysql')
var SunCalc = require('suncalc');
var moment = require('moment');


var db;
var settings = {

   host: 'localhost',
   user: 'root',
   password: '',
   database: 'calendar_app'

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
    var setDate=new Date("2018-12-20");
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
    
    for(var i=0; i<400; i++){
        var today=new Date(setDate.getTime()+(1000*60*60*24*i));
        var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
        var sunrise=todaySunCalc.sunrise.getTime();
        var sunset=todaySunCalc.sunset.getTime();
        var difference = sunset - sunrise;
        var eighthPotion = difference/8;
        // switch
        var dayName = moment(today).format('dddd');
        var day;
        var subaDishawa;
        var maruDishawa;
        switch (today.getDay()) {
            case 0:
                day = "Sunday";
                subaDishawa = "dakuna"
                maruDishawa = "uthura"
                var rahuStart = sunrise + (eighthPotion*7);
                var rahuEnd = sunrise + (eighthPotion*8);              
                break;
            case 1:
                day = "Monday";
                subaDishawa = "ginikona"
                maruDishawa = "wayaba"                
                var rahuStart = sunrise + (eighthPotion*1);
                var rahuEnd = sunrise + (eighthPotion*2);              
                break;
            case 2:
                day = "Tuesday";
                subaDishawa = "nagenahira"
                maruDishawa = "batahira"
                var rahuStart = sunrise + (eighthPotion*6);
                var rahuEnd = sunrise + (eighthPotion*7);              
                break;
            case 3:
                day = "Wednesday";
                subaDishawa = "iisana"
                maruDishawa = "niritha"                
                var rahuStart = sunrise + (eighthPotion*4);
                var rahuEnd = sunrise + (eighthPotion*5);              
                break;
            case 4:
                day = "Thursday";
                subaDishawa = "uthura"
                maruDishawa = "dakuna"                
                var rahuStart = sunrise + (eighthPotion*5);
                var rahuEnd = sunrise + (eighthPotion*6);              
                break;
            case 5:
                day = "Friday";
                subaDishawa = "wayaba"
                maruDishawa = "ginikona"                
                var rahuStart = sunrise + (eighthPotion*3);
                var rahuEnd = sunrise + (eighthPotion*4);              
                break;
            case 6:
                day = "Saturday";
                subaDishawa = "batahira"
                maruDishawa = "nagenahira"                
                var rahuStart = sunrise + (eighthPotion*2);
                var rahuEnd = sunrise + (eighthPotion*3);                            
          }
        //Writing to Database
          var todayDate =moment(today).format('L').toString(); 
          var todaySunrise = msToTime(sunrise +1.98e+7).toString(); //+0530 GMT = +1.98e+7
          var todaySunset = msToTime(sunset +1.98e+7).toString(); //+0530 GMT = +1.98e+7
          var todayRahuMorningStart = msToTime(rahuStart + 1.98e+7).toString();
          var todayRahuMorningEnd = msToTime(rahuEnd + 1.98e+7).toString();
          var todayRahuNightStart = msToTime(rahuStart + 1.98e+7 + 4.32e+7).toString(); //12h = 4.32e+7ms
          var todayRahuNightEnd = msToTime(rahuEnd + 1.98e+7 + 4.32e+7).toString();
          console.log('----------------')
          console.log('Date')
          console.log(todayDate)
          console.log('Sunrise')
          console.log(todaySunrise)
          console.log('Sunset')
          console.log(todaySunset)
          console.log('todayRahuMorningStart')
          console.log(todayRahuMorningStart)
          console.log('todayRahuMorningEnd')
          console.log(todayRahuMorningEnd)
          console.log('------')
          console.log('todayRahuNightStart')
          console.log(todayRahuNightStart)
          console.log('todayRahuNightEnd')
          console.log(todayRahuNightEnd)
          console.log('-------')
          console.log('subaDishawa')
          console.log(subaDishawa)
          console.log('maruDishawa')
          console.log(maruDishawa)
          console.log('----------------')
          console.log('|||||||||||||||||')
          console.log('----------------')

          

        var sql = `INSERT INTO horoscopes (date, sunrise, sunset, rahu_morning_start, rahu_morning_end, rahu_night_start, rahu_night_end, suba_dishawa, maru_dishawa) VALUES ('${todayDate}', '${todaySunrise}', '${todaySunset}', '${todayRahuMorningStart}','${todayRahuMorningEnd}','${todayRahuNightStart}', '${todayRahuNightEnd}', '${subaDishawa}', '${maruDishawa}')`;
        db.query(sql,function(err,raw){
            if(err) throw err;
        })
    }
}    
module.exports=ConnectDatabase();