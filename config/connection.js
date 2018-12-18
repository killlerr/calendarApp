var mysql = require('mysql')
var SunCalc = require('suncalc');
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
               console.log('database is not connected');
           }
       })

   }
   return db;
}

function test(req, res, next) {
    var setDate=new Date("2019-01-01");
    for(var i=0; i<365; i++){
        var today=new Date(setDate.getTime()+(1000*60*60*24*i));
        var todaySunCalc=SunCalc.getTimes( today,6.927079,79.861244);
        var sunrise=todaySunCalc.sunrise.toString();
        var sunset=todaySunCalc.sunset.toString();
        var sunrise_slice =sunrise.slice(16,21);
        var sunset_slice =sunset.slice(16,21);
        var sql = `INSERT INTO date_info (sunrise, sunset) VALUES ( '${sunrise_slice}' ,  '${sunset_slice}')`;
        db.query(sql,function(err,raw){
            if(err) throw err;
        })
    }
}    
module.exports=ConnectDatabase();