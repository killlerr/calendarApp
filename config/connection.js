var mysql = require('mysql')
// var sunCalc = require('../modal/sun_calc')
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
    var todaySunCalc=SunCalc.getTimes(setDate,6.927079,79.861244);
    var sunrise=todaySunCalc.sunrise.toString();
    var sunset=todaySunCalc.sunset.toString();
    var sunrise_slice=sunrise.slice(16,21);
    var sunset_slice=sunset.slice(16,21);
    var a =1;
    var b = 3;
    var sql = "INSERT INTO date_info (sunrise, sunset) VALUES (" + a + "," +  b +")";
    var sql = `INSERT INTO date_info (sunrise, sunset) VALUES ( ${sunrise_slice} ,  ${b})`;
    db.query(sql,function(err,raw){
        if(err) throw err;
        console.log('done');

})
   


    // var sql = "INSERT INTO date_info (sunrise, sunset) VALUES ('1', '2')";
    // db.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // });

}    
module.exports=ConnectDatabase();