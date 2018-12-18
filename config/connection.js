var mysql = require('mysql')
var sunCalc = require('../modal/sun_calc')

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
               sunCalc.sunCalc();
           }
           else{
               console.log('database is not connected');
           }
       })

   }
   return db;
}
module.exports=ConnectDatabase();